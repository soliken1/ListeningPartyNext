function Header({ text, color, size }) {
  const concatClasses = `${color} ${size}`;

  return <h1 className={concatClasses}>{text}</h1>;
}

export default Header;
