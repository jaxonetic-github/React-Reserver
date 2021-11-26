import React from "react";
import RealmApolloProvider from "./graphql/RealmApolloProvider";
//import RealmAppProvider  from "./RealmAppProvider";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import envVars from './envVars.js';
//import { useIdleTimer } from 'react-idle-timer';
import { useRealmApp, RealmAppProvider } from "./RealmApp";


/*const loginAnonymous = async () => {
    const user = await app.logIn(Realm.Credentials.anonymous());
    console.log(user);
  };*/


/**
 * Route and DB Wrapper for the Main Component
 */
export default function AppWrapper({children,realmAppId}) {

  return (
    <RealmAppProvider appId={realmAppId}> 
    <RealmApolloProvider>
    
   {children}

    </RealmApolloProvider>  
    </RealmAppProvider>
  
  );
}