import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client configuration
 * 
 * This file uses hardcoded values for the Supabase URL and Anon Key.
 * In a production environment, you would typically use environment variables:
 * - NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase project anonymous key
 */

// Use environment variables for Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Supabase client instance
 * Use this to interact with your Supabase project
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

