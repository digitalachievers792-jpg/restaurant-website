const { pool } = require('../config/db');
const { validationResult } = require('express-validator');

exports.submitContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { name, email, phone, subject, message } = req.body;
    const result = await pool.query(
      `INSERT INTO contacts (name, email, phone, subject, message)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, phone || '', subject, message]
    );

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us. We will get back to you soon!',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json({ success: true, count: result.rows.length, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getContact = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM contacts WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
