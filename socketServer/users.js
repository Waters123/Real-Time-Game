const users = [];

const addUser = ({ id, name, room, socket }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => users.room === room && user.name === name);

  if (existingUser) {
    return { error: 'username is taken' };
  }

  const user = { id, name, room, socket, isPlaying: false };
  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUSer = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => {
  currentUsersInRoom = users.filter((user) => user.room === room);
  return currentUsersInRoom;
};

module.exports = {
  addUser,
  removeUser,
  getUSer,
  getUsersInRoom
};
