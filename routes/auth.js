const express = require('express');
const router = express.Router();
const User = require('../models/User');

// testing registration, does not hash the password
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    //check if data is provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'please provide name email and password' });
    }
  
    try {
      //check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'user already exists with that email' });
      }
  
      //create a new user using the model
      user = new User({
        name,
        email,
        password //plain text password, we need to hash this
      });
  
      // save the user to the database
      await user.save();
  
      // send back success response avoid sending password back
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
       });
  
    } catch (err) {
      // handle potential errors like database errors or validation errors
      console.error(err.message);
      // check if it's a mongodb duplicate key error
      if (err.code === 11000) {
          return res.status(400).json({ message: 'user already exists with that email' });
      }
      res.status(500).json({ message: 'server error' });
    }
  });
  
  module.exports = router;