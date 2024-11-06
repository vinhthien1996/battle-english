import { getAuth } from "firebase/auth";
import React from "react";
import { app } from "../firebase";

const MessageLog = ({ messages, isWarning }) => {
  const auth = getAuth(app);
  const sortedMessages = messages ? [...messages].reverse() : []; 

  const generateMessage = (text, success, name) => {
    let firstUser = null;
    let secondUser = null;

    if (auth.currentUser.displayName === name) {
      firstUser = "You";
      secondUser = "your opponent's server";
    } else {
      firstUser = name;
      secondUser = "your server";
    }

    if (success) {
      return (
        <span className="blur-message">
          {firstUser} has attacked {secondUser} with the keyword{" "}
          <span className="text-hred blur-red uppercase">{text}</span>
        </span>
      );
    } else {
      return (
        <span className="blur-message">
          {firstUser} tried to attack {secondUser} with the keyword{" "}
          <span className="text-hred blur-red uppercase">{text}</span> but
          failed
        </span>
      );
    }
  };

  return (
    <div className="container-message">
      <div
        className="text-sm border border-hacker mt-2"
        style={{
          height: "310px",
          textAlign: "left",
          padding: "5px",
          display: "flex",
          flexDirection: "column",
          overflow: 'hidden'
        }}
      >
        {sortedMessages.map((item, index) => (
          <div key={index}>
            {generateMessage(
              item.message.text,
              item.message.success,
              item.name
            )}
          </div>
        ))}
      </div>
      { isWarning && <div className="warning-hacker">Warning</div> }
    </div>
  );
};

export default MessageLog;
