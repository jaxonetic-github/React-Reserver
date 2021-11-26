import React from "react";
import * as Realm from "realm-web";
//import {useNavigate} from "react-router-dom";
import {  useDispatch } from 'react-redux'
import {loadUser, loadProfile,loadBackEnd,login,loginSucceeded,loginError,logout,
   fetchSiteData,fetchSiteDataError,fetchSiteDataSuccess,
   fetchReservations ,fetchReservationsSuccess, register,registerSuccess, bubbleError} from './redux/reducers/appReducer';
import { createAction } from '@reduxjs/toolkit'

import { handleAuthenticationError, parseAuthenticationError} from './constants';
    import emailjs, { init } from 'emailjs-com';


//const stub = {stubbed:true, logIn:(credentials)=>{console.log(credentials); return {demo:true}}, registerWithEmail:(credentials)=>{console.log(credentials); return (new Promise()).resolve('resolved registration') }, logOut:()=>{console.log('logout')}};

const RealmAppContext = React.createContext();

/**
 * Using the React Context to have one source of truth for the
 * backend reference, like a Singleton.
 */
 
export const useRealmApp = () => {
  const app = React.useContext(RealmAppContext);

  if (!app) { throw new Error(`You must call useRealmApp() inside of a <RealmAppProvider />`);}
  
  return app;
};


