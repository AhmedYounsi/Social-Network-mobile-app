 
 const express = require("express");
 const app = express();
 
 // END MODELS
 const cors = require("cors");
 const server = require("http").createServer(app);
 app.use(cors());
const io = require("socket.io")(server);

 
io.on("connection", (socket) => {
  socket.on("message", () => {
    socket.emit("message", "socket work !");
  });
  socket.on('LIKE_POST',data=>{
    console.log(data)
  })
});