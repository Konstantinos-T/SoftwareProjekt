//helper functions

const users = [];

//add user
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase(); //trim removes all whitespace
  room = room.trim().toLowerCase();

  // const existingUser = users.find(
  //   (user) => user.room === room && user.name === name
  // ); //forbides user with the same name in the same room

  if (!name || !room) return { error: "Username and room are required." };
  // if (existingUser) return { error: "Username is taken." };

  const user = { id, name, room };

  users.push(user);

  return { user }; //which user was pushed
};

//remove user
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

//get user if the user exist
const getUser = (id) => users.find((user) => user.id === id);

//get user in correct room with filter funciton
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

//esport the modules
export { addUser, removeUser, getUser, getUsersInRoom };
