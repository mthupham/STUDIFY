require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;
  const bucket = process.env.SUPABASE_BUCKET || 'Uploads';

  console.log('URL:', url);
  console.log('Bucket:', bucket);
  console.log('Key prefix:', key ? key.substring(0, 20) + '...' : 'MISSING');

  if (!url || !key) {
    console.log('ERROR: Missing SUPABASE_URL or SUPABASE_KEY');
    return;
  }

  const supabase = createClient(url, key);

  // 1. Try to list buckets (test auth + connection)
  console.log('\n=== 1. List buckets ===');
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  if (bucketsError) {
    console.log('ERROR listing buckets:', bucketsError.message);
  } else {
    console.log('Buckets:', buckets.map(b => b.name));
    const targetBucket = buckets.find(b => b.name === bucket);
    console.log(`Target bucket "${bucket}" exists:`, !!targetBucket);
  }

  // 2. Try to list files in the bucket
  console.log('\n=== 2. List files in bucket ===');
  const { data: listData, error: listError } = await supabase.storage.from(bucket).list('', { limit: 5 });
  if (listError) {
    console.log('ERROR listing files:', listError.message);
  } else {
    console.log('Files:', listData);
  }

  // 3. Try uploading a test file
  console.log('\n=== 3. Upload test file ===');
  const testContent = Buffer.from('test upload content ' + Date.now());
  const testPath = `diagnostic/test-${Date.now()}.txt`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(testPath, testContent, { contentType: 'text/plain', upsert: false });

  if (uploadError) {
    console.log('ERROR uploading:', JSON.stringify(uploadError, null, 2));
  } else {
    console.log('Upload success! Path:', uploadData.path);

    // Cleanup
    const { error: deleteError } = await supabase.storage.from(bucket).remove([testPath]);
    console.log('Cleanup delete error:', deleteError ? deleteError.message : 'none');
  }
}

main().catch(err => console.error('Unhandled error:', err));