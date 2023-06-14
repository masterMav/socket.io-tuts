const { instrument } = require("@socket.io/admin-ui");

const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("send-msg", (msg, room) => {
    if (room === "") socket.broadcast.emit("receive-msg", msg);
    else socket.to(room).emit("receive-msg", msg);
  });

  socket.on("join-room", (room, cb) => {
    socket.join(room);

    cb(`Joined room: ${room}`);
  });
});

instrument(io, { auth: false });
