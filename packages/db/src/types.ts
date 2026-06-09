export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      pets: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          breed: string | null;
          age: number | null;
          weight: number | null;
          sex: "male" | "female" | "unknown" | null;
          color: string | null;
          conditions: string[];
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          breed?: string | null;
          age?: number | null;
          weight?: number | null;
          sex?: "male" | "female" | "unknown" | null;
          color?: string | null;
          conditions?: string[];
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          breed?: string | null;
          age?: number | null;
          weight?: number | null;
          sex?: "male" | "female" | "unknown" | null;
          color?: string | null;
          conditions?: string[];
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "pets_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      scans: {
        Row: {
          id: string;
          pet_id: string;
          user_id: string;
          scan_type: "teeth" | "eyes" | "skin" | "body";
          image_url: string | null;
          status: "pending" | "processing" | "complete" | "failed";
          health_score: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          pet_id: string;
          user_id: string;
          scan_type: "teeth" | "eyes" | "skin" | "body";
          image_url?: string | null;
          status?: "pending" | "processing" | "complete" | "failed";
          health_score?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          pet_id?: string;
          user_id?: string;
          scan_type?: "teeth" | "eyes" | "skin" | "body";
          image_url?: string | null;
          status?: "pending" | "processing" | "complete" | "failed";
          health_score?: number | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "scans_pet_id_fkey";
            columns: ["pet_id"];
            isOneToOne: false;
            referencedRelation: "pets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "scans_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      scan_findings: {
        Row: {
          id: string;
          scan_id: string;
          region_label: string;
          confidence: number;
          severity: "normal" | "watch" | "concern" | "urgent";
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          scan_id: string;
          region_label: string;
          confidence: number;
          severity: "normal" | "watch" | "concern" | "urgent";
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          scan_id?: string;
          region_label?: string;
          confidence?: number;
          severity?: "normal" | "watch" | "concern" | "urgent";
          description?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "scan_findings_scan_id_fkey";
            columns: ["scan_id"];
            isOneToOne: false;
            referencedRelation: "scans";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
