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
          description: string | null
          slug: string | null
          user_id: string | null
          images: string | null
        }
        Insert: {
          id?: string | null
          created_at?: string | null
          title: string | null
          description: string | null
          slug: string | null
          user_id?: string | null
          images?: string | null
        }
        Update: {
          id?: string | null
          created_at?: string | null
          title?: string | null
          description?: string | null
          slug?: string | null
          user_id?: string | null
          images?: string | null
        }
      },
      users: {
        Row: {
          id: string | null
          authRole: string | null
          isVerified: boolean | null
          avatar_url: string | null
          bannerUrl: string | null
          name: string | null
          username: string | null
          bio: string | null
        }
        Insert: {
          id?: string | null
          authRole?: string | null
          isVerified?: boolean | null
          avatar_url?: string | null
          bannerUrl?: string | null
          name?: string | null
          username?: string | null
          bio?: string | null
        }
        Update: {
          id?: string | null
          authRole?: string | null
          isVerified?: boolean | null
          avatar_url?: string | null
          bannerUrl?: string | null
          name?: string | null
          username?: string | null
          bio?: string | null
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