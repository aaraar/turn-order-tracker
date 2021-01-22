import Button from '../Button';
import styles from './Entity.module.scss';

const Entity = ({ unit, socket }) => {
  const removeUnit = (unit) => {
    socket.emit('removeUnit', JSON.stringify(unit));
  };
  return (
    <div className={styles.Entity}>
      <span>Name: {unit.name}</span> <span>Initiative: {unit.initiative}</span>
      <Button
        onClick={() => {
          removeUnit(unit);
        }}>
        &times;
      </Button>
    </div>
  );
};

export default Entity;
