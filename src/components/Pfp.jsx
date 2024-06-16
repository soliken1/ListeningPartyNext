"use client";
import React, { useEffect, useState } from "react";
import { auth } from "../configs/firebaseConfig";

const Pfp = ({ fallbackPic }) => {
  const [ProfPic, setProfPic] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setProfPic(user.photoURL);
      } else {
        setProfPic(null);
      }
    });
  });
  return (
    <img
      src={ProfPic || fallbackPic}
      className="w-10 h-10 object-cover rounded-full"
    />
  );
};

export default Pfp;
