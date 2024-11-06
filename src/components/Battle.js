import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  getFirestore,
  orderBy,
  query,
  addDoc,
  limit,
} from "firebase/firestore";
import {
  getDatabase,
  onValue,
  ref,
  set,
  remove,
  serverTimestamp,
  onDisconnect,
  get,
} from "firebase/database";
import { app } from "../firebase";
import Header from "./Header";
import UserList from "./UserList";
import MessageLog from "./MessageLog";
import InputArea from "./InputArea";
import Question from "./Question";
import { getAuth } from "firebase/auth";

const Battle = () => {
  const firestore = getFirestore(app);
  const auth = getAuth(app);
  const [users, setUsers] = useState([]);
  const [isWarning, setIsWarning] = useState(false);
  const [question, setQuestion] = useState();
  const [listQuestion, setListQuestion] = useState([]);
  const messagesRef = collection(firestore, "messages");
  const messagesQuery = query(
    messagesRef,
    orderBy("createdAt", "desc"),
    limit(15)
  );
  const [messages] = useCollectionData(messagesQuery, { idField: "id" });

  // Handle user status updates
  useEffect(() => {
    const db = getDatabase(app);
    const userStatusRef = ref(db, `users/${auth.currentUser?.uid}`);
    const userOnlineRef = ref(db, ".info/connected");

    if (auth.currentUser) {
      onValue(userOnlineRef, (snapshot) => {
        if (snapshot.val() === true) {
          set(userStatusRef, {
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            avatar: auth.currentUser.photoURL,
            online: true,
            lastSeen: serverTimestamp(),
            cpu: 0,
          });
          onDisconnect(userStatusRef).set({
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            avatar: auth.currentUser.photoURL,
            online: false,
            lastSeen: serverTimestamp(),
            cpu: 0,
          });
        }
      });
    }

    return () => {
      remove(userStatusRef);
    };
  }, [auth]);

  // Listen for online users and quiz data
  useEffect(() => {
    const db = getDatabase(app);
    const usersRef = ref(db, "users");
    const quizRef = ref(db, "quiz");

    onValue(quizRef, (snapshot) => {
      const quizData = snapshot.val();
      if (quizData) {
        setQuestion(JSON.parse(quizData.question));
        setListQuestion(JSON.parse(quizData.list));
      }
    });

    onValue(usersRef, (snapshot) => {
      const onlineUsers = [];
      snapshot.forEach((childSnapshot) => {
        const user = childSnapshot.val();
        
        if (user.online) {
          onlineUsers.push({
            uid: user.uid,
            name: user.displayName,
            avatar: user.avatar,
            cpu: user.cpu || 0,
          });
        }
      });
      setUsers(onlineUsers);
    });
  }, []);

  // Function to send a message and handle question answering
  const handleSendMessage = async (text) => {
    try {
      const userId = auth.currentUser.uid;
      let textMessage = null;
  
      // Check if the answer is correct
      if (text === question.en) {

        textMessage = {
          text,
          success: true,
        };
  
        // Find an opponent to update their cpu count
        const usersRef = ref(getDatabase(app), "users");
        const usersSnapshot = await get(usersRef);
  
        usersSnapshot.forEach((childSnapshot) => {
          const user = childSnapshot.val();
          if((user.cpu + 1) >= 100) {
            const winnerRef = ref(getDatabase(app), `quiz/winner`);
            set(winnerRef, {
              name: user.displayName,
              uid: user.uid
            });
          }
          // Find an opponent: any online user that is not the current user
          if (user.uid !== userId && user.online) {
            const opponentRef = ref(getDatabase(app), `users/${user.uid}`);
            const opponentCpuCount = user.cpu || 0;
  
            // Update the opponent's cpu count
            set(opponentRef, {
              ...user,
              cpu: opponentCpuCount + 1,
            });
          }
        });

        // Select a random new question
        if (listQuestion && listQuestion.length > 0) {
          const randomIndex = Math.floor(Math.random() * listQuestion.length);
          const newQuestion = listQuestion[randomIndex];
          // Update the question in the database
          await set(
            ref(getDatabase(app), "quiz/question"),
            JSON.stringify(newQuestion)
          );
          // setListQuestion((prevList) =>
          //   prevList.filter((_, index) => index !== randomIndex)
          // ); // Remove the used question
          setQuestion(newQuestion); // Update the state with the new question
        }
      } else {
        textMessage = {
          text,
          success: false,
        };
      }
  
      const messageData = {
        message: textMessage,
        createdAt: Date.now(),
        uid: userId,
        email: auth.currentUser.email,
        name: auth.currentUser.displayName,
      };
  
      // Send the message to Firestore
      await addDoc(messagesRef, messageData);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <Header />
      <Question question={question} />
      <UserList onWarning={setIsWarning} messages={messages} users={users} />
      <MessageLog isWarning={isWarning} messages={messages} />
      <InputArea onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Battle;
