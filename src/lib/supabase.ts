import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client configuration
 * 
 * This file uses hardcoded values for the Supabase URL and Anon Key.
 * In a production environment, you would typically use environment variables:
 * - NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase project anonymous key
 */

// Hardcoded values for development (these would normally come from environment variables)
const supabaseUrl = 'https://klshmhrykszuzfdxxelx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtsc2htaHJ5a3N6dXpmZHh4ZWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1OTc0MjYsImV4cCI6MjA1NzE3MzQyNn0.XI-Ez95MCPrJa-68MOgnXkS7ceNG2H4ofyiwOAOJaSo';

/**
 * Supabase client instance
 * Use this to interact with your Supabase project
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

