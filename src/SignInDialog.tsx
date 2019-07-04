import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuth } from "react-firebaseui";
import AuthService from "./AuthService"

interface SignInDialogProps {
  authService: AuthService
}

export default function SignInDialog({ authService }: SignInDialogProps) {
  const firebaseUiConfig: firebaseui.auth.Config = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: (result: any) => {
        authService.signIn(result.user);
        return false;
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
