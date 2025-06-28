import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fpizroupwhlohounvtwk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwaXpyb3Vwd2hsb2hvdW52dHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwODQ2MzYsImV4cCI6MjA2NjY2MDYzNn0.M3CWtfE0MaM7FL2QpA7X0pUgRUcZdYAHukBCiYDWwz4'

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  throw new Error('Missing Supabase environment variables')
}

console.log('🔧 Initializing Supabase client:', {
  url: supabaseUrl,
  keyLength: supabaseAnonKey.length,
  timestamp: new Date().toISOString()
})

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

// Test connection immediately
const testConnection = async () => {
  try {
    console.log('🧪 Testing Supabase connection...')
    const { data, error } = await supabase.from('user_profiles').select('count').limit(1)
    
    if (error) {
      console.error('❌ Supabase connection test failed:', error)
      return false
    }
    
    console.log('✅ Supabase connection test successful')
    return true
  } catch (error) {
    console.error('❌ Supabase connection error:', error)
    return false
  }
}

// Test connection on load
testConnection()

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