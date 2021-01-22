// Components
import EditableTextInput from '@/components/atoms/EditableTextInput';
import Button from '@/molecules/Button';

// Styles
import styles from './AddEntity.module.scss';

export default function AddEntity({ setNewUnit, newUnit, socket, loggedUser }) {
  const addNewUnit = () => {
    if (newUnit.name) {
      socket.emit('addUnit', JSON.stringify({ id: loggedUser.id, ...newUnit }));
      setNewUnit({ ...newUnit, name: '' });
    }
  };

  return (
    <div className={styles.AddEntity}>
      <EditableTextInput
        className={styles['input-text']}
        type="text"
        value={newUnit}
        setValue={setNewUnit}
        propKey="name"
        propType={String}
        id="newUnitName">
        Name
      </EditableTextInput>
      <EditableTextInput
        className={styles['input-number']}
        type="number"
        value={newUnit}
        setValue={setNewUnit}
        propKey="initiative"
        propType={Number}
        id="newUnitInitiative">
        Initiative
      </EditableTextInput>
      <Button
        className="btn btn-info"
        id="btnmsg"
        onClick={() => {
          addNewUnit();
        }}>
        Add
      </Button>
    </div>
  );
}
