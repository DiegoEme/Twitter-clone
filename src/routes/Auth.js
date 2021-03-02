import authService from 'myBase';
import {useState} from 'react';
import firebaseInstance from 'myBase';
import firebase from 'firebase/app'



const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if(name === 'email'){
        setEmail(value)
    } else if (name === 'password'){
        setPassword(value)
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
        let data;
        if(newAccount){
            data = await authService.createUserWithEmailAndPassword(email, password)
        } else {
            data = await authService.signInWithEmailAndPassword(email, password)
        }
        console.log(data);
    } catch (error) {
        setError(error.message);
    }    

  }

  const toggleAccount = () => {
      setNewAccount((prev) => !prev)
  }

  const onSocialClick = async (event) => {
    const name = event.target.name;
    //let provider;

    if(name==="google"){
      await authService.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    if(name==="github"){
      await authService.signInWithPopup(new firebase.auth.GithubAuthProvider());
    }

    
    //console.log(data)


  }

  return (
    <div>
      <form onSubmit = {onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange = {onChange}
          value={email}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange = {onChange}
          value={password}
          required
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
      <div>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with GitHub</button>
      </div>
    </div>
  );
};

export default Auth;
