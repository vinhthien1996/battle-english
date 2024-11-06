import React from "react";

const ProgressBar = ({ progress }) => (
  <div className={`${progress > 70 ? 'text-hred blur-red border-hred' : 'border-hacker'} w-full bg-dark border`}>
    <div
      className={`${progress > 70 ? 'bg-hred' : 'bg-hacker'} text-xs text-center leading-none p-0.5`}
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

export default ProgressBar;
