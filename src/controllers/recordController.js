const Record = require('../models/Record');

// @desc    Create a new record
// @route   POST /api/records
// @access  Private/Admin
exports.createRecord = async (req, res) => {
  try {
    // Add user ID to the record data
    req.body.createdBy = req.user.id;
    
    const record = await Record.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all records (with filtering)
// @route   GET /api/records
// @access  Private (Viewer, Analyst, Admin)
exports.getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate, search, page = 1, limit = 10 } = req.query;
    let query = { isDeleted: false }; // Requirement for Soft Delete below

    // 1. Search Support (Regex search on description)
    if (search) {
      query.description = { $regex: search, $options: 'i' };
    }

    // 2. Existing Filters
    if (type) query.type = type;
    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // 3. Pagination Logic
    const skip = (page - 1) * limit;
    const total = await Record.countDocuments(query);

    const records = await Record.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      count: records.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      data: records
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a record
// @route   PUT /api/records/:id
// @access  Private/Admin
exports.updateRecord = async (req, res) => {
  try {
    let record = await Record.findById(req.params.id);

    if (!record) return res.status(404).json({ message: 'Record not found' });

    record = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a record
// @route   DELETE /api/records/:id
// @access  Private/Admin
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });

    // Soft delete: just flip the flag
    record.isDeleted = true;
    await record.save();

    res.status(200).json({ message: 'Record moved to trash (Soft Deleted)' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};