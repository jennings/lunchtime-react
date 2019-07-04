import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuth } from "react-firebaseui";

export default function SignInDialog({ authService }) {
  const firebaseUiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: result => {
        authService.signIn(result.user);
      }
    }
  };

  return (
    <FirebaseAuth
      uiConfig={firebaseUiConfig}
      firebaseAuth={authService.firebaseAuth}
    />
  );
}
