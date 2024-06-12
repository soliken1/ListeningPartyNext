import Header from "../components/Header.jsx";
import ClientButton from "../components/ClientButton.jsx";
import Label from "../components/Label.jsx";
import Image from "../components/Image.jsx";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row h-screen">
      <div className="flex justify-center items-center w-full md:w-6/12 p-5 mt-12">
        <div className="flex flex-col justify-center gap-5 flex-nowrap -translate-y-12">
          <Header text={"Listening Party"} classes={"text-7xl text-white"} />
          <Label
            text={"Listen in to users what they are Listening in a Room!"}
            classes={"text-white text-xl"}
          />
          <div className="flex justify-center items-center mt-4">
            <ClientButton />
          </div>
        </div>
      </div>
      <Image
        classes={
          "absolute bottom-0 right-0 w-4/12 h-4/6 -z-10 opacity-25 object-scale-down text-white"
        }
        image={"/Listening.png"}
        alt_text={"Listening"}
      />
    </main>
  );
}
