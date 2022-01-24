const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const port = 3333;

app.use(cors())

const AuthRoute = require('./src/routes/auth')
const BookingRoute = require('./src/routes/booking')
const QrkeyRoute = require('./src/routes/qrkey')

async function connectToDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/vkr2022_database", { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Hello from the Database side!');
  }
  catch (error) {
    console.log('Connect to db FAIL!!');
  }
} 
connectToDB()


app.use(morgan('combined'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', AuthRoute)
app.use('/api/booking', BookingRoute)
app.use('/api/qrcode', QrkeyRoute)

app.listen(port, () => {
  console.log(`Server is opening at http://localhost:${port}`)
})