function Button({
  text,
  width,
  color,
  bg_color,
  padding,
  rounded,
  shadow,
  onClick,
}) {
  const concatClasses = `${width} ${color} ${bg_color} ${padding} ${rounded} ${shadow}`;
  return (
    <button className={concatClasses} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
