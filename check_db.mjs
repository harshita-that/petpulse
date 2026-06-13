import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'apps/web/.env.local' });
dotenv.config({ path: 'apps/web/.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase
    .from('scans')
    .select('id, status, error_message, created_at, processing_started_at, processing_completed_at')
    .order('created_at', { ascending: false })
    .limit(3);

  console.log(JSON.stringify(data, null, 2));
}

check();
