import React from 'react';
import authService from 'myBase';
import {useState} from 'react';

const AuthForm = () => {
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
        //let data;
        if(newAccount){
            //data = 
            await authService.createUserWithEmailAndPassword(email, password)
        } else {
            //data = 
            await authService.signInWithEmailAndPassword(email, password)
        }
        
    } catch (error) {
        setError(error.message);
    }    

  }

  const toggleAccount = () => {
      setNewAccount((prev) => !prev)
  }
    return (
        <>
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
        </>
    )
}

export default AuthForm;