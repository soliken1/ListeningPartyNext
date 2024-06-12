const Inputbox = ({ type, classes, name }) => {
  return <input id={name} name={name} type={type} className={classes} />;
};

export default Inputbox;
