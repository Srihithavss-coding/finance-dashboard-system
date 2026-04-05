const express = require('express');
const router = express.Router();
const { 
  createRecord, 
  getRecords, 
  updateRecord, 
  deleteRecord 
} = require('../controllers/recordController');

const { protect, authorize } = require('../middleware/auth');

// Protect all routes below this line
router.use(protect);

// Viewer, Analyst, and Admin can VIEW records
router.get('/', authorize('viewer', 'analyst', 'admin'), getRecords);

// ONLY Admin can CREATE, UPDATE, or DELETE records
router.post('/', authorize('admin'), createRecord);
router.put('/:id', authorize('admin'), updateRecord);
router.delete('/:id', authorize('admin'), deleteRecord);

module.exports = router;