import React from "react";

const Label = ({ text, classes, forTag }) => {
  return (
    <label htmlFor={forTag} className={classes}>
      {text}
    </label>
  );
};

export default Label;
