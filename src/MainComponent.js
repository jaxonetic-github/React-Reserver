import React, {useEffect} from 'react';
import ApplicationBar from './ApplicationBar.js'
import GeneralInfo from './GeneralInfo';
import Reservations from './checkout/Reservations';
import Checkout from './checkout/Checkout';
import { useRealmApp } from "./RealmApp";
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';


require('./css/App.css');
//const banner = '../images/sideview_closeddoors.jpeg';
const banner = 'https://picsum.photos/id/1018/1000/600/';
//const driverImg = 'https://application-0-iyetn.mongodbstitch.com/assets/driver1.jpeg';



/**
 * MainComponent: The Base component for the application without Providers
 */
export default function MainComponent () {
const app = useRealmApp();
const [auth, setAuth] = React.useState(app.profile);
const [profile, setProfile] = React.useState();
useEffect(() => {
console.log(auth, "SignUp user in Signup Effect. ",app.profile);

  });

  return(

    <div >
    <ApplicationBar props={auth}/>
        <div id='banner' className=' box'><img src={banner}  className="banner-image" alt="logo" /></div>
    <Outlet />
    </div>  
  );
}
