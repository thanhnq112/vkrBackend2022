const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ip = require('ip');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


// const server = require('http').Server(app);
// const io = require('socket.io')(server);
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require('socket.io');
// const io = new Server(server);
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


// function timeout() {
//   setTimeout(function () {
//     io.emit('reply',"A message from server");
//     timeout();
//   }, 5000);
// }
// http.listen();

server.listen(port, () => {
  console.log(`Server is opening at http://${ip.address()}:${port}`)
})

// const server = app.listen(port, () => {
//   console.log(`Server is opening at http://${ip.address()}:${port}`)
// });



// const io = require("socket.io")(server, {
//   allowEIO3: true,
//   cors: {
//     origin: true,
//     methods: ['GET', 'POST'],
//     credentials: true
//   }
// });
// const io = require("socket.io")(server);

io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id);

  socket.emit('msg', "test message!!");
  
  //Whenever someone disconnects this piece of code executed
  // socket.on('disconnect', function () {
  //   console.log('A user disconnected');
  // });
 
  // socket.on('message', function (msg) {
  //   console.log("message: "+msg);
  // });
  // timeout();
});