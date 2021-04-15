import authService from 'myBase';
import firebase from 'firebase/app'
import AuthForm from 'components/AuthForm';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";


const Auth = () => {
  
  const onSocialClick = async (event) => {
    const name = event.target.name;
    //let provider;

    if(name==="google"){
      await authService.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    if(name==="github"){
      await authService.signInWithPopup(new firebase.auth.GithubAuthProvider());
    }

  }

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
