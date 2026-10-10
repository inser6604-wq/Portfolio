const SUPABASE_URL = 'https://yxlpfuelnhwlauogjcda.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_r4HTH79PI-1bKaP6uen1oA_hdRZzM4c';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
