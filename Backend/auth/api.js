const express = require("express");
//const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("./userSchema");

const db = "mongodb+srv://deals:deals@cluster0.fxdvc.mongodb.net/Auth?retryWrites=true&w=majority";

mongoose.connect(
	db,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Connected to UserDb");
		}
	}
);

  
function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}
  //API end points
  router.get("/", (req, res) => {
    res.send("User API running ");
  });
  // api for register user
  router.post("/register", (req, res) => {
    
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      hashpassword: bcrypt.hashSync(req.body.password, 10)
    });
    user.save((err, registeredUser) => {
      if (err) {
        console.log(err);
      } else {
        let payload = { subject: registeredUser._id };
        let token = jwt.sign(payload, "secretKey");
        res.status(200).send({ token });
      }
    });
  });

  //api for login user
      

  router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({email: userData.email}, (err, user) => {
      if (err) {
        console.log(err)    
      } else {  
        if (!user) {
          res.status(401).send('Invalid Email')
        } else 
        // if ( user.password !== userData.password) {
          if (!(bcrypt.compareSync(req.body.password, user.hashpassword))) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {subject: user._id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      }
    });
  });


module.exports = router;
