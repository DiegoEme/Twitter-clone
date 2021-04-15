import {useState, useEffect} from 'react'; 
import AppRouter from "components/Router";
import { authService } from "myBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
   authService.onAuthStateChanged((user) => {
     if(user) {
       setIsLoggedIn(true);
       setUserObject({
         displayName: user.displayName,
         uid: user.uid,
         updateProfile: (args) => user.updateProfile(args)
       });
     } else {
       setIsLoggedIn(false);
     }
     setInit(true)
   })
  }, [])
  
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObject({
         displayName: user.displayName,
         uid: user.uid,
         updateProfile: (args) => user.updateProfile(args)
    });
  }

  return (
    <div className="App">
     { init ? 
     <AppRouter 
      refreshUser={refreshUser}
      userObject={userObject} 
      isLoggedIn = {isLoggedIn}
      /> : "Initializing..."}
    </div>
  );
}

export default App;
