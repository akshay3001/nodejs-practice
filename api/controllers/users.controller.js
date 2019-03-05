const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user-model');


exports.user_signUp = (req, res, next) => {
    User.find({
        email: req.body.email
    }).then(
        user => {
            // Here user is array of objects
            if (user.length >= 1) {
                res.status(409).json({
                    message: 'Email Already Exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(409).json({
                            error: err
                        });
                    } else {
                        let userCredentials = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });

                        userCredentials.save().then(
                            user => {
                                console.log('user/signup Save res: ', user);
                                res.status(201).json({
                                    message: 'User Created!!'
                                });
                            }
                        ).catch(
                            err => {
                                console.log('user/signup Save err', err);
                                res.status(500).json({
                                    error: err
                                });
                            }
                        );
                    }
                });
            }
        }
    ).catch(
        err => {
            console.log('user/signup post err', err);
            res.status(500).json({
                error: err
            });
        }
    );
}

exports.user_login = (req, res, next) => {
    let userEmail = req.body.email;
    User.find({
        email: userEmail
    })
        .then(
            user => {
                if (user.length < 1) {
                    res.status(401).json({
                        error: 'Unauthorized'
                    });
                }
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        res.status(401).json({
                            error: 'Unauthorized'
                        });
                    }
                    if (result) {
                        var jwtToken = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id,
                        }, "secret-jwt-key", {
                                expiresIn: "1h"
                            });
                        res.status(201).json({
                            message: 'Login successfull',
                            token: jwtToken
                        });
                    }
                });
            }
        )
        .catch(
            err => {
                res.status(401).json({
                    error: 'Unauthorized'
                });
            }
        );
}

exports.user_deleteUser = (req, res, next) => {
    let userId = req.params.userId;
    console.log('Delete user id', userId);
    User.deleteOne({
        _id: userId
    }).then(
        delUser => {
            console.log('Delete user res: ', delUser);
            res.status(200).json({
                message: 'User Deleted!'
            });
        }
    ).catch(
        err => {
            console.log('Delete user err: ', err);
            res.status(500).json({
                error: err
            });
        }
    );
}

exports.user_getAll = (req, res, next) => {
    User.find().select('email password').then(
        allUsers => {
            console.log('All users res: ', allUsers);
            res.status(200).json(allUsers);
        }
    ).catch(
        err => {
            console.log('All users err ', err);
        }
    );
}