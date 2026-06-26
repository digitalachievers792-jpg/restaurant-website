const { Pool } = require('pg');
const readline = require('readline');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:dYQZOQCUTSQxeZFliQfHfDMzkMGEZFQM@reseau.proxy.rlwy.net:48194/postgres',
  ssl: { rejectUnauthorized: false }
});
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: 'railway> ' });
console.log('Connected to Railway PostgreSQL. Type SQL queries or \\q to quit.\n');
rl.prompt();
rl.on('line', async (line) => {
  const sql = line.trim();
  if (!sql || sql === '\\q') { rl.close(); return; }
  try {
    const res = await pool.query(sql);
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (e) { console.error('Error:', e.message); }
  rl.prompt();
});
rl.on('close', () => { pool.end(); console.log('Bye!'); process.exit(0); });
