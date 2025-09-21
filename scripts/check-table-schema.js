const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function checkSchema() {
  try {
    console.log('🔍 Checking database table schema...')

    // Try to get one record to see the structure
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .limit(1)

    if (error) {
      console.error('❌ Error querying table:', error)
      return
    }

    if (data && data.length > 0) {
      console.log('✅ Table exists and has data. Columns found:')
      console.log(Object.keys(data[0]))
    } else {
      console.log('✅ Table exists but is empty. Trying to insert a test record...')
      
      // Try to insert a minimal record to see what columns are expected
      const testRecord = {
        id: 1,
        type: 'gallery',
        url: 'https://example.com/test.jpg',
        created_at: new Date().toISOString()
      }

      const { data: insertData, error: insertError } = await supabase
        .from('images')
        .insert([testRecord])
        .select()

      if (insertError) {
        console.error('❌ Error inserting test record:', insertError)
        console.log('Expected columns might be: id, type, url, created_at')
      } else {
        console.log('✅ Test record inserted successfully')
        console.log('Columns in test record:', Object.keys(insertData[0]))
        
        // Clean up test record
        await supabase.from('images').delete().eq('id', 1)
        console.log('🧹 Test record cleaned up')
      }
    }

  } catch (error) {
    console.error('❌ Schema check failed:', error)
  }
}

checkSchema()
