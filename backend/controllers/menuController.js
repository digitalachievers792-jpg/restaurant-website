const { pool } = require('../config/db');
const { validationResult } = require('express-validator');

exports.getAllMenuItems = async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM menu_items WHERE is_available = true';
    const params = [];

    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }
    query += ' ORDER BY category ASC, name ASC';

    const result = await pool.query(query, params);
    res.json({ success: true, count: result.rows.length, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMenuItem = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu_items WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { name, category, price, currency, description, image, isAvailable, isFeatured } = req.body;
    const result = await pool.query(
      `INSERT INTO menu_items (name, category, price, currency, description, image, is_available, is_featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, category, price, currency || 'USD', description, image || '/images/menu/default-dish.jpg', isAvailable !== false, isFeatured || false]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { name, category, price, currency, description, image, isAvailable, isFeatured } = req.body;
    const result = await pool.query(
      `UPDATE menu_items SET
        name = COALESCE($1, name),
        category = COALESCE($2, category),
        price = COALESCE($3, price),
        currency = COALESCE($4, currency),
        description = COALESCE($5, description),
        image = COALESCE($6, image),
        is_available = COALESCE($7, is_available),
        is_featured = COALESCE($8, is_featured)
       WHERE id = $9 RETURNING *`,
      [name, category, price, currency, description, image, isAvailable, isFeatured, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM menu_items WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
