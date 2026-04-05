const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Please specify if this is income or an expense'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category (e.g., Food, Salary, Rent)'],
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot be more than 200 characters'],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true, // Automatically creates createdAt and updatedAt fields
});

module.exports = mongoose.model('Record', recordSchema);