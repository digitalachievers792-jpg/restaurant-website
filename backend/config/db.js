const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.on('connect', () => {
  console.log('PostgreSQL connected');
});

pool.on('error', (err) => {
  console.error('PostgreSQL pool error:', err.message);
});

async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(`
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
    `);
    console.log('Database tables initialized');
  } finally {
    client.release();
  }
}

module.exports = { pool, initDB };
