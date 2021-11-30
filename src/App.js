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
 */
function App() {

  return (<BrowserRouter>
     <Routes>
          <Route exact path="/" element={<MainComponent />} >
             <Route index element={<GeneralInfo/>} /> 
             <Route path="/profile" element={<Profile/>} />
             <Route path="/signin" element={<SignIn />} />
             <Route path="/signup" element={<SignUp />} />
             <Route path="/checkout" element={<Checkout />} />
             <Route path="/reservations" element={<Reservations />} />
             <Route path="*" element={<GeneralInfo />} />
          </Route>      
      </Routes>
       </BrowserRouter>
  );

}



export default App;