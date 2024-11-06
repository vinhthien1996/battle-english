import React, { useState, useEffect } from "react";
import { database } from "./firebase";
import { ref, onValue, update } from "firebase/database";

function ChatRoom({ user }) {
  const [users, setUsers] = useState([]);
  const [question, setQuestion] = useState("What is 2 + 2?");
  const [answer, setAnswer] = useState("");
  const correctAnswer = "4";

  useEffect(() => {
    const usersRef = ref(database, "users");
    onValue(usersRef, (snapshot) => {
      const usersList = [];
      snapshot.forEach((childSnapshot) => {
        usersList.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setUsers(usersList);
    });
  }, []);

  const submitAnswer = () => {
    if (answer === correctAnswer) {
      const userRef = ref(database, `users/${user.uid}`);
      update(userRef, { score: user.score + 1 });
      setAnswer("");
      alert("Correct answer! +1 point");
    } else {
      alert("Incorrect answer. Try again!");
    }
  };

  return (
    <div>
      <h4>Active Users:</h4>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - Score: {u.score || 0}
          </li>
        ))}
      </ul>

      <h4>{question}</h4>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={submitAnswer}>Submit Answer</button>
    </div>
  );
}

export default ChatRoom; // Ensure ChatRoom is exported
