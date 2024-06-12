"use client";

import { useRouter } from "next/navigation";
import Button from "./Button.jsx";

export default function ClientButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <Button
      text={"Listen Now!"}
      classes="text-white bg-green-400 pt-2 pb-2 w-64 rounded-lg shadow-2xl"
      onClick={handleClick}
    />
  );
}
