"use client";
import React, { useEffect, useState } from "react";
import { auth } from "../configs/firebaseConfig";

const Pfp = () => {
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
      src={ProfPic ? ProfPic : "/1.jpg"}
      className="w-10 h-10 rounded-full"
    />
  );
};

export default Pfp;
