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
      color={"text-white"}
      bg_color={"bg-green-400"}
      padding={"pt-2 pb-2"}
      width={"w-64"}
      rounded={"rounded-lg"}
      shadow={"shadow-2xl"}
      onClick={handleClick}
    />
  );
}
