import React from "react";
import MainComponent from "./MainComponent.js";
import RealmApolloProvider from "./graphql/RealmApolloProvider";
import { RealmAppProvider } from "./RealmApp";
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GeneralInfo from './GeneralInfo';
import Reservations from './checkout/Reservations';
import Checkout from './checkout/Checkout';
import Profile from './Profile';
import SignIn from './Signin';
import SignUp from './Signup';

// or for Moment.js
//import DateAdapter from '@mui/lab/AdapterMoment';

/**
 *  wrapping all children in a Provideer for MUI DateTimePickre Use 

function DateTimeLocalizationProvider({ children }) {
  return (
    <LocalizationProvider dateAdapter={null}>{children}</LocalizationProvider>
  );
} 
/*const loginAnonymous = async () => {
    const user = await app.logIn(Realm.Credentials.anonymous());
    console.log(user);
  };*/



export const APP_ID = "application-0-iyetn";

/**
 * Route and DB Wrapper for the Main Component
 */
export default function App() {
  return (

    <RealmAppProvider appId={APP_ID}>
    <RealmApolloProvider>
    <BrowserRouter>
    <Routes>
          <Route exact path="/" element={<MainComponent />} >
             <Route index element={<GeneralInfo/>} />
             <Route path="/reservations" element={<Reservations/>} />
             <Route path="/checkout" element={<Checkout/>} />
             <Route path="/profile" element={<Profile/>} />
             <Route path="/signin" element={<SignIn/>} />
             <Route path="/signup" element={<SignUp/>} />
          </Route>
          
          </Routes></BrowserRouter>
        </RealmApolloProvider>
    </RealmAppProvider>
  );
}