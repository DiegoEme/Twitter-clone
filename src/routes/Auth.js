import authService from 'myBase';
import firebase from 'firebase/app'
import AuthForm from 'components/AuthForm';



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
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with GitHub</button>
      </div>
    </div>
  );
};

export default Auth;
