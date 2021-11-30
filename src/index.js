import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './css/App.css';

import App from './App';
import { RealmDAO } from "./RealmDAO.js";
import reportWebVitals from './reportWebVitals';
//import RealmApolloProvider from "./graphql/RealmApolloProvider";

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'

import {appReducer,refreshCustomData,fetchReservations,loginAnonymously,loadBackEnd,fetchSiteData} from './redux/reducers/appReducer'
import mySaga from './redux/sagas';
import {logger} from 'redux-logger';
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const initialState={
  auth:{loginState :{isLoggedIn:false, isLoggingIn:false},
            backEnd:{}
       },
       app:{},
  reservations:[],
  profile:{},
  siteData:{},
  error:''
}

// mount it on the Store
   const store = createStore(appReducer, initialState,  applyMiddleware(sagaMiddleware, logger))
   sagaMiddleware.run(mySaga);

   const app = new RealmDAO(process.env.REACT_APP_MONGODB_REALM_APPID);
   store.dispatch(loadBackEnd(app));

   //const user = app.logIn(Realm.Credentials.anonymous());

    // then run the saga
   if(!app.app.currentUser){
    console.log('no currentUser');
      store.dispatch(loginAnonymously());
   
  }
   else{
    console.log('current user ound route');
    //app.app.currentUser.refreshCustomData();
    store.dispatch(refreshCustomData());
console.log('1');
    store.dispatch(fetchSiteData());
    console.log('2');

    store.dispatch(fetchReservations());
    console.log('3');

   }

  /*
          const credentials = {
          email: 'jaxonetic@gmail.com',
          password: '123456789',
        }
    app.logIn(Realm.Credentials.emailPassword(credentials.email, credentials.password));
  //  store.dispatch(refreshCustomData());
            
    sagaMiddleware.run(mySaga, app);
    console.log('placibo app::',app);

    if(!app.currentUser)
    {
console.log('no app cuser',app);

    }
    else{//there is aleadry a user 
        console.log(app);

        }*/
        /*
        try {
        store.dispatch(loadBackEnd(app));
        if(!app?.currentUser)
        {
          const user = app.login(Realm.Credentials.anonymous());
          store.dispatch()
        }
        store.dispatch(fetchSiteData());
       // console.log(store.getState());
    
   
// load our back end access
//console.log(app.login);


}catch(err){
  console.log('Unable to load Back End', err);
}
*/
  
console.log(store.getState());
// render the application

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>

        <App />

  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
