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
        type="text"
        value={newUnit.name || ''}
        setValue={setNewUnit}
        propKey="name"
        propType={String}
        id="newUnitName">
        Name
      </EditableTextInput>
      <EditableTextInput
        type="number"
        value={newUnit.initiative || 0}
        setValue={setNewUnit}
        propKey="initiative"
        propType={Number}
        id="newUnitName">
        Initiative
      </EditableTextInput>
      <Button
        className="btn btn-info"
        id="btnmsg"
        onClick={() => {
          addNewUnit();
        }}>
        Send
      </Button>
    </div>
  );
}
