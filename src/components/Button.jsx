function Button({ classes, onClick, text, image, imgclass }) {
  return (
    <button className={classes} onClick={onClick}>
      {image && <img src={image} className={imgclass} alt={text} />}
      {text}
    </button>
  );
}

export default Button;
