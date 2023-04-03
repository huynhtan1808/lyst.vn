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
          description: string
          slug: string | null
          user_id: string | null
          images: string | null
        }
        Insert: {
          id?: string | null
          created_at?: string | null
          title?: string
          description?: string | null
          slug: string | null
          user_id?: string | null
          images?: string | null
        }
        Update: {
          id?: string | null
          created_at?: string | null
          title?: string
          description?: string | null
          slug?: string | null
          user_id?: string | null
          images?: string | null
        }
      },
      users: {
        Row: {
          id: string 
          authRole: string 
          isVerified: boolean 
          avatar_url: string
          bannerUrl: string 
          name: string
          username: string
          bio: string 
          app_metadata: []
          user_metadata: [] 
          aud: string 
          created_at: string 
        }
        Insert: {
          id?: string 
          authRole?: string | null
          isVerified?: boolean 
          avatar_url?: string | null
          bannerUrl?: string | null
          name?: string | null
          username?: string 
          bio?: string | null
        }
        Update: {
          id?: string | null
          authRole?: string | null
          isVerified?: boolean | null
          avatar_url?: string | null
          bannerUrl?: string | null
          name?: string | null
          username?: string 
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