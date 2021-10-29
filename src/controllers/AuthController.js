const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class AuthController {

    register (req, res, next) {
        bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
            if (err) {
                res.json({
                    error: err
                })
            }
    
            let user = new User ({
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: hashedPass
            })
            user.save()
                .then(user => {
                    res.json({
                        message: 'User added successfully!'
                    })
                })
                .catch(error => {
                    res.json({
                        message: 'An error occured!'
                    })
                })
        })
    }

    login (req, res, next) {
        let username = req.body.username;
        let password = req.body.password;
    
        User.findOne({ username: username })
            .then(user => {
                if (user) {
                    bcrypt.compare(password, user.password, function(err, result) {
                        if (err) {
                            res.json({
                                error: err
                            })
                        }
                        if (result) {
                            let token = jwt.sign({username: username}, 'secretValue', {expiresIn: '1h'})
                            res.json({
                                message: 'Login successful!',
                                token
                            })
                        }
                    })
                }
                else {
                    res.json({
                        message: 'No user found!'
                    })
                }
            })
    }

}

module.exports = new AuthController();