import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuth } from "react-firebaseui";
import AuthService from "./AuthService";
import UserContext from "./UserContext";
import { Redirect } from "react-router";

interface SignInDialogProps {
  authService: AuthService;
}

export default function SignInDialog({ authService }: SignInDialogProps) {
  const user = useContext(UserContext);
  if (user != null) {
    return <Redirect to={{ pathname: "/" }} />;
  }

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
