const Inputbox = ({ type, classes, value, onChange, name }) => {
  return (
    <input
      type={type}
      className={classes}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};

export default Inputbox;
