const { pool } = require('../config/db');
const { validationResult } = require('express-validator');

exports.createReservation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { tableNumber, date, time, name, email, phone, guests, specialRequests } = req.body;

    const existing = await pool.query(
      `SELECT * FROM reservations 
       WHERE table_number = $1 AND date = $2 AND time = $3 AND status != 'cancelled'`,
      [tableNumber, date, time]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Sorry, this table is already booked.',
      });
    }

    const result = await pool.query(
      `INSERT INTO reservations (name, email, phone, date, time, table_number, guests, special_requests)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, email || null, phone, date, time, tableNumber, guests, specialRequests || '']
    );

    res.status(201).json({
      success: true,
      message: 'Thanks for your booking! Your table is booked now.',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const { date, status } = req.query;
    let query = 'SELECT * FROM reservations';
    const params = [];
    const conditions = [];

    if (date) {
      params.push(date);
      conditions.push(`date = $${params.length}`);
    }
    if (status) {
      params.push(status);
      conditions.push(`status = $${params.length}`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY date DESC';

    const result = await pool.query(query, params);
    res.json({ success: true, count: result.rows.length, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getReservation = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservations WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, table_number, guests, special_requests, status } = req.body;
    const result = await pool.query(
      `UPDATE reservations SET 
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        phone = COALESCE($3, phone),
        date = COALESCE($4, date),
        time = COALESCE($5, time),
        table_number = COALESCE($6, table_number),
        guests = COALESCE($7, guests),
        special_requests = COALESCE($8, special_requests),
        status = COALESCE($9, status)
       WHERE id = $10 RETURNING *`,
      [name, email, phone, date, time, table_number, guests, special_requests, status, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM reservations WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    res.json({ success: true, message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
