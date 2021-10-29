const User = require('../models/User')
const Booking = require('../models/Booking')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class BookingController {

    //POST
    booking(req, res, next) {
        let data = new Booking ({
            idUser: req.body.idUser,
            room_number: req.body.room_number,
            dateIn: req.body.dateIn,
            dateOut: req.body.dateOut
        })

        data.save()
            .then(booking => {
                res.json({
                    message: 'Informations bookings added!'
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error occured!'
                })
            })

    }
}




module.exports = new BookingController();