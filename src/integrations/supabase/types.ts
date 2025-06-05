export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      answers: {
        Row: {
          answer_text: string
          created_at: string | null
          id: string
          professor_id: string | null
          question_id: string | null
        }
        Insert: {
          answer_text: string
          created_at?: string | null
          id?: string
          professor_id?: string | null
          question_id?: string | null
        }
        Update: {
          answer_text?: string
          created_at?: string | null
          id?: string
          professor_id?: string | null
          question_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "answers_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      Boosty: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          course_id: string | null
          enrollment_date: string | null
          grade: number | null
          id: string
          status: string | null
          student_id: string | null
        }
        Insert: {
          course_id?: string | null
          enrollment_date?: string | null
          grade?: number | null
          id?: string
          status?: string | null
          student_id?: string | null
        }
        Update: {
          course_id?: string | null
          enrollment_date?: string | null
          grade?: number | null
          id?: string
          status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          academic_year: string
          code: string
          created_at: string | null
          credits: number | null
          department_id: string | null
          description: string | null
          id: string
          name: string
          professor_id: string | null
          semester: string
        }
        Insert: {
          academic_year: string
          code: string
          created_at?: string | null
          credits?: number | null
          department_id?: string | null
          description?: string | null
          id?: string
          name: string
          professor_id?: string | null
          semester: string
        }
        Update: {
          academic_year?: string
          code?: string
          created_at?: string | null
          credits?: number | null
          department_id?: string | null
          description?: string | null
          id?: string
          name?: string
          professor_id?: string | null
          semester?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      lecture_feedback: {
        Row: {
          comments: string | null
          confusion_level: number | null
          course_id: string | null
          created_at: string | null
          id: string
          pace_feedback: string | null
          session_date: string | null
          student_id: string | null
          topics_discussed: string[] | null
        }
        Insert: {
          comments?: string | null
          confusion_level?: number | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          pace_feedback?: string | null
          session_date?: string | null
          student_id?: string | null
          topics_discussed?: string[] | null
        }
        Update: {
          comments?: string | null
          confusion_level?: number | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          pace_feedback?: string | null
          session_date?: string | null
          student_id?: string | null
          topics_discussed?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "lecture_feedback_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lecture_feedback_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          content: string | null
          course_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          is_public: boolean | null
          lecture_date: string | null
          note_type: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          course_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_public?: boolean | null
          lecture_date?: string | null
          note_type?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          course_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_public?: boolean | null
          lecture_date?: string | null
          note_type?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          department: string | null
          email: string
          full_name: string
          id: string
          role: string
          student_year: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          email: string
          full_name: string
          id: string
          role: string
          student_year?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          email?: string
          full_name?: string
          id?: string
          role?: string
          student_year?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      project_team_members: {
        Row: {
          id: string
          joined_at: string | null
          role: string | null
          skills: string[] | null
          student_id: string | null
          team_id: string | null
        }
        Insert: {
          id?: string
          joined_at?: string | null
          role?: string | null
          skills?: string[] | null
          student_id?: string | null
          team_id?: string | null
        }
        Update: {
          id?: string
          joined_at?: string | null
          role?: string | null
          skills?: string[] | null
          student_id?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_team_members_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "project_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      project_teams: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          project_id: string | null
          team_name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          project_id?: string | null
          team_name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          project_id?: string | null
          team_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_teams_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          course_id: string | null
          created_at: string | null
          created_by: string | null
          deadline: string | null
          description: string | null
          id: string
          max_team_size: number | null
          required_skills: string[] | null
          status: string | null
          title: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          max_team_size?: number | null
          required_skills?: string[] | null
          status?: string | null
          title: string
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          max_team_size?: number | null
          required_skills?: string[] | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          course_id: string | null
          created_at: string | null
          id: string
          is_anonymous: boolean | null
          priority: number | null
          question_text: string
          status: string | null
          student_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          is_anonymous?: boolean | null
          priority?: number | null
          question_text: string
          status?: string | null
          student_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          is_anonymous?: boolean | null
          priority?: number | null
          question_text?: string
          status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          answers: Json | null
          completed_at: string | null
          id: string
          quiz_id: string | null
          score: number | null
          started_at: string | null
          student_id: string | null
          total_points: number | null
        }
        Insert: {
          answers?: Json | null
          completed_at?: string | null
          id?: string
          quiz_id?: string | null
          score?: number | null
          started_at?: string | null
          student_id?: string | null
          total_points?: number | null
        }
        Update: {
          answers?: Json | null
          completed_at?: string | null
          id?: string
          quiz_id?: string | null
          score?: number | null
          started_at?: string | null
          student_id?: string | null
          total_points?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          correct_answer: string
          created_at: string | null
          id: string
          options: Json | null
          points: number | null
          question_text: string
          question_type: string | null
          quiz_id: string | null
        }
        Insert: {
          correct_answer: string
          created_at?: string | null
          id?: string
          options?: Json | null
          points?: number | null
          question_text: string
          question_type?: string | null
          quiz_id?: string | null
        }
        Update: {
          correct_answer?: string
          created_at?: string | null
          id?: string
          options?: Json | null
          points?: number | null
          question_text?: string
          question_type?: string | null
          quiz_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          course_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          time_limit_minutes: number | null
          title: string
          total_questions: number
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          time_limit_minutes?: number | null
          title: string
          total_questions: number
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          time_limit_minutes?: number | null
          title?: string
          total_questions?: number
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizzes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      schedules: {
        Row: {
          building: string | null
          course_id: string | null
          created_at: string | null
          day_of_week: number | null
          end_time: string
          id: string
          room_number: string | null
          start_time: string
        }
        Insert: {
          building?: string | null
          course_id?: string | null
          created_at?: string | null
          day_of_week?: number | null
          end_time: string
          id?: string
          room_number?: string | null
          start_time: string
        }
        Update: {
          building?: string | null
          course_id?: string | null
          created_at?: string | null
          day_of_week?: number | null
          end_time?: string
          id?: string
          room_number?: string | null
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      study_sessions: {
        Row: {
          created_at: string | null
          duration_minutes: number
          id: string
          participants: number | null
          session_date: string
          session_notes: string | null
          squad_id: string | null
        }
        Insert: {
          created_at?: string | null
          duration_minutes: number
          id?: string
          participants?: number | null
          session_date: string
          session_notes?: string | null
          squad_id?: string | null
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number
          id?: string
          participants?: number | null
          session_date?: string
          session_notes?: string | null
          squad_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_squad_id_fkey"
            columns: ["squad_id"]
            isOneToOne: false
            referencedRelation: "study_squads"
            referencedColumns: ["id"]
          },
        ]
      }
      study_squad_members: {
        Row: {
          id: string
          joined_at: string | null
          squad_id: string | null
          status: string | null
          student_id: string | null
        }
        Insert: {
          id?: string
          joined_at?: string | null
          squad_id?: string | null
          status?: string | null
          student_id?: string | null
        }
        Update: {
          id?: string
          joined_at?: string | null
          squad_id?: string | null
          status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_squad_members_squad_id_fkey"
            columns: ["squad_id"]
            isOneToOne: false
            referencedRelation: "study_squads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_squad_members_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_squads: {
        Row: {
          course_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          max_members: number | null
          meeting_url: string | null
          name: string
          session_type: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          max_members?: number | null
          meeting_url?: string | null
          name: string
          session_type?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          max_members?: number | null
          meeting_url?: string | null
          name?: string
          session_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_squads_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_squads_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      team_chat_messages: {
        Row: {
          created_at: string | null
          id: string
          message_text: string
          sender_id: string | null
          team_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message_text: string
          sender_id?: string | null
          team_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message_text?: string
          sender_id?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_chat_messages_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "project_teams"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
