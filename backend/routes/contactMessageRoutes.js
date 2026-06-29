const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  submitContactMessage,
  getContactMessages,
  getContactMessage,
  updateContactMessageStatus,
  deleteContactMessage,
} = require('../controllers/contactMessageController');

const validateContactMessage = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

router.post('/', validateContactMessage, submitContactMessage);
router.get('/', getContactMessages);
router.get('/:id', getContactMessage);
router.put('/:id/status', updateContactMessageStatus);
router.delete('/:id', deleteContactMessage);

module.exports = router;
