// lib/supabase-admin.ts
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, // Supabase project URL
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Service Role key
  {
    auth: {
      persistSession: false, // prevents session storage in server
    },
  }
);
