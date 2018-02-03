// Connect with Socket.IO
const socket = io();

// Save reference to click count element.
const clickCountEl = document.querySelector('.click-count');

// Handle 'clicks' events from server.
socket.on('clicks', function (data) {
  clickCountEl.textContent = data.count;
});

// Send 'click' event to server when page is clicked.
document.addEventListener('click', (event) => {
  socket.emit('click', {
    x: event.clientX,
    y: event.clientY,
  });
});
