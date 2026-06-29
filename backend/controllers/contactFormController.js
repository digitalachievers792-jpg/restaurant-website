const { pool } = require('../config/db');
const { validationResult } = require('express-validator');

exports.submitContactForm = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { name, age, gender, city, email, description } = req.body;
    const result = await pool.query(
      `INSERT INTO contact_forms (name, age, gender, city, email, description)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, age, gender, city, email, description]
    );

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getContactForms = async (req, res) => {
  try {
    const { from, to } = req.query;
    let query = 'SELECT * FROM contact_forms';
    const params = [];
    const conditions = [];
    if (from) { params.push(from); conditions.push(`created_at >= $${params.length}`); }
    if (to) { params.push(to); conditions.push(`created_at <= $${params.length}::date + interval '1 day'`); }
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    res.json({ success: true, count: result.rows.length, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getContactForm = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contact_forms WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Contact form not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteContactForm = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM contact_forms WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Contact form not found' });
    }
    res.json({ success: true, message: 'Contact form deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
