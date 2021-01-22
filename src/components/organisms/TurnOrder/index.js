import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import usernameGenerator from 'username-generator';

// Components
import Button from '@/components/molecules/Button';
import chevron_down from '@/icons/expand_more.svg';
import UserList from '@/molecules/UserList';

// Styles
import styles from './Styles.module.scss';
import AddEntity from '@/components/molecules/AddEntity';

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

  // to remove a unit
  const removeUnit = (unit) => {
    socket.emit('removeUnit', JSON.stringify(unit));
  };

  // to remove a unit
  const sortUnits = (strategy) => {
    socket.emit('sortUnits', strategy);
  };

  return (
    <div className={styles.TurnOrder}>
      <UserList users={users} loggedUser={loggedUser} />

      <div>
        <h2> Turn Order </h2>
        <Button
          id="btnmsg"
          icon={chevron_down}
          onClick={() => {
            sortUnits('desc');
          }}>
          Sort Descending
        </Button>
        <ul>
          {units.unitList?.map((unit, index) => {
            return (
              <div key={index}>
                <p>
                  <span>{unit.name}</span> : {unit.initiative}
                </p>
                <Button
                  onClick={() => {
                    removeUnit(unit);
                  }}>
                  &times;
                </Button>
              </div>
            );
          })}
          <AddEntity
            newUnit={newUnit}
            setNewUnit={setNewUnit}
            socket={socket}
            loggedUser={loggedUser}
          />
        </ul>
      </div>
    </div>
  );
}
