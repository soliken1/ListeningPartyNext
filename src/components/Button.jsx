const Button = ({ text, classes, image, imgclass, onClick, type }) => {
  return (
    <button type={type} className={classes} onClick={onClick}>
      {image && <img src={image} className={imgclass} alt={`${text} icon`} />}
      {text}
    </button>
  );
};

export default Button;
