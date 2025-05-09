const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// testing registration
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
        password
      });

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt);

      // save the user to the database
      await user.save();

      // send back success response
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
      // check if its a mongodb duplicate key error
      if (err.code === 11000) {
          return res.status(400).json({ message: 'user already exists with that email' });
      }
      res.status(500).json({ message: 'server error' });
    }
  });

router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password){
    return res.status(400).json({message: 'provide email and password'});
  }
  try{
    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({message: 'wrong credentials'});
    }
    // password comparison
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch){
      return res.status(400).json({message: 'wrong credentials'});
    }

    const payload ={
      user: {
        id: user._id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {expiresIn: '1h'},
      (err, token) => {
        if (err) {
            console.error("jwt signing error:", err);
            return res.status(500).json({ message: 'error generating token' });
        }
        res.json({token}); // 
      }
    );

    

  } catch (err){
    console.error(err.message); //
    res.status(500).json({message: 'server error'});
  }
});
module.exports = router;