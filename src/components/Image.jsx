const Image = ({ position, image, alt_text, color }) => {
  const concatClasses = `${position} ${color}`;
  return <img className={concatClasses} src={image} alt={alt_text} />;
};

export default Image;
