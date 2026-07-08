// forage-trucks/src/services/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xbabobiamnyfoufygikw.supabase.co";
const supabaseAnonKey = "sb_publishable_4uklG_iA_Z8yJCRGQRJFJQ_TMrZCwX5";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
