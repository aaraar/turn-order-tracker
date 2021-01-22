import usernameGenerator from 'username-generator';

const socketHandler = (socket, setUser, setLoggedUser, setUnits) => {
  // subscribe a new user
  socket.emit('login', usernameGenerator.generateUsername());
  // list of connected user
  socket.on('users', (data) => {
    setUser({ usersList: JSON.parse(data) });
  });
  // get the logged users
  socket.on('connecteduser', (data) => {
    setLoggedUser(JSON.parse(data));
  });

  // we get the units
  socket.on('units', (data) => {
    setUnits({ unitList: JSON.parse(data) });
  });
};

export default socketHandler;
