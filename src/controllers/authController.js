const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "verySecureSECRET";
const expiry = 3600;

exports.registerNewUser = (req, res) => {
    //fetch user details from req body
    const user = req.body.user;
    //check  if user exist
    User.findOne({username: user.username}, (err, existingUser) => {
        if(err){
            return res.status(500).json({message: err});
        }
        if(existingUser) {
            return res.status(400).json({message: `User with username ${user.username}already exists`});
        }
        //create user if user is not found
        User.create({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username
        },(err, newUser) => {
            if(err) {
                return res.status(500).json({message: err});
            }
            //hash the user password
            bcrypt.genSalt(10, (err, salt) => {
                if(err) {
                    return res.status(500).json({message: err});
                }
                bcrypt.hash(user.password, salt, (err, hashedPassword) => {
                    if(err) {
                        return res.status(500).json({message: err});
                    }
                    // save password to db
                    newUser.password = hashedPassword;
                    newUser.save((err, savedUser) => {
                        if(err){
                            return res.status(500).json({message: err});
                        }
                        //create jwt for user
                        jwt.sign({
                            id: newUser.id,
                            username: newUser.username,
                            firstName: newUser.firstName,
                            lastName: newUser.lastName
                        }, secret, {expiresIn: expiry}, (err, token) => {
                            if(err){
                            return res.status(500).json({message: err});
                            }
                            //send token to user
                            return res.status(200).json({message: "user registration successful",
                        token})
                        })
                    })
                })
            })
        })
    })

}

exports.loginUser = (req, res) => {
    //get user details from request body
    const user = req.body.user;

    //check if user exists
    User.findOne({username: user.username}, (err, foundUser) => {
        if(err) {
            return res.status(500).json({message: err});
        }
        if(!foundUser) {
            return res.status(401).json({message: `User with username ${user.username} not found`});
        }
        //checks if password matches the password in the database
        let matchPassword = bcrypt.compareSync(user.password, foundUser.password);

        if(!matchPassword) {
            return res.status(401).json({message: "Incorrect password"});
        }
        //create token and return it to the user
        jwt.sign({
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            username: foundUser.username,
        }, secret, {expiresIn: expiry}, (err, token) => {
            if(err) {
                return res.status(500).json({mressage: err});
            }
            return res.status(201).json ({message: "Successful", token});
        })
    })
}