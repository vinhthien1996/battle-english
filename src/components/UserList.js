// UserList.js
import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { ServerIcon } from "@heroicons/react/24/outline";
import { getAuth } from "firebase/auth"; // Import getAuth to access current user

const UserList = ({ users, messages, onWarning }) => {
  const [attack, setAttack] = useState(null);
  const auth = getAuth(); // Get the current authentication state

  useEffect(() => {
    if (messages && messages.length > 0 && messages[0].message.success) {
      setAttack(messages[0].uid);
      setTimeout(() => setAttack(null), 1000);
    }
  }, [messages]);

  // Sort users to always put the current user at the top
  const sortedUsers = [...users].sort((a, b) => {
    if (a.uid === auth.currentUser?.uid) return -1; // Move current user to the top
    if (b.uid === auth.currentUser?.uid) return 1;  // Move current user to the top
    return 0; // Leave other users in their original order
  });

  useEffect(() => { 
    if(sortedUsers[0]?.cpu >= 80) {
      onWarning(true);
    }
  }, [sortedUsers]);

  return (
    <div className="flex gap-2">
      {sortedUsers.map((user, index) => (
        <div
          className={`${user.cpu > 70 ? 'text-hred blur-red border-hred blur-hacker' : 'border-hacker'} text-sm w-full border rounded ${attack && attack !== user.uid ? 'attack' : ''}`}
          key={user.uid} // Use uid as key for better performance and uniqueness
        >
          <div className="flex items-center">
            <ServerIcon className="size-16 mr-2" />
            <div>
              <div className="pr-2">{user.name}</div>
              <div>CPU: {user.cpu}%</div>
            </div>
          </div>
          <ProgressBar progress={user.cpu} />
        </div>
      ))}
    </div>
  );
};

export default UserList;
