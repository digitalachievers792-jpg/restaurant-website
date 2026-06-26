const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
pool.query(`CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_gender VARCHAR(10) NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  item_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  order_date TIMESTAMP DEFAULT NOW()
)`)
.then(() => { console.log('orders table created!'); return pool.end(); })
.catch(e => { console.log('Error:', e.message); pool.end(); });
