import React from "react";
import MainComponent from "./home/MainComponent.js";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
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
console.log(process.env.REACT_APP_WEBPATH)
  return (<BrowserRouter  >
     <Routes basename={process.env.REACT_APP_WEBPATH}>
          <Route  path="/" element={<MainComponent />} >
             <Route index element={<GeneralInfo/>} /> 
             <Route path="/profile" element={<Profile/>} />
             <Route path="/signin" element={<SignIn />} />
             <Route path="/signup" element={<SignUp />} />
             <Route path="/checkout" element={<Checkout />} />
             <Route path="/reservations" element={<Reservations />} />
          </Route>      
      </Routes>
       </BrowserRouter>
  );

}



export default App;