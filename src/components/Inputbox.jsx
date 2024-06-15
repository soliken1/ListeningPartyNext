const Inputbox = ({ type, classes, value, onChange, name, pholder }) => {
  return (
    <input
      type={type}
      className={classes}
      value={value}
      placeholder={pholder}
      onChange={onChange}
      name={name}
    />
  );
};

export default Inputbox;
