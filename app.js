const createSocketInterface = require('socket.io');
const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = createSocketInterface(server);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Keep a running count of client clicks.
// When a new click comes in, send an updated count to all clients.
let numberOfClicks = 0;
io.on('connection', (socket) => {
  // Send update to client that just connected.
  socket.emit('clicks', { count: numberOfClicks, });

  socket.on('click', (data) => {
    // Increment count of client clicks.
    numberOfClicks++;

    // Log the data, which might contain click coordinates.
    console.log(data);

    // Send update to all clients.
    io.sockets.emit('clicks', { count: numberOfClicks, })
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
