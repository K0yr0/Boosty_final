
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Course {
  id: string;
  name: string;
  code: string;
  description?: string;
  professor_id?: string;
  department_id?: string;
  credits: number;
  semester: string;
  academic_year: string;
}

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('name');

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return { courses, loading, refetch: fetchCourses };
};
