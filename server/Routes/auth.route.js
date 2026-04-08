const express = require('express');
const User = require('../Models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = express.Router();


const signupUser = async(req, res)=>{
  try {
    const {name, email, password} = req.body;
    // console.log(name);
    // console.log(email);
    // console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({name, email, password: hashedPassword});
    return res.status(201).json({message: "User created", user: {username: user.name, id: user._id} });

  } catch (error) {
    if(error.code === 11000) return res.status(409).json({message: "email already exists"});
    return res.status(500).json({message: "Failed to create user"})
  }
}

const loginUser = async(req, res)=>{
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email: {$eq: email}});
    if(!user) return res.status(401).json({message: "Invalid email or password"});
    // console.log("user: ", user);
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(401).json({message: "Invalid email or password"});
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn:'1d'})
    return res.status(201).json({message: "User LoggedIn", user: {id: user._id},token});

  } catch (error) {
    return res.status(500).json({message: "failed to login"});
  }
}
router.post('/signup', signupUser);
router.post('/login', loginUser);

module.exports = router;