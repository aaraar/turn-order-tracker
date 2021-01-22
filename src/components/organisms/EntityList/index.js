import AddEntity from '@/components/molecules/AddEntity';
import Button from '@/components/molecules/Button';
import Entity from '@/components/molecules/Entity';
import chevron_down from '@/icons/expand_more.svg';
import styles from './EntityList.module.scss';

const EntityList = ({ socket, loggedUser, units, newUnit, setNewUnit }) => {
  return (
    <div className={styles.EntityList}>
      <Button
        icon={chevron_down}
        onClick={() => {
          socket.emit('sortUnits', 'desc');
        }}>
        Sort Descending
      </Button>
      <ul>
        {units.unitList?.map((unit, index) => {
          return (
            <li key={index}>
              <Entity unit={unit} socket={socket} />
            </li>
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
  );
};

export default EntityList;
