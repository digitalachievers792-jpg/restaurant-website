const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://postgres:dYQZOQCUTSQxeZFliQfHfDMzkMGEZFQM@reseau.proxy.rlwy.net:48194/railway',
  ssl: { rejectUnauthorized: false }
});
(async () => {
  try {
    const db = await pool.query('SELECT current_database(), current_schema');
    console.log('Database:', JSON.stringify(db.rows[0]));
    const searchPath = await pool.query('SHOW search_path');
    console.log('Search path:', searchPath.rows[0].search_path);
    const tables = await pool.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public'");
    console.log('Tables in public:', JSON.stringify(tables.rows));
    const allDBs = await pool.query('SELECT datname FROM pg_database WHERE datistemplate = false');
    console.log('All databases:', JSON.stringify(allDBs.rows));

    // Try listing schemas
    const schemas = await pool.query("SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT LIKE 'pg_%' AND schema_name != 'information_schema'");
    console.log('User schemas:', JSON.stringify(schemas.rows));
  } catch(e) { console.error('ERROR:', e.message); }
  finally { pool.end(); }
})();
