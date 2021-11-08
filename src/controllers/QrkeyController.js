const User = require('../models/User')
const Booking = require('../models/Booking')
const Qrkey = require('../models/Qrkey')
const QRCode = require('qrcode')

class QrkeyController {

    //POST
    createQR(req, res, next) {

        const stringData = JSON.stringify(req.body)
        const encodedString = Buffer.from(stringData).toString('base64')


        QRCode.toDataURL(
            encodedString, 
            {
                // version: 2,
                errorCorrectionLevel: 'M',
                margin: 4,              //default: 4
                scale: 4,               //default: 4
                width: 256,
                color:
                {
                    dark: '#000',
                    light: '#fff',
                }

            }, 
            function (err, url) {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                let data = new Qrkey ({
                    username: req.body.username,
                    qrcode: url
                })
                
                data.save()
                    .then(Qrkey => {
                        res.json({
                            message: 'Informations QR code added in database!'
                        })
                    })
                    .catch(error => {
                        res.json({
                            message: 'An error occured!'
                        })
                    })
            }
        )
        

    }

    readQR (req, res, next) {

        function messageRes(status) {
            res.json({
                isSuccess: status
            })
        }

        console.log(req.body);
        const stringData = req.body.qrcode
        const decodedString = Buffer.from(stringData, 'base64').toString('ascii')
        
        let jsonData = null
        try {
            jsonData = JSON.parse(decodedString);
        } catch (e) {
            return messageRes(false)
        }

        if ((jsonData.room_number) && (req.body.room_number == jsonData.room_number)) {
            Booking.findById( jsonData.idBooking )
                .then(Booking => {
                    if (Booking) {
                        return messageRes(true)
                    }
                    else return messageRes(false)
                })
                .catch(error => {
                    return messageRes(false)
                })
        }
        else return messageRes(false)
    }
}




module.exports = new QrkeyController();