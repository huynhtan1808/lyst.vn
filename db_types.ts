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
          id: string | null
          created_at: string | null
          title: string | null
          content: string | null
          slug: string | null
          user_id: string | null
          featured_image: string | null
        }
        Insert: {
          id?: string | null
          created_at?: string | null
          title: string | null
          content: string | null
          slug: string | null
          user_id?: string | null
          featured_image?: string | null
        }
        Update: {
          id?: string | null
          created_at?: string | null
          title?: string | null
          content?: string | null
          slug?: string | null
          user_id?: string | null
          featured_image?: string | null
        }
      },
      profiles: {
        Row: {
          id: string | null
          created_at: string | null
          username: string | null
          email: string | null
          bio: string | null
          avatar_url: string | null
        }
        Insert: {
          id?: string | null
          created_at?: string | null
          username?: string | null
          email?: string | null
          bio?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string | null
          created_at?: string | null
          username?: string | null
          email?: string | null
          bio?: string | null
          avatar_url?: string | null
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