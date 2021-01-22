import styles from './Input.module.scss';

const EditableTextInput = ({
  id,
  type,
  propKey = 'name',
  propType = String,
  value,
  setValue,
  children
}) => {
  return (
    <label className={styles.Input}>
      {children && children}
      <input
        type={type}
        id={id}
        value={value}
        onChange={(event) => setValue({ ...value, [propKey]: propType(event.target.value) })}
      />
    </label>
  );
};

export default EditableTextInput;
