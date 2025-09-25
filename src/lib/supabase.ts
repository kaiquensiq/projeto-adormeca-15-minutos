import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database Types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar?: string;
          joined_date: string;
          current_streak: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          avatar?: string;
          joined_date?: string;
          current_streak?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          avatar?: string;
          joined_date?: string;
          current_streak?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      modules: {
        Row: {
          id: string;
          title: string;
          description: string;
          order_index: number;
          is_unlocked_by_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          order_index: number;
          is_unlocked_by_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          order_index?: number;
          is_unlocked_by_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      lessons: {
        Row: {
          id: string;
          module_id: string;
          title: string;
          description: string;
          duration: string;
          video_url?: string;
          order_index: number;
          checklist_data?: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          module_id: string;
          title: string;
          description: string;
          duration: string;
          video_url?: string;
          order_index: number;
          checklist_data?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          module_id?: string;
          title?: string;
          description?: string;
          duration?: string;
          video_url?: string;
          order_index?: number;
          checklist_data?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          is_completed: boolean;
          is_favorite: boolean;
          notes?: string;
          completed_at?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          is_completed?: boolean;
          is_favorite?: boolean;
          notes?: string;
          completed_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          is_completed?: boolean;
          is_favorite?: boolean;
          notes?: string;
          completed_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}