const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    idUser: { type: mongoose.ObjectId }, 
    room_number: { type: String },
    dateIn: { type: Date },
    dateOut: { type: Date },
}, { timestamps: true })

const Booking = mongoose.model('booking', bookingSchema)
module.exports = Booking