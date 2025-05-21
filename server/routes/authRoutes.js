import express from 'express';
import User from '../models/User.js'; // Make sure path is correct

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register error:',error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;