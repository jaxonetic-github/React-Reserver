import React from "react";
import MainComponent from "./home/MainComponent.js";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
  return (<Router basename='/React-Reserver'>
     <Routes  >
          <Route  path={'/React-Reserver/'} element={<MainComponent />} >
    <Route exact path={'/React-Reserver/'} element={<GeneralInfo />} />
             <Route path="/profile" element={<Profile/>} />
             <Route exact path={`/React-Reserver/signin`} element={<SignIn />} />
             <Route exact path="/signup" element={<SignUp />} />
             <Route exact path="/React-Reserver/checkout" element={<Checkout />} />
             <Route path="reservations" element={<Reservations />} />
             <Route path="*" element={<GeneralInfo />} />
          </Route>      
      </Routes>
       </Router>
  );

}



export default App;