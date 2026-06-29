const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  options: '-c search_path=public',
});

pool.on('connect', () => {
  console.log('PostgreSQL connected');
});

pool.on('error', (err) => {
  console.error('PostgreSQL pool error:', err.message);
});

const CREATE_TABLES_SQL = `
  CREATE TABLE IF NOT EXISTS reservations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(20) NOT NULL,
    table_number INTEGER,
    guests INTEGER NOT NULL,
    special_requests TEXT DEFAULT '',
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
  );
  CREATE TABLE IF NOT EXISTS menu_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    description TEXT NOT NULL,
    image VARCHAR(500) DEFAULT '/images/menu/default-dish.jpg',
    is_available BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
  );
  CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) DEFAULT '',
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );
  CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_gender VARCHAR(10) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    item_price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL,
    order_date TIMESTAMP DEFAULT NOW()
  );
  CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) DEFAULT '',
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT NOW()
  );
  CREATE TABLE IF NOT EXISTS contact_forms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(20) NOT NULL,
    city VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );
`;

async function createTables(p) {
  const client = await p.connect();
  try { await client.query(CREATE_TABLES_SQL); }
  finally { client.release(); }
}

async function initDB() {
  await createTables(pool);
  // Also sync tables to other databases for Railway Data tab compatibility
  try {
    const allDbs = ['postgres', 'railway'];
    for (const dbName of allDbs) {
      try {
        const url = new URL(process.env.DATABASE_URL);
        url.pathname = '/' + dbName;
        const otherPool = new Pool({
          connectionString: url.toString(),
          ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
          options: '-c search_path=public',
          max: 2,
        });
        await createTables(otherPool);
        await otherPool.end();
        console.log(`Tables synced to database: ${dbName}`);
      } catch (e) { console.error(`Failed to sync ${dbName}:`, e.message); }
    }
  } catch (e) { console.error('Failed to sync other databases:', e.message); }
  console.log('Database tables initialized');
}

module.exports = { pool, initDB };
