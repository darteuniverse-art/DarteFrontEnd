
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,  // your Supabase project URL
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!  // your public anon key
);
