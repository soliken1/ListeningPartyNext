const Image = ({ classes, alt_text, image }) => {
  return <img className={classes} src={image} alt={alt_text} />;
};

export default Image;
