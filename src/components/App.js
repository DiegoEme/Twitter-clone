import {useState} from 'react'; 
import AppRouter from "components/Router";
import { authService } from "myBase";

function App() {
  console.log('auth',authService.currentUser)

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  
  return (
    <div className="App">
      <AppRouter  isLoggedIn = {isLoggedIn}/>
    </div>
  );
}

export default App;
