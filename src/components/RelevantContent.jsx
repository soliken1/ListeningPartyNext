const RelevantContent = () => {
  return (
    <div className="max-w-md mx-auto bg-gray-950 rounded-xl shadow-md shadow-gray-900 overflow-hidden md:max-w-3xl md:h-72">
      <div className="md:flex h-full">
        <div className="md:shrink-0 md:w-72 w-full h-52 md:h-auto">
          <img className="w-full h-full object-cover" src="/1.jpg" />
        </div>
        <div className="p-8 flex flex-col justify-center gap-2">
          <label className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            RELEVANT! DRAMA! NO WAYING!!! GAMES AND MORE!! LOCKING IN FRFR
          </label>
          <label className="block mt-1 text-lg leading-tight font-medium text-white">
            Now Playing: The Big Whale On The Back - xQcoW
          </label>
          <p className="mt-2 text-slate-500">
            A Description of The Playing Current Music Here
          </p>
        </div>
      </div>
    </div>
  );
};

export default RelevantContent;
