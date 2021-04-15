import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from '../routes/Profile'
import Navigation from './Navigation'

const AppRouter =  ({refreshUser, isLoggedIn, userObject}) => {
  

  return (
    <Router>
      {isLoggedIn && <Navigation userObject={userObject}/>}
      <Switch>
        {isLoggedIn ?  (
           <div
           style={{
             maxWidth: 890,
             width: "100%",
             margin: "0 auto",
             marginTop: 80,
             display: "flex",
             justifyContent: "center",
           }}
         >
            <Route exact path="/" >
              <Home userObject={userObject} />
            </Route>
            <Route exact path="/profile" >
              <Profile refreshUser={refreshUser} userObject={userObject} />
            </Route>
            <Redirect from="*" to="/"/>
          </div>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/"/>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;