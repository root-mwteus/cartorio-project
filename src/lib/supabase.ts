import { createClient } from '@supabase/supabase-js'
import { readEnv } from './env'

export function createSupabaseServerClient() {
  return createClient(readEnv('SUPABASE_URL'), readEnv('SUPABASE_ANON_KEY'))
}
