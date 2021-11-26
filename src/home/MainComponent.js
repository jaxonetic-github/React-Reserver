import React from 'react';
import ApplicationBar from '../navigation/ApplicationBar.js'
//import GeneralInfo from './GeneralInfo';
//import Reservations from './checkout/Reservations';
import { Outlet} from 'react-router-dom';
import Footer from '../navigation/Footer'


//const banner = '../images/sideview_closeddoors.jpeg';
const banner = 'https://picsum.photos/id/1018/1000/600/';
//const driverImg = 'https://application-0-iyetn.mongodbstitch.com/assets/driver1.jpeg';
//await app.currentUser.refreshCustomData();


/**
 * MainComponent: The Base component for the application without Providers
 */
export default function MainComponent () {
  return(

    <div >
    <ApplicationBar />
        <div id='banner' className=' box'><img src={banner}  className="banner-image" alt="logo" /></div>
    <Outlet />
    <Footer/>
    </div>  
  );
}
