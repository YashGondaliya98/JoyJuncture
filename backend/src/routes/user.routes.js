import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get all users (admin only)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create admin user
router.post('/users/admin', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    
    const adminUser = new User({
      name,
      email,
      password,
      phone,
      role: 'admin'
    });
    
    await adminUser.save();
    
    const userResponse = adminUser.toObject();
    delete userResponse.password;
    
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;