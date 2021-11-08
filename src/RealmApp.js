import React from "react";
import * as Realm from "realm-web";

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
  React.useEffect(() => {
    setApp(new Realm.App(appId)); 
     console.log("realm effect user >>>",app.currentUser);
     const prof = getProfile().then((pr)=>{console.log('profile result',pr); setProfile(pr)});
  }, [appId]);

  // Wrap the Realm.App object's user state with React state
  const [currentUser, setCurrentUser] = React.useState(app.currentUser);
  async function logIn(credentials) {

    const newUser = await app.logIn(credentials);

    setCurrentUser(newUser); 
    const prof = await newUser.functions.GetUserData(newUser.id);
    setProfile(prof);
    console.log("get userdata",prof)
    // If successful, app.currentUser is the user that just logged in
    return newUser;
  }

  async function logOut() {

    // Log out the currently active user
     app.currentUser?.logOut();
    setCurrentUser(null);
    setProfile(null);

  }

  async function registerWithEmail(email, password, firstName, lastName) {
    try{
    // Log out the currently active user
     const aux =   await app.emailPasswordAuth.registerUser(email, password);
     console.log("registeremail result",aux);
    app.logIn(Realm.Credentials.emailPassword(email, password)).then(async(usr)=>{
      console.log("register with email inner Uusr",usr);
     const userdata =  await usr.functions?.AddUserData({firstname:firstName, lastname:lastName,email:email, userid:usr.id});
    console.log(app.currentUser,'userdata = ', usr);
    setCurrentUser(usr);
    const prof = await usr.functions.GetUserData(usr.id);
    setProfile(prof)
     })
    
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

 async function getProfile(usr) {
    
     const prof = await app?.currentUser?.functions?.GetUserData(app.currentUser.id);

return prof;
}

const [reservations, setReservations] = React.useState(null);

 async function insertReservations(reservation) {
    // Log out the currently active user
     const prof =  currentUser &&  await currentUser.functions.InsertReservation(reservation);
    // If another user was logged in too, they're now the current user.
    // Otherwise, app.currentUser is null.
}

  const wrapped = { ...app, currentUser,registerWithEmail,insertReservations,profile,getProfile, logIn, logOut };

  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
};
