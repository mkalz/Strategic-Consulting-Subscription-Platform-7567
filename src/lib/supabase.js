import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fpizroupwhlohounvtwk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwaXpyb3Vwd2hsb2hvdW52dHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwODQ2MzYsImV4cCI6MjA2NjY2MDYzNn0.M3CWtfE0MaM7FL2QpA7X0pUgRUcZdYAHukBCiYDWwz4'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Test the connection
console.log('Supabase client initialized:', {
  url: supabaseUrl,
  keyLength: supabaseAnonKey.length,
  configured: !!supabaseUrl && !!supabaseAnonKey
})

// Database helper functions
export const handleSupabaseError = (error) => {
  console.error('Supabase error:', error)
  return {
    success: false,
    error: error.message || 'An unexpected error occurred'
  }
}

export const handleSupabaseSuccess = (data) => {
  return {
    success: true,
    data
  }
}