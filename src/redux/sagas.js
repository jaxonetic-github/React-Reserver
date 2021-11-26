import { call, put, takeEvery, takeLatest,select } from 'redux-saga/effects'
import * as Realm  from "realm-web";
import {logout, login, register,fetchSiteDataSuccess,
 refreshCustomData,fetchReservations,fetchReservationsError,fetchReservationsSuccess,loginError,fetchSiteData,
  loginSucceeded} from './reducers/appReducer';
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* registerSaga(action) {
   try {
    console.log(action);
    //  const user = yield call(Api.fetchUser, action.payload.userId);
      //yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* signInSaga(action) {
   try {
    console.log(action);
    //  const user = yield call(Api.fetchUser, action.payload.userId);
      //yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* signOutSaga(action) {
    const app = yield select(state=>state.app);
   //  console.log('log out called',app?.currentUser);
   // app?.currentUser?.logOut();
    //console.log('log out called');

    //  const user = yield call(Api.fetchUser, action.payload.userId);
      //yield put({type: "USER_FETCH_SUCCEEDED", user: user});
  
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getReservationsSaga(action) {
   try {
      const reservationsResult = yield call(action.payload.app.reservations );
    yield put(fetchReservationsSuccess(reservationsResult) );
    //  const user = yield call(Api.fetchUser, action.payload.userId);
      //yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put(fetchReservationsError( e.message));
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
  @param action.payload : {app:app, navigator:navigate,credentials:{email, password}}
*/


function* loginSaga(action,app) {
  // const app = yield select(state=>state.app);
 //console.log(app?.login,'loginSaga action:',action.payload.credentials);
//const loginFunction = yield app.logIn();
//console.log(loginFunction);
//{
// return  app.login(credentials)
//}
console.log(action);
const email = action.payload.credentials.email;
const password = action.payload.credentials.password;
const cred = Realm.Credentials.emailPassword(email, password) ;
const loginResult = yield app.logIn(cred );

 // const logOutResult = yield call( app.logout );
//  const loginResult = yield call( app.login, Credentials.emailPassword(action.payload.credentials.email, action.payload.credentials.password)  );//call(app.logIn,Credentials.emailPassword(action.payload.credentials.email, action.payload.credentials.password)); //app.login(Credentials.emailPassword(action.payload.email, action.payload.password)); //yield call(app.logIn,Credentials.emailPassword(action.payload.credentials.email, action.payload.credentials.password));
  console.log('loginResult', loginResult);
  if( loginResult)
  { 
    yield put(loginSucceeded,loginResult);
    const reservations = yield put(fetchReservations);
    //yield put(fetchReservationsSuccess(reservations));
   yield put(refreshCustomData);
  //  yield call(action.payload.app.currentUser.refreshCustomData)
  //  call(action.payload.navigator.navigate,'/');
  }
  else 
   put(loginError, loginResult.error);

}


/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* UnhandledSaga(action) {
  console.log('UnhandledSaga',action);
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* customDataRefreshSaga(action) {
  console.log('UnhandledSaga',action);
}


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchSiteDataSaga(action) {
     const app = yield select(state=>state.app);
console.log(app,"------------******-----------",app?.currentUser);
   if(!app?.currentUser)
   {//not logged In
    console.log('need to login anonymously',app);
      const loginResult = yield app.logIn(Realm.Credentials.anonymous()); //app.login(Credentials.emailPassword(action.payload.email, action.payload.password)); //yield call(app.logIn,Credentials.emailPassword(action.payload.credentials.email, action.payload.credentials.password));
  console.log('emergency loginresult');
 if( loginResult)
  { 
    yield put(loginSucceeded,loginResult);
   // const reservations = yi eld put(fetchReservations);
    //yield put(fetchReservationsSuccess(reservations));
   //yield put(refreshCustomData);
  //  yield call(action.payload.app.currentUser.refreshCustomData)
  //  call(action.payload.navigator.navigate,'/');
  }
//console.log('No site innfo, attempting to log in ß');
   // const user = await app.logIn(Realm.Credentials.anonymous());
 const site =   yield call(loginResult.functions.GetSiteData);
  //site = await loginResult?.functions?.GetSiteData();
 console.log('sitedata?',site);
   }
else{
   try {
       const siteData =   yield call(app?.currentUser?.functions?.GetSiteData);

      console.log(siteData);
    yield put( fetchSiteDataSuccess(siteData) );
    //  const user = yield call(Api.fetchUser, action.payload.userId);
      //yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
    console.log(e);
      yield put({type: "FETCH_RESERVATION_FAILED", payload: e.message});
   }
 }
}


/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga(app) {
 // yield takeEvery(login, loginSaga, app);
 // yield takeEvery(logout, signOutSaga);
 // yield takeEvery(refreshCustomData,customDataRefreshSaga);
//  yield takeLatest("LOGIN_FAILED",UnhandledSaga);
  //yield takeLatest(register);
  //yield takeLatest(fetchReservations);

}

export default mySaga;