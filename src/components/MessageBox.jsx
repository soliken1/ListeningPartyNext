import React from "react";
import Inputbox from "./Inputbox";

const MessageBox = ({ onSubmitMessage, message, onChange }) => {
  return (
    <form onSubmit={onSubmitMessage}>
      <Inputbox
        type="text"
        classes="rounded-lg h-8 ps-3 text-xs w-10/12"
        value={message}
        pholder="Start Messaging Here..."
        onChange={onChange}
      />
    </form>
  );
};

export default MessageBox;
