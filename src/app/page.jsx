"use client";
import Header from "../components/Header.jsx";
import ClientButton from "../components/ClientButton.jsx";
import Label from "../components/Label.jsx";
import Image from "../components/Image.jsx";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row h-screen justify-center items-center md:justify-start md:items-stretch">
      <div className="flex justify-center items-center w-full md:w-6/12 p-5 mt-12 -translate-y-20">
        <div className="flex flex-col items-center justify-center gap-5 flex-nowrap">
          <Header
            text={"Listening Party"}
            classes={"text-7xl text-white text-center"}
          />
          <Label
            text={"Listen in to users what they are Listening in a Room!"}
            classes={"text-white text-xl text-center"}
          />
          <div className="flex justify-center items-center mt-4">
            <ClientButton />
          </div>
        </div>
      </div>
      <Image
        classes={
          "absolute bottom-0 right-0 md:w-4/12 md:h-4/6 -z-10 opacity-25 object-scale-down text-white"
        }
        image={"/Listening.png"}
        alt_text={"Listening"}
      />
    </main>
  );
}
