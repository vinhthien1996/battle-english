import React, { useEffect, useState } from 'react';
import './App.css';

import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignIn from './components/SignIn';
import Battle from './components/Battle';
import WaitingRoom from './components/WaitingRoom';
import { app } from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database';

function App() {
  const auth = getAuth(app);
  const [user] = useAuthState(auth);
  const [winner, setWinner] = useState();

  useEffect(() => {
    const db = getDatabase(app);
    const quizRef = ref(db, "quiz");

    const unsubscribe = onValue(quizRef, (snapshot) => {
      const quiz = snapshot.val();
      setWinner(quiz.winner);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl p-2">
      <section>
        {winner ? <WaitingRoom winner={winner} /> : user ? <Battle /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
