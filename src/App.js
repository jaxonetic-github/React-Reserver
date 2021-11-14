import React from "react";
import MainComponent from "./home/MainComponent.js";
import RealmApolloProvider from "./graphql/RealmApolloProvider";
import { RealmAppProvider } from "./RealmApp";
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GeneralInfo from './home/GeneralInfo';
import Reservations from './checkout/Reservations';
import Checkout from './checkout/Checkout';
import Profile from './Profile';
import SignIn from './signinup/Signin';
import SignUp from './signinup/Signup';
import envVars from './envVars.js';
import { useIdleTimer } from 'react-idle-timer';
import { useRealmApp } from "./RealmApp";

//import { Provider as ReduxProvider } from 'react-redux';
//import { createStore, applyMiddleware } from 'redux'
//import createSagaMiddleware from 'redux-saga'

//import reducer from './reducers'
//import mySaga from './sagas'


// render the application
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


/*
<ReduxProvider store={store}>

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)*/

// then run the saga
//sagaMiddleware.run(mySaga)


 function IdleTimerVerifier({children}) {
  const app = useRealmApp();
  const handleOnIdle = event => {
    console.log('user is idle', event)
    console.log('last active', getLastActiveTime())
    // app?.logOut();
    console.log('user is being automatically logged out after 1 minute of inactivity');
  }

  const handleOnActive = event => {
    const remainingTime = getRemainingTime()
    console.log('user is active', event)
    console.log(`time remaining ${getRemainingTime()}`);
    if(remainingTime<=0){
      console.log('logging user out?');
     // app?.logOut();
    }
  }

  const handleOnAction = event => {
    //console.log('user did something', event)
  }

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 *5,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500
  })

  return (
    <div>
      {children}
    </div>
  )
}

/**
 * Route and DB Wrapper for the Main Component
 */
export default function App() {

  return (
 
    <RealmAppProvider appId={envVars.MONGODB_REALM_APPID}> 
    <RealmApolloProvider>
    <IdleTimerVerifier>
    <BrowserRouter>
    <Routes>
          <Route exact path="/" element={<MainComponent />} >
             <Route index element={<GeneralInfo/>} /> 
             <Route path="/checkout" element={<Checkout/>} />
             <Route path="/profile" element={<Profile/>} />
             <Route path="/reservations" element={<Reservations/>} />
             <Route path="/signin" element={<SignIn/>} />
             <Route path="/signup" element={<SignUp/>} />
             <Route path="*" element={<GeneralInfo />} />
          </Route>
          
          </Routes></BrowserRouter>
        </IdleTimerVerifier>
        </RealmApolloProvider>  
    </RealmAppProvider>
  
  );
}