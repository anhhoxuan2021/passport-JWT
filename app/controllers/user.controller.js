'use strict';
const User = require('../models/user.model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET

//Signup
exports.sign_up = async(req, res) =>{
    const { data} = req.body;
     delete data.confirm_password
    try{
         const newUser = await User.create(data)

         res.status(201).json(newUser)
    }catch (error) {
        res.status(500).json({error: 'Failed to register user'})
    }
}

//Signin
exports.login = async (req, res) => {
    const {email, password} = req.body
    try {

        const user = await User.findOne({
            where :{email:email},
            raw:true  //To disable this wrapping and receive a plain response instead
        })
             
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }

          delete user.password 
          user.full_name = `${user.first_name } - ${user.last_name }`
          const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
          
          res.json({ token: token, user: user });

    } catch(error) {
        res.status(500).json({error: 'Failed to login'})
    }
}
///logout
exports.userLogout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.json({ message: true });
      });
    
  };

