const express = require('express')
const router = express.Router()

const QrkeyController = require('../controllers/QrkeyController')

router.post('/createQR', QrkeyController.createQR)
router.post('/readQR', QrkeyController.readQR)

module.exports = router