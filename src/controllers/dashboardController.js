const Record = require('../models/Record');

// @desc    Get dashboard summary (Totals & Balance)
// @route   GET /api/dashboard/summary
// @access  Private (Analyst, Admin)
exports.getSummary = async (req, res) => {
  try {
    const stats = await Record.aggregate([
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
          },
          totalExpense: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalIncome: 1,
          totalExpense: 1,
          netBalance: { $subtract: ["$totalIncome", "$totalExpense"] }
        }
      }
    ]);

    // If no records exist, return zeros
    const result = stats.length > 0 ? stats[0] : { totalIncome: 0, totalExpense: 0, netBalance: 0 };
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get category-wise totals
// @route   GET /api/dashboard/categories
// @access  Private (Analyst, Admin)
exports.getCategoryStats = async (req, res) => {
  try {
    const categoryStats = await Record.aggregate([
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { totalAmount: -1 } }
    ]);

    res.status(200).json(categoryStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};