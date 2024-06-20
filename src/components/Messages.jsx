import React from "react";

const Messages = ({ session }) => {
  return (
    <div className="flex flex-col overflow-auto gap-5">
      {session
        .filter((session) => session.sender_created !== null)
        .sort((a, b) => a.sender_created.seconds - b.sender_created.seconds)
        .map((session) => (
          <div key={session.id} className="flex flex-row gap-2">
            <label className="text-zinc-500 text-xs">
              {session.sender_created
                ? new Date(
                    session.sender_created.seconds * 1000
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </label>
            <label className="text-indigo-400 text-xs">
              {session.sender_user + ": "}
            </label>
            <label className="text-white text-xs w-48 md:w-10/12">
              {session.sender_message}
            </label>
          </div>
        ))}
    </div>
  );
};

export default Messages;
