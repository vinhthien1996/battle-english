import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

const SignIn = () => {

  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code !== "auth/cancelled-popup-request") {
        console.error("Error during sign-in:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <button
        className="signInBtn"
        onClick={signInWithGoogle}
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>
    </div>
  );
};

export default SignIn;
