const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:dYQZOQCUTSQxeZFliQfHfDMzkMGEZFQM@reseau.proxy.rlwy.net:48194/postgres',
  ssl: { rejectUnauthorized: false }
});
const query = process.argv.slice(2).join(' ');
if (!query) {
  console.log('Usage: node query.js "SELECT * FROM orders"');
  pool.end();
  process.exit(1);
}
(async () => {
  try {
    const res = await pool.query(query);
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    pool.end();
  }
})();
