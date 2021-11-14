import React from "react";
import * as Realm from "realm-web";

import {HOME_PAGE_DEFAULT, TIERS} from './constants';
    import emailjs, { init } from 'emailjs-com';
import envVars from './envVars.js';

const RealmAppContext = React.createContext();


export const useRealmApp = () => {
  const app = React.useContext(RealmAppContext);
  if (!app) {
    throw new Error(
      `You must call useRealmApp() inside of a <RealmAppProvider />`
    );
  }
  return app;
};

export const RealmAppProvider = ({ appId, children }) => {
  const [app, setApp] = React.useState(new Realm.App(appId));
  const stubbed = false;

  React.useEffect(() => {
    setApp(new Realm.App(appId)); 
   // setCurrentUser(app.currentUser);
   getSiteData().then((info)=>{
    setSiteData(info);
    getReservations();
  });

/*    if(app?.currentUser?.customData?.firstName){
     console.log("realm effect user >>>",app?.currentUser?.customData);
     
      getProfile().then((pr)=>{console.log('profile result',pr); setProfile(pr)});      
   }*/
  }, [appId]);


  // Wrap the Realm.App object's user state with React state
  const [currentUser, setCurrentUser] = React.useState(app.currentUser);
  
  /**
   *  login with the provided Login Credentials.  After loggin in , set Profile and Reservations
   */
  async function logIn(credentials) {

    const newUser = await app.logIn(credentials);

    setCurrentUser(newUser); 
    const prof = await newUser.functions.GetUserData(newUser.id);
    setProfile(prof);
     getReservations();
    // If successful, app.currentUser is the user that just logged in
    return newUser;   
  }


/**
 *  Logout current user, by clearing the CurrentUSer, Profile, and Reservations
 */
  async function logOut() {

    // Log out the currently active user
     app.currentUser?.logOut();
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
     const aux =   await app.emailPasswordAuth.registerUser(email, password);
     console.log("registeremail result",aux);
     const newUser = await app.logIn(Realm.Credentials.emailPassword(email, password));
     setCurrentUser(newUser);
      console.log(app,"registered with email inner Uusr",newUser);
     const userdata =  await newUser.functions?.AddUserData({firstname:firstName, lastname:lastName,email:email,phone, userid:newUser.id});
    console.log('userdata = ', userdata);
     await app.currentUser.refreshCustomData();
    const prof = await newUser.functions.GetUserData(newUser.id);
    setProfile(prof)
      getReservations();
     
    
//console.log(app.currentUser.funct-ions,'registeringnewCurrent=');

   // const udResults = app.currentUser.functions.AddUserData({firstname:firstName, lastname:lastName, userid:'app.curren'}).
//console.log('udResults=',udResults);
     //no need to set User or Profile,
     //this should be done in the local login
}catch(error){
  console.log(error);
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
     prof = await app?.currentUser?.functions?.GetUserData(app.currentUser.id);
    }catch(error){
      console.log("Profile Access error",prof);
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
console.log("1st sitedata attempt",site);
  if(!site)
  {console.log('No site innfo, attempting to log in ß');
    const user = await app.logIn(Realm.Credentials.anonymous());
  site = await user?.functions?.GetSiteData();
  }
  setSiteData(site);

  return site;
}catch(error){
  console.log("GetSiteData Error",error)
}
console.log('returning null site data');
return null;
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
  console.log("EditHomeData Error",error)
}
 

}


const [reservations, setReservations] = React.useState(null);

/**
 *  Allows a registered user to add a new reservation
 * 
 */
 async function insertReservations(reservation) {
    // Log out the currently active user
     const prof =   await currentUser?.functions.InsertReservation(reservation);

init(envVars.EMAIL_USERID);
const message = `Hello Awan,\n\nA new reservation has been requested online from ${reservation.firstName} ${reservation.lastName}. The client requests to be picked up from ${reservation.pickupLocation} @${reservation.pickUpDate}. The drop-off location would be at ${reservation.dropOffLocation} @${reservation.dropOffDate}.\n\nYou can contact ${reservation.firstName} at ${reservation.phone} or by email ${reservation.email}.  `
 const emailTemplate  = 
 {to_name:'Awan', from_name:'8Angels Transportation Email Notifier',
  message:message};

emailjs.send(envVars.SERVICEID, envVars.EMAILJS_TEMPLATEID, emailTemplate, envVars.EMAILJS_USERID);
reservation.dateAdded = new Date();
   reservations? reservations.push(reservation): setReservations(reservation);
        console.log( 'Insert Reservation Results',prof);

//setReservations(reservations);
}


/**
 *  Restore changes to a default
 *
 async function resetHomeData() {
     let editResults = null; 
     let site = null;
try{
      editResults = await app?.currentUser?.functions?.Ed(false);

console.log('sitdaata?==',editResults);
setSiteData({screen:'home_general', pageData:HOME_PAGE_DEFAULT, cardData:TIERS});

}catch(error){
  console.log("resetHomeData() Error",error)
}
 //const user =//null await app.logIn(Realm.Credentials.anonymous());
  //sdata = await user?.functions?.GetSiteData();
  //console.log("SideData retrieved",sdata);

return editResults;
}
*/

/**
 *  Return all Reservations by query, for loggedIn and connected users
 */
async function getReservations(){
  console.log('getReservations');
  const res = await app?.currentUser?.functions?.FindReservation();
  console.log('Reservations found?=',JSON.parse(res));
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
