import React from "react";

const Question = ({ question }) => {

  return (
    <div className="uppercase flex text-hacker text-2xl justify-center border border-hacker p-6 mb-2">{ question?.vi }</div>
  );
};

export default Question;
