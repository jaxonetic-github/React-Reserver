import React from "react";
import * as Realm from "realm-web";
import {useNavigate} from "react-router-dom";

import {HOME_PAGE_DEFAULT, TIERS, handleAuthenticationError, parseAuthenticationError} from './constants';
    import emailjs, { init } from 'emailjs-com';
import envVars from './envVars.js';



const RealmAppContext = React.createContext();

/**
 * Using the React Context to have one source of truth for the
 * backend reference, like a Singleton.
 * 
 */
export const useRealmApp = () => {
  const app = React.useContext(RealmAppContext);
  if (!app) {
    const stub = {stubbed:true, logIn:(credentials)=>{console.log(credentials); return (new Promise()).resolve('success')}, registerWithEmail:(credentials)=>{console.log(credentials); return (new Promise()).resolve('resolved registration') }, logOut:()=>{console.log('logout')}};
    console.log(`You must call useRealmApp() inside of a <RealmAppProvider />`);
    console.log('Entering Debug/Independent mode with stub', stub);
    return stub;
  }

  return app;
};


export  const RealmAppProvider = ({ appId, children }) => {
  const navigate = useNavigate();
  const [app, setApp] = React.useState(new Realm.App(appId));
  const stubbed = app.stubbed;
 console.log(app,'------', stubbed);
  React.useEffect(() => {
    setApp(new Realm.App(appId)); 
   getSiteData();
   
    if(app?.currentUser?.customData?.firstName){
     console.log(app?.currentUser?.customData?.email,"realm effect user reefresh?>>>",app?.currentUser?.customData);
      app.currentUser.refreshCustomData();
     getReservations();

      getProfile().then((pr)=>{console.log('profile result',pr); setProfile(pr)});      
   }
  }, [appId]);

async function refreshCustomData(){
 await app.currentUser.refreshCustomData();  
}
  // Wrap the Realm.App object's user state with React state
  const [currentUser, setCurrentUser] = React.useState(app.currentUser);
  
  /**
   *  login with the provided Login Credentials.  After loggin in , set Profile and Reservations
   */
  async function logIn(credentials) {
try
{
  console.log(`login credentials ${credentials}`);
   const newUser = await app.logIn(Realm.Credentials.emailPassword(credentials.email, credentials.password));

    setCurrentUser(newUser); 
    //This is a redundate with customData but docs mention customData sometimes being stale?
    // The stale data issue may be fixed with the call to  refreshCustomData().
    //
    const prof = await newUser.functions.GetUserData(newUser.id);
    setProfile(prof);
     getReservations();
     
     //ensure fresh customData cache
     newUser.refreshCustomData();
    // If successful, app.currentUser is the user that just logged in
    return newUser;   
  }catch(error){return {error:handleAuthenticationError(error)};}
  
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
    // Log out the currently active user
   await app.emailPasswordAuth.registerUser(email, password);
     const newUser = await app.logIn(Realm.Credentials.emailPassword(email, password));
     setCurrentUser(newUser);
     const userdata =  await newUser.functions?.AddUserData({firstname:firstName, lastname:lastName,email:email,phone, userid:newUser.id});
     await app.currentUser.refreshCustomData();
    const prof = await newUser.functions.GetUserData(newUser.id);
    setProfile(prof)
      getReservations();

     return {success:true};
}catch(error){
  return {error:handleAuthenticationError(error)};
}
return null;
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
       console.log(message);
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
 async function getSiteData() {
     let site = stubbed && {pageData:HOME_PAGE_DEFAULT, cardData:TIERS};
try{

   site =   await app?.currentUser?.functions?.GetSiteData();
//console.log("1st sitedata attempt",site);
  if(!site)
  {//console.log('No site innfo, attempting to log in ß');
    const user = await app.logIn(Realm.Credentials.anonymous());
  site = await user?.functions?.GetSiteData();
  }
  setSiteData(site);

  return site;
}catch(error){
 const { status, message } = parseAuthenticationError(error);
      // console.log(message);
       return {error:message};
}

}


/**
 * Edits data  for the Home Page by a registered Admin user.  
 * @param newPageData takes a HOME_PAGE_DEFAULT type object
 */
 async function editHomeData(newPageData) {
   let sdata = null; 
     let site = null;

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
  const { status, message } = parseAuthenticationError(error);
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

init(envVars.EMAIL_USERID);
const message = `Reservation requested from (${reservation.firstName} ${reservation.lastName}). Contact Info:${reservation.phone}, ${reservation.email}`;
 const emailTemplate  = 
 {to_name:'Awan', from_name:'8Angels Transportation Email Notifier',
  message:message};

const emailResult = await emailjs.send(envVars.SERVICEID, envVars.EMAILJS_TEMPLATEID, emailTemplate, envVars.EMAILJS_USERID).then((result)=>console.log('Notification Success', result),(error)=>console.log('Notification Error', error));
console.log("Notification Result",emailResult);

reservation.dateAdded = new Date();
   reservations? reservations.push(reservation): setReservations(reservation);
        console.log( 'Insert Reservation Results',prof);
}


/**
 *  Return all Reservations by query, for loggedIn and connected users
 */
async function getReservations(){
  const res = await app?.currentUser?.functions?.FindReservation();
  setReservations(JSON.parse(res));
  return (JSON.parse(res));
}


//the variables wrapped and available to the components within this Providor
  const wrapped = { ...app,siteData,editHomeData, currentUser,registerWithEmail,insertReservations, reservations,profile,getReservations, getProfile, logIn, logOut };

  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
};