export  const RealmAppProvider = ({ demoAppId, children }) => {
   const dispatch = useDispatch();

   //app.allUsers
  const [app] = React.useState(new Realm.App(demoAppId||process.env.REACT_APP_MONGODB_REALM_APPID));
 
  React.useEffect(() => {
   // const newApp = new Realm.App(demoAppId||process.env.REACT_APP_MONGODB_REALM_APPID);
   // setApp(newApp);

    console.log('Realm App',app)
    try{
      if(app?.currentUser?.accessToken ){
        dispatch(loadUser(app?.currentUser));
        dispatch(loadProfile(app?.currentUser?.customData));
        getSiteData();
        getReservations();
      }else
      {
      getSiteDataAnonymously();
      }
    }catch(error)
    {
      dispatch(bubbleError('no access token for current user: Navigate to Ho,e or SignIn'));
    }
  }, [app]);


// Wrap the Realm.App object's user state with React state
  const [currentUser, setCurrentUser] = React.useState(app?.currentUser);
 
async function reloadCustomData(){
 await app?.currentUser?.refreshCustomData();  
 //currentUser?.refreshCustomData();
}
   

  /**
   *  login with the provided Login Credentials.  After loggin in , set Profile and Reservations
   */
  async function getSiteDataAnonymously() {
      await app.logIn(Realm.Credentials.anonymous());
      await getSiteData();

      logOut();
}

  /**
   *  login with the provided Login Credentials.  After loggin in , set Profile and Reservations
   */
  async function logIn(credentials) {

    try
    {
    //tell store that a login is being attempted
   dispatch(login('Attempting to login'));
   const loginResult =  await app?.logIn(Realm.Credentials.emailPassword(credentials.email, credentials.password));

   //It's nice to keep an internal store of the currentUser
    setCurrentUser(loginResult)
     //  const prof = await loginResult.functions.GetUserData(loginResult.id);
    setProfile(app?.currentUser?.customData)

   const reservations = getReservations();
   reloadCustomData();

   //dispatch results or succes or error
    dispatch(loginSucceeded({user:loginResult, reservations:reservations, profile:app?.currentUser?.customData}));

    } catch(err)
    {
      const msg = handleAuthenticationError(err);
      console.log(msg);
       dispatch(loginError(msg));
    }
  }
 

/**
 *  Logout current user, by clearing the CurrentUSer, Profile, and Reservations
 */
  async function logOut() {

    // Log out the currently active user
    app?.currentUser?.logOut();
    setCurrentUser(null);
    setProfile(null);
    setReservations(null);
    dispatch(logout('User Logged Out'));


  }


/**
 * Register user by autoconfirmaed email, 
 * @params email, password needed for registration
 * @params firstName, lastName : needed for profile
 * @params phone: optional
 * 
 */
  async function registerWithEmail(email, password, firstName, lastName, phone) {
    try{
      const args = {email,password,firstName, lastName, phone};
       dispatch(register(args));


     await app.emailPasswordAuth.registerUser(email, password);
     const newUser =  await app?.logIn(Realm.Credentials.emailPassword(email, password));
    setCurrentUser(newUser);
    reloadCustomData();
    //      dispatch(refreshCustomDataSuccess());
    try {
         //add CustomData
         await app?.currentUser?.functions?.AddUserData({firstname:firstName, lastname:lastName,email:email,phone, userid:app?.currentUser?.id});
    }catch(err1){console.log("errer adding userdata",err1)}
       // const prof = await newUser.functions.GetUserData(newUser.id);
    setProfile(app?.currentUser?.customData)

    dispatch(registerSuccess({user:newUser, profile:app?.currentUser?.customData, reservations:reservations}))
/*
try {
      await getReservations();
}catch(err2){console.log('error gettinng reservation',err2)}
*/
     return {success:true};
}catch(error){
  console.log(error);
      dispatch({type: 'REGISTER_FAILED', payload:{error:handleAuthenticationError(error)} });

  return {error:handleAuthenticationError(error)};
}

  }

const [profile, setProfile] = React.useState();

/**
 * Return Profile of registered user.
 * 
 */
 async function getProfile() {
    
     let prof = null;
     try{
     prof = await app?.currentUser?.functions?.GetUserData(app?.currentUser?.id);
    }catch(error){
       const { status, message } = parseAuthenticationError(error);
       console.log(status,'<---status message--->',message);
       return {error:message};
    }
return prof;
}


const [siteData, setSiteData] = React.useState( /*{pageData, cardData:tiers}*/);


/**
 * Read Site Data: If user object has the *?.functions* variable available
 *   then retrieve the Site Data, otherwise anonymously login first for access 
 *   to backend functions.
 *
 */
 async function getSiteData(logoutAnonUser) {
     dispatch(fetchSiteData());

   //  let site =  {pageData:HOME_PAGE_DEFAULT, cardData:TIERS};
    try{
       const site =   await app?.currentUser?.functions?.GetSiteData();

      if(site){
      setSiteData(site.screen);
      dispatch(fetchSiteDataSuccess(site));
      }
      return site;
    }catch(error){
     const { status, message } = parseAuthenticationError(error);
          // console.log(message);
            dispatch(fetchSiteDataError(message));

           return {error:message};
    }
}


/**
 * Edits data  for the Home Page by a registered Admin user.  
 * @param newPageData takes a HOME_PAGE_DEFAULT type object
 */
 async function editHomeData(newPageData) {
  
try{
if (newPageData){
const obj ={screen:'home_general',pageData:newPageData.pageData, cardData:newPageData.cardData}
console.log(newPageData,'passing to edithomefuncion',obj);

     const editResults = await app?.currentUser?.functions.EditHomeData(newPageData);
console.log('editResults from realm', editResults);
setSiteData({screen:'home_general',pageData:newPageData.pageData, contactData:newPageData.contactData, cardData:newPageData.cardData});

}else
{
  console.log('reseting dome data')
  const resetResults = await app?.currentUser?.functions?.EditHomeData();
  console.log(resetResults);
  const newdata = await getSiteData();
  console.log('new site returned from db=',newdata);

}
}catch(error){
  console.log("EditHomeData Error",error);
  const {  message } = parseAuthenticationError(error);
       console.log(message);
       return {error:message};
}
 

}


const [reservations, setReservations] = React.useState(null);

/**
 *  Allows a registered user to add a new reservation
 * 
 */
 async function insertReservations(reservation) {

    const prof =   await currentUser?.functions.InsertReservation(reservation);
    const newReservation = {...reservation, dateAdded :(new Date()) };


   reservations? setReservations( reservations.push(newReservation)): setReservations([newReservation]);
  dispatch({type: 'RESERVATION_INSERT_SUCCESS', payload:newReservation});

dispatch(createAction('SENDING_EMAIL/SMS_NOTIFICATION')())
init(process.env.REACT_APP_EMAILJS_USERID);
const message = `Reservation requested from (${reservation.firstName} ${reservation.lastName}). Contact Info:${reservation.phone}, ${reservation.email}`;
 const emailTemplate  = 
 {to_name:'Awan', from_name:'8Angels Transportation Email Notifier',
  message:message};

const emailResult = await emailjs.send(process.env.REACT_APP_SERVICEID, process.env.REACT_APP_EMAILJS_TEMPLATEID, emailTemplate, process.env.REACT_APP_EMAILJS_USERID).then((result)=>console.log('Notification Success', result),(error)=>console.log('Notification Error', error));
console.log("Notification Result",emailResult);

}


/**
 *  Return all Reservations by query, for loggedIn and connected users
 */
async function getReservations(){
  try
  {
 dispatch(fetchReservations());
  const res = await app.currentUser?.functions?.FindReservation();
  if(!res) return [];

  setReservations(JSON.parse(res));
  dispatch(fetchReservationsSuccess(JSON.parse(res)));

  return (JSON.parse(res));
}catch(err){
console.log('Get Reservation',err);
dispatch(bubbleError(err.toString()))
}
}


//the variables wrapped and available to the components within this Providor
  const wrapped = { ...app,siteData,editHomeData, currentUser,registerWithEmail,insertReservations, reservations,profile,getReservations, getProfile, logIn, logOut };

  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
};

