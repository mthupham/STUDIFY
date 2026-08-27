const { Client } = require('pg');
const client = new Client({ connectionString: 'postgres://postgres:123456@localhost:5432/mydb' });

async function run() {
  try {
    await client.connect();
    await client.query('ALTER TABLE "Users" ADD COLUMN IF NOT EXISTS "failed_login_attempts" INTEGER NOT NULL DEFAULT 0;');
    await client.query('ALTER TABLE "Users" ADD COLUMN IF NOT EXISTS "lock_until" TIMESTAMP WITH TIME ZONE;');
    console.log('Columns added successfully');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

run();
