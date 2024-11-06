import React from "react";

const WaitingRoom = ({ winner }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="uppercase">The attack has ended</div>
        <div className="uppercase">{winner.name} lost</div>
      </div>
    </div>
  );
};

export default WaitingRoom;
