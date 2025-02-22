import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRole: string = process.env.NEXT_SUPABASE_SERVICE_ROLE!;

// 클라이언트 전용 Supabase 인스턴스
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// 서버 API에서만 사용되는 Supabase 인스턴스 (관리자 권한)
export const supabaseAdmin: SupabaseClient = createClient(
  supabaseUrl,
  supabaseServiceRole
);
