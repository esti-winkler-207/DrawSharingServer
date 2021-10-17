const c_users = [];
const c_point =[]

function join_User(id, username, room) {
  const p_user = { id, username, room };
  c_users.push(p_user);
  return p_user;
}

function get_Users(roomname){
  return c_users.filter((p_user)=>p_user.room===roomname)
  
}

function get_Points_Array(){
  return c_point;
}


function get_Current_User(id) {
  return c_users.find((p_user) => p_user.id === id);
}

function update_Points_Array(userId, username , color, x0, x1, y0, y1){
  const p_point = {userId, username , color, x0, x1, y0, y1};
  c_point.push(p_point);
}

function get_Points_Array_Filtered(userid){
  console.log(userid)
  const c_points_filtered = c_point.filter((point) =>{ return point.userId != userid.userid})
  //console.log(c_points_filtered)
  return c_points_filtered;

}

function get_Points_Array_Hidden(userid){
  const c_points_filtered = c_point.filter((point) =>{ return point.userId == userid.userid})
  return c_points_filtered;

}


function user_Disconnect(id){
  const index= c_users.findIndex(user => user.id === id)
  if(index != -1){
    return c_users.splice(index, 1)[0];
  }
}

module.exports = {
    join_User,
    get_Current_User,
    user_Disconnect,
    get_Users,
    get_Points_Array,
    update_Points_Array,
    get_Points_Array_Filtered,
    get_Points_Array_Hidden
  };