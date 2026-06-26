const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
} = require('../controllers/reservationController');

const validateReservation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').trim().notEmpty().withMessage('Time is required'),
  body('guests').isInt({ min: 1, max: 50 }).withMessage('Guests must be between 1 and 50'),
];

router.post('/', validateReservation, createReservation);
router.get('/', getReservations);
router.get('/:id', getReservation);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);

module.exports = router;
