const { pool } = require('../config/db');
const { validationResult } = require('express-validator');

exports.createOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { customerName, customerGender, itemName, itemPrice, quantity } = req.body;
    const result = await pool.query(
      `INSERT INTO orders (customer_name, customer_gender, item_name, item_price, quantity)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [customerName, customerGender, itemName, itemPrice, quantity]
    );
    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { from, to } = req.query;
    let query = 'SELECT * FROM orders';
    const params = [];
    const conditions = [];
    if (from) { params.push(from); conditions.push(`order_date >= $${params.length}`); }
    if (to) { params.push(to); conditions.push(`order_date <= $${params.length}::date + interval '1 day'`); }
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY order_date DESC';
    const result = await pool.query(query, params);
    res.json({ success: true, count: result.rows.length, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
