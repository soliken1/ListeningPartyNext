import React from "react";

const Label = ({ text, color, size }) => {
  const concatClasses = `${size} ${color}`;
  return <label className={concatClasses}>{text}</label>;
};

export default Label;
