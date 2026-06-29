const { pool } = require('../config/db');
const { validationResult } = require('express-validator');

exports.submitContactMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { name, email, phone, subject, message } = req.body;
    const result = await pool.query(
      `INSERT INTO contact_messages (name, email, phone, subject, message, status)
       VALUES ($1, $2, $3, $4, $5, 'unread') RETURNING *`,
      [name, email, phone || '', subject, message]
    );
    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getContactMessages = async (req, res) => {
  try {
    let { page, limit, status, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    const whereClauses = [];
    const whereParams = [];

    if (status && (status === 'read' || status === 'unread')) {
      whereParams.push(status);
      whereClauses.push(`status = $${whereParams.length}`);
    }
    if (search) {
      whereParams.push(`%${search}%`);
      whereClauses.push(`(name ILIKE $${whereParams.length} OR email ILIKE $${whereParams.length} OR subject ILIKE $${whereParams.length} OR message ILIKE $${whereParams.length})`);
    }

    const whereSQL = whereClauses.length ? ' WHERE ' + whereClauses.join(' AND ') : '';

    const countResult = await pool.query(`SELECT COUNT(*) AS total FROM contact_messages${whereSQL}`, whereParams);
    const total = parseInt(countResult.rows[0].total);

    const dataParams = [...whereParams, limit, offset];
    const dataResult = await pool.query(
      `SELECT * FROM contact_messages${whereSQL} ORDER BY created_at DESC LIMIT $${whereParams.length + 1} OFFSET $${whereParams.length + 2}`,
      dataParams
    );

    res.json({
      success: true,
      count: dataResult.rows.length,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: dataResult.rows,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getContactMessage = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contact_messages WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateContactMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['read', 'unread'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be "read" or "unread"' });
    }
    const result = await pool.query(
      'UPDATE contact_messages SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, message: `Message marked as ${status}`, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteContactMessage = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM contact_messages WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
