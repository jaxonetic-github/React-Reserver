import * as Realm from "realm-web";
import { handleAuthenticationError, parseAuthenticationError} from './constants';
    import emailjs, { init } from 'emailjs-com';

/**
 * @class
 * @description Using the Provider and the React.Context to store teh DB link.
 * 
 * @param demoAppId : The Realm Aplication ID
 * @param children : the nodes nested within component
 */
export class RealmDAO  {

  constructor( demoAppId){
this.app = new Realm.App(demoAppId);
  
  }

/**
 * @desc ensure customData object is not stale
 *
*/
 reloadCustomData = async ()=>{
 await this.app?.currentUser?.refreshCustomData(); 
 return this.app?.currentUser?.customData;
}
   

  /**
   *  login with the provided Login Credentials.  After loggin in , set Profile and Reservations
   */
  loginAnonymously = async  ()=> {
      const loginResult = await this.app?.logIn(Realm.Credentials.anonymous());
      console.log("loginAnonymously:",loginResult);
     // await this.getSiteData();

      //this.logOut();
      return loginResult;
}

  /**
   *  login with the provided Login Credentials.  After loggin in , set Profile and Reservations
   */
  login =async  (credentials) =>{
console.log(credentials)
    try
    {
    //tell store that a login is being attempted
   //dispatch(login('Attempting to login'));
   const loginResult =  await this.app.logIn(Realm.Credentials.emailPassword(credentials.email, credentials.password));
   return loginResult;
    } catch(err)
    {
      const msg = handleAuthenticationError(err);
      console.log(msg,'--',err);
     //  dispatch(loginError(msg));
    }
  }
 

/**
 *  Logout current user, by clearing the CurrentUSer, Profile, and Reservations
 */
  logOut = async ()=> {
    // Log out the currently active user
    this.app?.currentUser?.logOut();
  }


/**
 * Register user by autoconfirmaed email, 
 * @params email, password needed for registration
 * @params firstName, lastName : needed for profile
 * @params phone: optional
 * 
 */
  registerWithEmail =async  (registerData)=> {
    try{
     // const args = {email,password,firstName, lastName, phone};
     //  dispatch(register(args));


     await this.app.emailPasswordAuth.registerUser(registerData.email, registerData.password);
      await this.app?.logIn(Realm.Credentials.emailPassword(registerData.email, registerData.password));
    //      dispatch(refreshCustomDataSuccess());
    try {
         //add CustomData
         await this.app?.currentUser?.functions?.AddUserData({...registerData, userid:this.app?.currentUser?.id});
    
          return  this.reloadCustomData();

    }catch(err1){console.log("errer adding userdata",err1)}
       // const prof = await newUser.functions.GetUserData(newUser.id);
    

    //dispatch(registerSuccess({user:newUser, profile:app?.currentUser?.customData, reservations:reservations}))
/*
try {
      await getReservations();
}catch(err2){console.log('error gettinng reservation',err2)}
*/
     return {success:true};
}catch(error){
  console.log(error);
   //   dispatch({type: 'REGISTER_FAILED', payload:{error:handleAuthenticationError(error)} });

  return {error:handleAuthenticationError(error)};
}

  }


/**
 * Return Profile of registered user.
 * 
 */
 getProfile = async ()=> {
    
     let prof = null;
     try{
     prof = await this.app?.currentUser?.functions?.GetUserData(this.app?.currentUser?.id);
    }catch(error){
       const { status, message } = parseAuthenticationError(error);
       return {error:status+message};
    }
return prof;
}




/**
 * Read Site Data: If user object has the *?.functions* variable available
 *   then retrieve the Site Data, otherwise anonymously login first for access 
 *   to backend functions.
 *  @return site =  {pageData:HOME_PAGE_DEFAULT, cardData:TIERS};
 */
  getSiteData = async ()=> {
 
   //  let site =  {pageData:HOME_PAGE_DEFAULT, cardData:TIERS};
    try{
       const site =   await this.app.currentUser.functions.GetSiteData();
      console.log('returning,',site);
      return site;
    }catch(error){
     const {  message } = parseAuthenticationError(error);

           return {error:message};
    }
}


/**
 * Edits data  for the Home Page by a registered Admin user.  
 * @param newPageData takes a HOME_PAGE_DEFAULT type object
 */
 editHomeData = async (newPageData) =>{
  
try{
if (newPageData){
const obj ={screen:'home_general',pageData:newPageData.pageData, cardData:newPageData.cardData}
console.log(newPageData,'passing to edithomefuncion',obj);

     const editResults = await this.app?.currentUser?.functions.EditHomeData(newPageData);
console.log('editResults from realm', editResults);
this.setSiteData({screen:'home_general',pageData:newPageData.pageData, contactData:newPageData.contactData, cardData:newPageData.cardData});

}else
{
  console.log('reseting dome data')
  const resetResults = await this.app?.currentUser?.functions?.EditHomeData();
  console.log(resetResults);
  const newdata = await this.getSiteData();
  console.log('new site returned from db=',newdata);

}
}catch(error){
  console.log("EditHomeData Error",error);
  const {  message } = parseAuthenticationError(error);
       console.log(message);
       return {error:message};
}
 

}



/**
 *  Allows a registered user to add a new reservation
 * @param {reservation}
 */
 insertReservations = async  (reservation)=> {

    const newReservation = {...reservation, dateAdded :(new Date()), userid:this.app.currentUser?.id };
   const result = await this.app.currentUser?.functions.InsertReservation(newReservation);

//dispatch(createAction('SENDING_EMAIL/SMS_NOTIFICATION')())
init(process.env.REACT_APP_EMAILJS_USERID);
const message = `Reservation requested from (${newReservation.firstName} ${newReservation.lastName}). Contact Info:${newReservation.phone}, ${newReservation.email}`;
 const emailTemplate  = 
 {to_name:'Awan', from_name:'8Angels Transportation Email Notifier',
  message:message};

const emailResult = await emailjs.send(process.env.REACT_APP_SERVICEID, process.env.REACT_APP_EMAILJS_TEMPLATEID, emailTemplate, process.env.REACT_APP_EMAILJS_USERID).then((result)=>console.log('Notification Success', result),(error)=>console.log('Notification Error', error));
console.log("Notification Result",emailResult);
 return result;
}


/**
 *  Return all Reservations by query, for loggedIn and connected users
 *  @return JSON.parse(reservation_array)
 */
getReservations = async  ()=>{
  try
  {
  const res = await this.app.currentUser?.functions?.FindReservation();
  if(!res) return [];

  return (JSON.parse(res));
}catch(err){
return {error:err};
}
}


//the variables wrapped and available to the components within this Providor
 // const wrapped = { ...app,siteData,editHomeData, currentUser,registerWithEmail,insertReservations, reservations,profile,getReservations, getProfile, logIn, logOut };

}