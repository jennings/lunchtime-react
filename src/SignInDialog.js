import React, {Component} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {FirebaseAuth} from 'react-firebaseui';

class SignInDialog extends Component {
  constructor(props) {
    super(props);
    this.firebaseUiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: result => {
          this.props.onSignIn({user: result.user});
        },
      },
    };
  }

  render() {
    return (
      <FirebaseAuth
        uiConfig={this.firebaseUiConfig}
        firebaseAuth={firebase.auth()}
      />
    );
  }
}

export default SignInDialog;