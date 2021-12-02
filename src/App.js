import React from "react";
import MainComponent from "./home/MainComponent.js";
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import GeneralInfo from './home/GeneralInfo';
import Reservations from './checkout/Reservations';
import Checkout from './checkout/Checkout';
import Profile from './Profile';
import SignIn from './signinup/Signin';
import SignUp from './signinup/Signup';

//import { useIdleTimer } from 'react-idle-timer';


/*const loginAnonymous = async () => {
    const user = await app.logIn(Realm.Credentials.anonymous());
    console.log(user);
  };*/


/**
 *  the Main Component containing the app routes          
 *      <Route path="*" element={<GeneralInfo />} />
 */
function App() {
console.log(process.env.REACT_APP_WEBPATH,',',process.env.PUBLIC_URL)
  return (<Router >
     <Routes >
          <Route exact path={`/${process.env.PUBLIC_URL}`} element={<MainComponent />} >
    <Route path={`/${process.env.PUBLIC_URL}`}  element={<GeneralInfo />} />
             <Route path="/profile" element={<Profile/>} />
             <Route path={`/${process.env.PUBLIC_URL}`} element={<SignIn />} />
             <Route path="/signup" element={<SignUp />} />
             <Route path="/React-Reserver/checkout" element={<Checkout />} />
             <Route path="reservations" element={<Reservations />} />
          </Route>      
      </Routes>
       </Router>
  );

}



export default App;