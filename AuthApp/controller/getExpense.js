const jwt = require('jsonwebtoken');
const Expense = require('../model/Expenses');
const User = require('../model/User');

const getExpense = async (req, res) => {
  try {
    // Extract the JWT token from the request headers
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Verify the JWT token and extract the user ID from the payload
    const decoded = jwt.verify(token, 'expense');
    const userId = decoded.id;

    // Find user by ID to ensure it exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Find all expenses associated with the user
    const expenses = await Expense.find({ user: userId });

    // Return the expenses
    res.status(200).json({ success: true, expenses });
  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { getExpense };
