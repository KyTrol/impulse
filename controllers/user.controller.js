const User = require("../models/user.model");

class UserController {
    
    login(req, res, err) {
        
        if (req.user) {
            res.send(req.user);
        } else {
            res.status(401);
            res.send({errorMessage: "Invalid username or password."});
        }

    }
    
    logout(req, res, err) {
        res.send('logout');
    }
    
    signup(req, res, err) {
        
        console.log("Signup called.");
        console.log(req.body.username);
        console.log(req.body);
        console.log(req.params);
        
        if (req.body.firstName && req.body.lastName && req.body.username && req.body.password && req.body.confirmPassword) {
            console.log("Required params exist.");
            if (req.body.password === req.body.confirmPassword) {
                console.log("Passwords match.");
                //const whiteList = /[^a-zA-Z0-9]/g;
                
                User.findByUsername(req.body.username).then(function(user) {
                   
                    if (!user) {
                        console.log("Username fine.");
                        const user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            username: req.body.username,
                            password: req.body.password
                        });
                        
                        user.save(function(user) {
                            console.log("User saved.");
                            res.send(user);
                        }).catch(function(err) {
                            console.error(err);
                            sendInternalServerError(res);
                        });
                    } else {
                        sendBadRequest('Username already taken.');
                    }
                    
                }).catch(function(err) {
                    console.error(err);
                    sendInternalServerError(res);
                });
                
            } else {
                sendBadRequest(res, "Passwords did not match.");
            }
        } else {
            sendBadRequest(res, "Missing parameters.");
        }
    }
    
    auth(req, res, err) {
        res.send("auth");
    }
    
}

function sendInternalServerError(res) {
    res.status(500);
    res.send({errorMessage: "Internal server error."});
}

function sendBadRequest(res, message) {
    res.status(400);
    res.send({errorMessage: message});
}


module.exports = UserController;