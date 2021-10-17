const express = require("express");
const app = express();
const socket = require("socket.io");
const color = require("colors");
const cors = require("cors");
const 
{ get_Current_User,
  user_Disconnect,
  join_User,
  update_Points_Array, 
  get_Users,
  get_Points_Array,
  get_Points_Array_Filtered,
  get_Points_Array_Hidden  } = require("./dummyuser");

app.use(express());

app.use(cors());

const port = 8080;


var server = app.listen(
  port,
  console.log(
    `Server is running on the port no: ${(port)} `
      .green
  )
);

const io = socket(server);

io.on('connection', (socket) => {


  socket.on("joinRoom", ({ username, roomname}) => {
    
    const p_user = join_User(socket.id, username, roomname);
    console.log(socket.id, "=id");
    socket.join(p_user.room);
    const c_users = get_Users(roomname);
    const c_points = get_Points_Array();
    
    io.to(p_user.room).emit("joinRoom",{
      users : c_users,
      points : c_points
    })

    // io.to(socket.id).emit("welcome",{
    //   massage : username
    // })

  });

	socket.on('drawing', (data) => {
    const p_user = get_Current_User(socket.id);
    update_Points_Array(p_user.id,p_user.username, data.color, data.x0, data.x1, data.y0, data.y1)
    io.to(p_user.room).emit('drawing',{ 
      userId: p_user.id,
      username: p_user.username,
      data : data
    })
  })

  socket.on('hideUserDraw',(userid)=>{
    const p_points_filtered = get_Points_Array_Filtered(userid);
    io.to(socket.id).emit('hideUser',{
      p_points_filtered : p_points_filtered
    })
  })

  socket.on('showUserDraw',(userid)=>{
    //const p_user = get_Current_User(socket.id)
    const p_points_filtered = get_Points_Array_Hidden(userid);
    io.to(socket.id).emit('showUser',{
      p_points_filtered : p_points_filtered
    })
  })

	socket.on('disconnect', () =>  {
    const p_user = user_Disconnect(socket.id)
    if (p_user) {
      const c_users = get_Users(p_user.room);
      io.to(p_user.room).emit("data", {
        users : c_users
      });
    }

  })
})




    



