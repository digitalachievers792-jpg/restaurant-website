const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { pool, initDB } = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath, {
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Restaurant API is running', timestamp: new Date() });
});

app.get('/api/db-info', async (req, res) => {
  try {
    const db = await pool.query('SELECT current_database(), current_schema');
    const schemas = await pool.query("SELECT schema_name FROM information_schema.schemata");
    const tables = await pool.query("SELECT table_name, table_schema FROM information_schema.tables WHERE table_catalog=current_database()");
    res.json({ success: true, current_db: db.rows[0], schemas: schemas.rows.map(s=>s.schema_name), all_tables: tables.rows.map(t=>t.table_schema+'.'+t.table_name) });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
});

app.get('/api/db-check', async (req, res) => {
  try {
    const tables = await pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`);
    const result = {};
    for (const t of tables.rows) {
      const count = await pool.query(`SELECT COUNT(*) FROM "${t.table_name}"`);
      result[t.table_name] = count.rows[0].count;
    }
    res.json({ success: true, tables: result });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
});

app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.all('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to initialize database:', err.message);
  process.exit(1);
});

// trigger redeploy