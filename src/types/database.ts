export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      User: {
        Row: {
          id: string
          email: string
          password: string | null
          name: string
          phone: string
          district: string
          role: 'COUNCILOR' | 'ADMIN' | 'STAFF'
          isActive: boolean
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          email: string
          password?: string | null
          name: string
          phone: string
          district: string
          role?: 'COUNCILOR' | 'ADMIN' | 'STAFF'
          isActive?: boolean
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          email?: string
          password?: string | null
          name?: string
          phone?: string
          district?: string
          role?: 'COUNCILOR' | 'ADMIN' | 'STAFF'
          isActive?: boolean
          createdAt?: string
          updatedAt?: string
        }
      }
      Complaint: {
        Row: {
          id: string
          userId: string
          complainantName: string
          complainantPhone: string
          complainantEmail: string | null
          title: string
          content: string
          category: string
          department: string | null
          status: 'RECEIVED' | 'IN_PROGRESS' | 'PENDING' | 'COMPLETED' | 'REJECTED'
          priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
          aiSummary: string | null
          aiKeywords: string[]
          aiSentiment: string | null
          aiDepartment: string | null
          processNote: string | null
          responseContent: string | null
          completedAt: string | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          userId: string
          complainantName: string
          complainantPhone: string
          complainantEmail?: string | null
          title: string
          content: string
          category: string
          department?: string | null
          status?: 'RECEIVED' | 'IN_PROGRESS' | 'PENDING' | 'COMPLETED' | 'REJECTED'
          priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
          aiSummary?: string | null
          aiKeywords?: string[]
          aiSentiment?: string | null
          aiDepartment?: string | null
          processNote?: string | null
          responseContent?: string | null
          completedAt?: string | null
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          userId?: string
          complainantName?: string
          complainantPhone?: string
          complainantEmail?: string | null
          title?: string
          content?: string
          category?: string
          department?: string | null
          status?: 'RECEIVED' | 'IN_PROGRESS' | 'PENDING' | 'COMPLETED' | 'REJECTED'
          priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
          aiSummary?: string | null
          aiKeywords?: string[]
          aiSentiment?: string | null
          aiDepartment?: string | null
          processNote?: string | null
          responseContent?: string | null
          completedAt?: string | null
          createdAt?: string
          updatedAt?: string
        }
      }
      Schedule: {
        Row: {
          id: string
          userId: string
          complaintId: string | null
          title: string
          description: string | null
          scheduledAt: string
          location: string | null
          reminder: boolean
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          userId: string
          complaintId?: string | null
          title: string
          description?: string | null
          scheduledAt: string
          location?: string | null
          reminder?: boolean
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          userId?: string
          complaintId?: string | null
          title?: string
          description?: string | null
          scheduledAt?: string
          location?: string | null
          reminder?: boolean
          createdAt?: string
          updatedAt?: string
        }
      }
      Department: {
        Row: {
          id: string
          name: string
          description: string | null
          phone: string | null
          email: string | null
          keywords: string[]
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          phone?: string | null
          email?: string | null
          keywords?: string[]
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          phone?: string | null
          email?: string | null
          keywords?: string[]
          createdAt?: string
          updatedAt?: string
        }
      }
      Attachment: {
        Row: {
          id: string
          complaintId: string
          fileName: string
          fileUrl: string
          fileSize: number
          mimeType: string
          createdAt: string
        }
        Insert: {
          id?: string
          complaintId: string
          fileName: string
          fileUrl: string
          fileSize: number
          mimeType: string
          createdAt?: string
        }
        Update: {
          id?: string
          complaintId?: string
          fileName?: string
          fileUrl?: string
          fileSize?: number
          mimeType?: string
          createdAt?: string
        }
      }
      ComplaintHistory: {
        Row: {
          id: string
          complaintId: string
          action: string
          description: string | null
          fromStatus: string | null
          toStatus: string | null
          createdAt: string
        }
        Insert: {
          id?: string
          complaintId: string
          action: string
          description?: string | null
          fromStatus?: string | null
          toStatus?: string | null
          createdAt?: string
        }
        Update: {
          id?: string
          complaintId?: string
          action?: string
          description?: string | null
          fromStatus?: string | null
          toStatus?: string | null
          createdAt?: string
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