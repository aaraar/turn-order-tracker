const EditableTextInput = ({
  id,
  type,
  className,
  propKey = 'name',
  propType = String,
  value,
  setValue,
  children
}) => {
  return (
    <label className={className}>
      {children && children}
      <input
        type={type}
        id={id}
        value={value[propKey]}
        onChange={(event) => setValue({ ...value, [propKey]: propType(event.target.value) })}
      />
    </label>
  );
};

export default EditableTextInput;
