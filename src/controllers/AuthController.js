const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Booking = require('../models/Booking')
const Qrkey = require('../models/Qrkey')

class AuthController {

    register (req, res, next) {
        bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
            if (err) {
                res.json({
                    error: err
                })
            }
    
            let user = new User ({
                fullname: req.body.fullname,
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
        console.log(req.body);
        const username = req.body.username;
        const password = req.body.password;
        let fullname = null;
        let qrcode = null;
        // let roomNumber = null;
        let token = null;
    
        User.findOne({ username: username })
            .then(user => {
                if (user) {
                    console.log('here');
                    bcrypt.compare(password, user.password, function(err, result) {
                        if (err) {
                            res.json({
                                error: err
                            })
                        }
                        // res.send(password)

                        if (result) {
                            token = jwt.sign({username: username}, 'secretValue', {expiresIn: '1h'})
                            console.log('da den day');
                            fullname = user.fullname
                            // console.log(user._id);
                            //Get data need response
                            Booking.findOne({idUser: user._id})
                                // .then(booking => {
                                //     // console.log(booking.room_number);
                                //     return roomNumber = booking.room_number
                                //     // console.log(roomNumber);
                                // })
                                .then(booking => booking.room_number)
                                .then(roomNumber => {
                                    Qrkey.findOne({username: username})
                                        .then(qrkey => {
                                            console.log('da den day 2');

                                            qrcode = qrkey.qrcode
                                            // console.log({
                                            //     fullname: fullname,
                                            //     roomNumber: roomNumber,
                                            //     qrcode: qrcode
                                            // })
                                            res.json({
                                                message: 'Success',
                                                fullname: fullname,
                                                roomNumber: roomNumber,
                                                qrcode: qrcode,
                                                token: token,
                                            });
                                        })
                                        .catch((e) => res.json({error: e}))
                                })
                                .catch((e) => res.json({error: e}))
                            // const getData = () => {

                            // }
                            // getData()
                            
                            
                            // getData().then(data => {
                            //     res.json({
                            //         message: 'Success',
                            //         data,
                            //         token
                            //     })
                            // })
                            // getData().then(data => {
                            //     console.log(data);
                            // })
                        }
                        else {
                            res.json({
                                message: 'Invalid password'
                            })
                        }
                    })
                }
                else {
                    res.json({
                        message: "User doesn't exit"
                    })
                }
            })
            // .then(async user => {
            //     fullname = user.fullname
            //     console.log(fullname);
                // Booking.findOne({idUser: user._id})
                //     .then(booking => {
                //         // console.log(booking.room_number);
                //         roomNumber = booking.room_number
                //     })
                //     .catch((e) => res.json({error: e}))
                
                Qrkey.findOne({username: username})
                    .then(qrkey => {
                        qrcode = qrkey.qrcode
                        // console.log(qrcode);
                    })
                    .catch((e) => res.json({error: e}))
                
            //     // const data = await [roomNumber, qrcode]
            //     await res.json({
            //         roomNumber: roomNumber,
            //         qrcode: qrcode
            //     })
            //         // const data = await Promise.all({
            //     //     fullname: fullname,
            //     //     roomNumber: roomNumber,
            //     //     qrcode: qrcode,
            //     // })
            //     // return data
                
            // })
            .catch((e) => next)
    }

}

module.exports = new AuthController();