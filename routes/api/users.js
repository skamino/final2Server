//users.js
//Description: user routers and function are all combined here
//Author: Previous dev team/Stephen Kamino
//Date: ?/March 01 2022

const express = require('express');
const Router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//Load Input Validation
const validateRegisterInput = require('../validation/register.js');
const validateLoginInput = require('../validation/login');

// Load User model
const User = require('../../models/User');
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
//

//Post Router api/users/register
//Author: Previous Dev/Stephen Kamino
//Date: Feb 20 2022
Router.post('/register', (req, res) => {
    //Form Validation
    //Destructuring Values
    /*const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }*/
    console.log('after error');
    User.findOne({ email: req.body.email}, (err, user) => {
        if(err){
            console.log(err);
            res.send('error failed register');
        }
        if(user){
            console.log(err);
            res.send('Email already exists');
        }
        else{
            let newUser = User({
                email: req.body.email,
                role: req.body.role,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(res.send('successful register'))
                });
            });
        }
    });
    
});

//Post Router api/users/reset-password
//Author: Prev Dev Team
//Date: ?
Router.post('/forgotpassword',(req,res)=>{
    console.log(req.body.email);
    const email = req.body.email;

    try {
      User.findOne({
        email:email
    }).then(user => {
        //Check if Your Exists
        if (!user) {
            return res.status(404).json({
                emailNotFound: "Email is not registered"
                
            });
        }

      const resetToken = user.email;
  
     
  
      const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`
    
      const message= `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
       
        `
      try {const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth : {
            user: 'reserveme40@gmail.com',
            pass: 'Awsd1234'
        }
    })
    
    const mailOptions = {
        from :'reserveme40@gmail.com',
        to: email,
        subject : "Password Reset Request",
        html : message
    }

    transporter.sendMail(mailOptions,function (err,info) {
        if (err) {
            console.log(err);
        }else{
            console.log(info);
        }
    })
        
        res.status(200).json({success:true ,data:"Email Sent"})
      } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        
  

  
        return next(new ErrorResponse("Email could not be send",500))
  
      }
    });
  
  
    } catch (error) {
      next()
    }
})

//Post Router api/users/new-password
//Author: Prev Dev Team
//Date: ?
Router.put('/passwordreset/:resetToken',(req,res)=>{
    const restToken = req.params.resetToken;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
  try {
        User.findOne({
          email:restToken
      }).then(user => {

    if(!user){
      return next(new ErrorResponse("Invalid Reset Token",400))
    }

    const newUser = new User({
        name: user.name,
        email: restToken,
        role: user.role,
        password : hash,
    })

    User.findByIdAndUpdate(user._id, {
        password: hash
    },(error, data) => {
        if (error) {
          return next(error);
          console.log(error)
        } else {
          res.json(data)
          console.log('Student updated successfully !')
        }
    })
});
  } catch (error) {
    console.log(error)
  }
});
});
})


//Post Router api/users/login
//Author: Stephen Kamino
//Date: Feb 20 2022
Router.post('/login', (req, res) => {
    //console.log(req.body.username);
    //add verifier in here
    const email = req.body.username;
    const password = req.body.password;

    User.findOne({ email: email }, (err, user) => {
        if(err)
        {
            console.log(err);
            res.send('error: login failed');
            return;
        }
        if(!user)
        {
            console.log(err);
            res.send('error: user does not exist');
            return;
        }
        else
        {
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    //User Matched
                    //Create JWT Payload
                    const payload = {
                        id: user.id,
                        name: user.name,
                        role: user.role
                    };

                    //Sign Token
                    jwt.sign(payload, config.get('secretOrKey'), {
                        expiresIn: 7200
                    }, (err, token) => {
                        //console.log('match');
                        res.send({
                            success: true,
                            token: "Bearer" + token
                        });
                    });
                } else {
                    return res.status(400).json({
                        passwordIncorrect: "Password incorrect"
                    });
                }
            });
        }
    });    
});

  /*  User.findOne({
        email:email
    }).then(user => {
        //Check if Your Exists
        if (!user) {
            return res.status(404).json({
                emailNotFound: "Email is not registered"
            });
        }

        //Match Password
        bcrypt.compare(password, user.password,)
            .then(isMatch => {
                if (isMatch) {
                    //User Matched
                    //Create JWT Payload
                    const payload = {
                        id: user.id,
                        name: user.name,
                        role: user.role
                    };

                    //Sign Token
                    jwt.sign(payload, config.get('secretOrKey'), {
                        expiresIn: 63113852 //2 years in seconds    ‬
                    }, (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer" + token
                        });
                    });
                } else {
                    return res.status(400).json({
                        passwordIncorrect: "Password incorrect"
                    });
                }
            });
    });*/


module.exports = Router;