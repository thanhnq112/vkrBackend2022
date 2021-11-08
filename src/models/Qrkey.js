const mongoose = require('mongoose')
const Schema = mongoose.Schema

const qrkeySchema = new Schema({
    username: { 
        type: String,
        unique: true
    },
    qrcode: { type: String },
}, { timestamps: true })

const Qrkey = mongoose.model('qrkey', qrkeySchema)
module.exports = Qrkey