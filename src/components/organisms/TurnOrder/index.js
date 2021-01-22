import Icon from '@/atoms/Icon';
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import usernameGenerator from 'username-generator';
import styles from './Styles.module.scss';
import chevron_left from '@/icons/chevron_left.svg';

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_IO_INSTANCE;
const socket = socketIOClient(ENDPOINT);

export default function TurnOrder() {
  const [user, setUser] = useState({
    usersList: null
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
    // list of connected users
    socket.on('users', (data) => {
      setUser({ usersList: JSON.parse(data) });
    });
    // get the logged user
    socket.on('connecteduser', (data) => {
      setLoggedUser(JSON.parse(data));
    });

    // we get the units
    socket.on('units', (data) => {
      setUnits({ unitList: JSON.parse(data) });
    });

    // // we get a new unit
    // socket.on("newUnit", data => {
    //     const unitList = units.unitList;
    //     unitList.push(JSON.parse(data));
    //     setUnits({unitList});
    // });
    //
    // // we get a new unit
    // socket.on("removeUnit", data => {
    //     let unitList = units.unitList;
    //     const staleUnit = JSON.parse(data);
    //     unitList = unitList.filter(unit => unit.id !== staleUnit.id);
    //     setUnits({unitList});
    // });
  }, []);

  // to add a unit
  const addUnit = () => {
    if (newUnit.name) {
      socket.emit('addUnit', JSON.stringify({ id: loggedUser.id, ...newUnit }));
      setNewUnit({ ...newUnit, name: '' });
    }
  };

  // to remove a unit
  const removeUnit = (unit) => {
    socket.emit('removeUnit', JSON.stringify(unit));
  };

  // to remove a unit
  const sortUnits = (strategy) => {
    socket.emit('sortUnits', strategy);
  };

  const logValue = (value) => {
    console.log(value);
  };

  return (
    <div>
      <div className={styles.icon_test}>
        <Icon icon={chevron_left} />
      </div>
      <h3 className="d-flex justify-content-center">Connected users : {user.usersList?.length}</h3>
      <table className="table">
        <thead>
          <tr>
            <th> User name</th>
            <th> Connection Date</th>
          </tr>
        </thead>
        <tbody>
          {user.usersList?.map((user) => {
            return (
              <tr key={user.id}>
                <td> {user.userName} </td>
                <td> {user.connectionTime} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h3 className="d-flex justify-content-center"> User : {loggedUser?.userName} </h3>
      <div>
        <h2 className="d-flex justify-content-center"> Turn Order </h2>
        <button
          className="btn btn-info"
          id="btnmsg"
          onClick={() => {
            sortUnits('desc');
          }}>
          {' '}
          Sort Descending{' '}
        </button>
        <ul>
          {units.unitList?.map((unit, index) => {
            return (
              <div className="d-flex justify-content-center" key={index}>
                <b>{unit.name} </b>:
                <small style={{ marginLeft: '18px', color: 'blue', marginTop: '5px' }}>
                  {' '}
                  {unit.initiative}{' '}
                </small>
                <button
                  onClick={() => {
                    removeUnit(unit);
                  }}>
                  &times;
                </button>
              </div>
            );
          })}
          <label>
            Name
            <input
              style={{ width: '300px', display: 'inline' }}
              value={newUnit.name}
              id="newUnitName"
              onChange={(event) => setNewUnit({ ...newUnit, name: String(event.target.value) })}
            />
          </label>
          <label>
            Initiative
            <input
              type="number"
              style={{ width: '300px', display: 'inline' }}
              value={newUnit.initiative}
              id="newUnitName"
              onChange={(event) =>
                setNewUnit({ ...newUnit, initiative: Number(event.target.value) })
              }
            />
          </label>
        </ul>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-info"
          id="btnmsg"
          onClick={() => {
            addUnit();
          }}>
          {' '}
          Send{' '}
        </button>
        <button
          className="btn btn-info"
          id="btnmsg"
          onClick={() => {
            logValue(units);
          }}>
          {' '}
          Log Units{' '}
        </button>
      </div>
    </div>
  );
}
