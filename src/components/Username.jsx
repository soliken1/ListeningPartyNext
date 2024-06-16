"use client";
import React, { useEffect, useState } from "react";
import { auth } from "../configs/firebaseConfig";

const Username = ({ fallbackLabel }) => {
  const [userName, setUsername] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsername(user?.displayName || null);
    });
    return () => unsubscribe();
  }, []);

  return <label className="text-white">{userName || fallbackLabel}</label>;
};

export default Username;
