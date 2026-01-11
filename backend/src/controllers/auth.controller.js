import User from "../models/Account.js";
import Admin from "../models/Admin.js";

export const login = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;

    if (isAdmin) {
      // Check admin collection
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      if (admin.password !== password) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      admin.lastLogin = new Date();
      await admin.save();

      res.json({
        success: true,
        role: "admin",
        user: {
          id: admin._id,
          fullName: admin.fullName,
          email: admin.email,
          role: "admin",
          city: admin.city
        }
      });
    } else {
      // Check user collection
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      if (user.role !== "user") {
        return res.status(400).json({ error: "Access denied" });
      }

      if (user.password !== password) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      user.lastLogin = new Date();
      await user.save();

      res.json({
        success: true,
        role: user.role,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          city: user.city,
          joyPoints: user.joyPoints,
          walletValue: user.walletValue || user.joyPoints
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const { adminId } = req.params;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json({
      success: true,
      admin: {
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      success: true,
      profile: {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        city: user.city,
        role: user.role,
        joyPoints: user.joyPoints,
        walletValue: user.walletValue,
        playerStatus: user.playerStatus,
        joinedAt: user.joinedAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      success: true,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      city: user.city,
      joinedAt: user.joinedAt,
      joyPoints: user.joyPoints,
      walletValue: user.walletValue,
      playerStatus: user.playerStatus
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getWallet = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Filter activityLog for points history (meaningful actions only)
    const pointsHistory = user.activityLog.filter(activity => 
      ["game_win", "game_loss", "points_added", "points_deducted", "cash_converted", "game_purchased"].includes(activity.actionType)
    );

    res.json({
      success: true,
      fullName: user.fullName,
      email: user.email,
      playerStatus: user.playerStatus,
      joinedAt: user.joinedAt,
      joyPoints: user.joyPoints,
      walletValue: user.walletValue,
      activityLog: user.activityLog,
      pointsHistory: pointsHistory
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = new User({
      fullName: fullname,
      email,
      phone: "0000000000",
      password,
      role: "user",
      city: "Surat, Gujarat",
      joyPoints: 10,
      joinedAt: new Date(),
      status: "active"
    });

    await user.save();

    res.json({ success: true, message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};