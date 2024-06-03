import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rjdsjiymjbrcuqubrcxi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqZHNqaXltamJyY3VxdWJyY3hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2NjMzMjcsImV4cCI6MjAyOTIzOTMyN30.SAk3pYMV2ERnsPLTeVwB2t6DCy8p8E9JamypzZbcd3c'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase