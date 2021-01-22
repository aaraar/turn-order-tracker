import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import usernameGenerator from 'username-generator';

// Components
import UserList from '@/molecules/UserList';

// Styles
import styles from './Styles.module.scss';
import EntityList from '../EntityList';

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_IO_INSTANCE;
const socket = socketIOClient(ENDPOINT);

export default function TurnOrder() {
  const [users, setUser] = useState({
    usersList: []
  });
  const [units, setUnits] = useState({
    unitList: []
  });
  const [newUnit, setNewUnit] = useState({
    name: '',
    initiative: 0
  });
  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {
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
  }, []);

  return (
    <div className={styles.TurnOrder}>
      <UserList users={users} loggedUser={loggedUser} />

      <EntityList
        socket={socket}
        loggedUser={loggedUser}
        units={units}
        newUnit={newUnit}
        setNewUnit={setNewUnit}
      />
    </div>
  );
}
