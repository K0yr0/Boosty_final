-- Fix critical database security issues

-- 1. Fix handle_new_user function to use SECURITY DEFINER and proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = ''
AS $$
begin
  insert into public.profiles (id, full_name, email, role, created_at, updated_at)
  values (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    'student',
    now(), 
    now()
  );
  return new;
end;
$$;

-- 2. Fix get_current_user_role function to use proper search_path
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- 3. Fix notify_new_user function to use proper search_path
CREATE OR REPLACE FUNCTION public.notify_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  payload json;
BEGIN
  payload := json_build_object(
    'name', new.raw_user_meta_data->>'full_name',
    'email', new.email
  );

  -- Send POST request to n8n webhook
  PERFORM
    public.http_post(
      'https://kamil146-20146.wykr.es/webhook/new-user',
      payload::text,
      'application/json'
    );

  RETURN new;
END;
$$;

-- 4. Add user_id column to notifications table if not exists and populate it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'notifications' 
    AND column_name = 'user_id'
    AND table_schema = 'public'
  ) THEN
    ALTER TABLE public.notifications ADD COLUMN user_id uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- 5. Update notifications RLS policies to be more secure
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "System can insert notifications" ON public.notifications;

-- Create more secure RLS policies for notifications
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (
  auth.uid() = user_id 
  OR 
  auth.email() = user_email
);

CREATE POLICY "System can insert notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (
  user_id = auth.uid() 
  OR 
  auth.email() = user_email
);

-- 6. Create trigger to auto-populate user_id in notifications
CREATE OR REPLACE FUNCTION public.set_notification_user_id()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Try to find user_id by email if not provided
  IF NEW.user_id IS NULL AND NEW.user_email IS NOT NULL THEN
    SELECT id INTO NEW.user_id 
    FROM auth.users 
    WHERE email = NEW.user_email;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for notifications
DROP TRIGGER IF EXISTS set_notification_user_id_trigger ON public.notifications;
CREATE TRIGGER set_notification_user_id_trigger
  BEFORE INSERT ON public.notifications
  FOR EACH ROW
  EXECUTE FUNCTION public.set_notification_user_id();