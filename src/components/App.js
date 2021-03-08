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
       setUserObject(user);
     } else {
       setIsLoggedIn(false);
     }
     setInit(true)
   })
  }, [])
  
  return (
    <div className="App">
     { init ? <AppRouter userObject={userObject} isLoggedIn = {isLoggedIn}/> : "Initializing..."}
    </div>
  );
}

export default App;
