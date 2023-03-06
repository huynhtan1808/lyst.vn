export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          created_at: string
          title: string
          content: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          content: string
          user_id?: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          content?: string
          user_id?: string
        }
      },
      users: {
        Row: {
          id: string | null
          created_at: string | null
          username: string | null
          email: string | null
          bio: string | null
          avatarUrl: string | null
        }
        Insert: {
          id?: string | null
          created_at?: string | null
          username?: string | null
          email?: string | null
          bio?: string | null
          avatarUrl?: string | null
        }
        Update: {
          id?: string | null
          created_at?: string | null
          username?: string | null
          email?: string | null
          bio?: string | null
          avatarUrl?: string | null
        }
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
  }
}