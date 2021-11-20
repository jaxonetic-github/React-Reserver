import React from "react";
import MainComponent from "./home/MainComponent.js";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GeneralInfo from './home/GeneralInfo';
import Reservations from './checkout/Reservations';
import Checkout from './checkout/Checkout';
import Profile from './Profile';
import SignIn from './signinup/Signin';
import SignUp from './signinup/Signup';
import RealmApolloProvider from "./graphql/RealmApolloProvider";
import {RealmAppProvider}  from "./RealmApp";
import envVars from './envVars.js';

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
    <RealmAppProvider appId={envVars.MONGODB_REALM_APPID}> 
     <Routes>
          <Route exact path="/" element={<MainComponent />} >
             <Route index element={<GeneralInfo/>} /> 
             <Route path="/checkout" element={<Checkout/>} />
             <Route path="/profile" element={<Profile/>} />
             <Route path="/reservations" element={<Reservations/>} />
             <Route path="/signin" element={<SignIn />} />
             <Route path="/signup" element={<SignUp/>} />
             <Route path="*" element={<GeneralInfo />} />
          </Route>      
      </Routes>
    </RealmAppProvider>
       </BrowserRouter>

  );

}



export default App;