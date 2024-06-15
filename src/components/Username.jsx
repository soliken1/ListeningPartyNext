import React, { useEffect, useState } from "react";
import { auth } from "../configs/firebaseConfig";

const Username = () => {
  const [userName, setUsername] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsername(user?.displayName || null);
    });
    return () => unsubscribe();
  }, []);

  return <label className="text-white">{userName}</label>;
};

export default Username;
