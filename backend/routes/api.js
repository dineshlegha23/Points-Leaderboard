const express = require("express");
const router = express.Router();
const User = require("../models/User");
const PointHistory = require("../models/PointHistory");

// Initialize users
router.post("/init-users", async (req, res) => {
  try {
    const initialUsers = [
      "Rahul",
      "Kamal",
      "Sanak",
      "Priya",
      "Amit",
      "Sneha",
      "Ravi",
      "Neha",
      "Vikram",
      "Anita",
    ];

    await User.deleteMany({});
    const users = await User.insertMany(
      initialUsers.map((name) => ({ name, totalPoints: 0 }))
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new user
router.post("/users", async (req, res) => {
  try {
    const username = req.body;
    if (!username)
      return res.status(400).json({ error: "Please provide name" });
    let name = username.name;
    const user = new User({ name, totalPoints: 0 });
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Claim points
router.post("/claim-points", async (req, res) => {
  try {
    const userid = req.body;
    if (!userid.userId)
      return res.status(400).json({ error: "Please provide userId" });
    const points = Math.floor(Math.random() * 10) + 1;
    let userId = userid.userId;

    // Update user points
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: points } },
      { new: true }
    );

    // Create point history
    const history = new PointHistory({
      userId,
      points,
    });
    await history.save();

    res.json({ user, points });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });

    const leaderboard = users.map((user, index) => ({
      ...user._doc,
      rank: index + 1,
    }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get point history
router.get("/point-history/:userId", async (req, res) => {
  try {
    if (!req.params.userId)
      return res.status(400).json({ error: "Please provide userId" });
    const history = await PointHistory.find({ userId: req.params.userId })
      .populate("userId", "name")
      .sort({ timestamp: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
