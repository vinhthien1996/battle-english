import React, { useState } from "react";

const InputArea = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default form submission
      if (inputValue.trim()) {
        onSendMessage(inputValue); // Call the function to send the message
        setInputValue(""); // Clear the input field after sending
      }
    }
  };

  return (
    <div className="mt-2 flex items-center">
      <input
        className="w-full input-hack border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your keyword..."
      />
    </div>
  );
};

export default InputArea;
