-- Fix infinite recursion in RLS policies by creating a security definer function
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Drop the problematic dean policy that causes infinite recursion
DROP POLICY IF EXISTS "Deans can manage all courses" ON public.courses;

-- Create new dean policy using the security definer function
CREATE POLICY "Deans can manage all courses" 
ON public.courses 
FOR ALL 
USING (public.get_current_user_role() = 'dean');

-- Secure the notifications table by enabling RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Add user_id column to notifications table for proper access control
ALTER TABLE public.notifications ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Create RLS policies for notifications
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (true);

-- Update existing database functions to use proper security
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    COALESCE(new.raw_user_meta_data->>'role', 'student')
  );
  RETURN new;
END;
$$;

-- Update notify_new_user function with proper security
CREATE OR REPLACE FUNCTION public.notify_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
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
    http_post(
      'https://kamil146-20146.wykr.es/webhook/new-user',
      payload::text,
      'application/json'
    );

  RETURN new;
END;
$$;