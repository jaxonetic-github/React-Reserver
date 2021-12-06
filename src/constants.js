/** module constants */

/** isAdmin state selector */
export  const isAdminSelector = state => (state?.app?.app?.currentUser?.customData?.email==='kurawan@yahoo.com') 

export const RESERVATION = {
  userid:"6182198ee43796e8d32aff28",
  pickUpDate:"12:12:10",
  pickUpTime:"02:03:04",
  dropOffLocation:"dropoffdestinationf",
  pickupLocation:"pickupdestinationf",
  firstName:"A",
  lastName:"Z",
  email:"az@email",
  createdDated:'2011:11:12',
  phone:"555-555-5555"};

const app={
  currentUser:{ 
      customData:{firstname:'first',
            email:'first@test.com',
            lastname:'test'
            },
      refreshCustomData:(()=>true),
      logIn:(()=>true),
      loginAnonymously:(()=>true),
      fetchSiteData:(()=>true),
      fetchReservations:(()=>true),
  }
}

const appDAO={
      
      refreshCustomData:(()=>({firstName:'first', email:'first@test.com', lastName:'test'  })),
      logIn:(()=>true),
      logOut:(()=>true),
      app:app,
      loginAnonymously:(()=>true),
      getSiteData:(()=>({pageData:HOME_PAGE_DEFAULT, cardData:TIERS, contactData:CONTACTINFO,screen:''})),
      getReservations:(()=>[{...RESERVATION}]),
      insertReservations:(()=>true),
  };


/** 
 *   @description Initial Reducer State @constant
 *   @type {string}
 *   @default
 */
export const INITIAL_STATE={
  auth:{loginState :{isLoggedIn:false, isLoggingIn:false},
            backEnd:{}
       },
       app:{...appDAO},
  reservations:[RESERVATION],
  profile:{ firstName:"A", lastName:"Z",  email:"az@email"},
  siteData:{},
  error:''
};
/** 
 *   @description Initial Reducer State @constant
 *   @type {string}
 *   @default
 */
export const INITIAL_STATE_EMPTY={
  auth:{loginState :{isLoggedIn:false, isLoggingIn:false},
            backEnd:{}
       },
       app:{},
  reservations:[],
  profile:{},
  siteData:{},
  error:'Initial Empty State'
};



/******************    ARIA Labels   *************/
export const EmailAriaLabel = { 'aria-label': 'EmailAddress' };
export const PhoneAriaLabel = { 'aria-label': 'Phone' };
export const ErrorAriaLabel = { 'aria-label': 'Error' };
export const submitAriaLabel = { 'aria-label': 'Submit' };
export const FirstNameAriaLabel = { 'aria-label': 'FirstName' };
export const LastNameAriaLabel = { 'aria-label': 'LastName' };
export const PickUpDateAriaLabel = { 'aria-label': 'PickUpDate' };
export const PickUpLocationAriaLabel = { 'aria-label': 'PickupLocation' };
export const DropOffDateAriaLabel = { 'aria-label': 'DropOFfDate' };
export const DropOffLocationAriaLabel = { 'aria-label': 'DropOffLocation' };
export const PasswordAriaLabel = { 'aria-label': 'Password' };
 

/******* HOME PAGE user modifiable text **********/

const title = 'Service';
const subtitle = 'Entertainment and Pleasure';
const reservationButton = 'Make A Reservation';
const paragraph0Text = '8ANGELS is uniquely prepared to meet your private transportation needs. Our  program serves  a range of industries and occasions, including Concert/tours, sporting events, business venues, wedding events and more. You can depend on an affordable spacious vehicle. We\'ve got you covered! ';
const paragraph1Text = 'This Vehicle is exclusively for transportation to and from hotels and events.  It is also a perfect choice to transport groomsmen and bridesmaids during wedding preparations'
export const HOME_PAGE_DEFAULT = {title, subtitle, reservationButton,paragraphs: [paragraph0Text, paragraph1Text]};

export const CONTACTINFO =  {
    title: 'More Info',

    price: '15',
    description: [
      'Driver:            Mr Awan Kur',
      'Phone :           480-809-7897',
      'Email :      kurawan@yahoo.com',
      'Or click below  to get started',     ],
      imageURL: 'https://raw.githubusercontent.com/jaxonetic-github/React-Reserver/c46c8c01d73d95464eb3931cb4f93fc1c5c2e6bd/public/driver1.jpeg',
    buttonText: 'Get started',
    buttonVariant: 'contained',
  };

export const TIERS = [
  {
    title: 'Features',
    price: 'For your Comfort and Protection',
    description: [
      'Seats upto 8 Passengers',
      'No smoking or Pets',
      'camera in vehicle',
      'hand sanitizers and wipes',
    ],
     imageURL: 'https://raw.githubusercontent.com/jaxonetic-github/React-Reserver/3f90afcd4efbb7e8a62559deaf8162e7bcdba2b8/public/banner_inside_carview.jpeg',
  },
 
  {
    title: 'Arrive in styles',
    price: '30',
    description: [
      'Weddings',
      'Airport Escorts',
      'Business Conventions',
      'Concentions',
    ],
      imageURL: 'https://raw.githubusercontent.com/jaxonetic-github/React-Reserver/3f90afcd4efbb7e8a62559deaf8162e7bcdba2b8/public/sideview_closeddoors.jpeg',

  },
]


/*********************  fee structue used by Review screen to display to user  ******/
export const FEE_FORMULA = [
  {
    name: 'Reservation Fee',
    desc: 'Due by Pickup : Flat fee',
    price: '$150.00',
  },
  {
    name: 'Hourly adjustments',
    desc: 'ex. $20 hour after 3 hours',
    price: '$3.45',
  },
  {
    name: 'Mileage adjustments',
    desc: 'ex. $3/mi after 150 miles',
    price: '$3.00/mi',
  },
  {
    name: 'Security Deposit',
    desc: '',
    price: '$100.00',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

/************************** DB **************************/

/***************Authentication Specific *******************/
export function handleAuthenticationError(err) {
  let returnMsg=null;
  const { status, message } = parseAuthenticationError(err);
  const errorType = message || status;
  console.log(err,'   ===',message,'---', status);
  switch (errorType) {
    case "invalid username":
       returnMsg = "Invalid email address." ;
      break;
    case "invalid username/password":
    case "invalid password":
    case "401":

      returnMsg =  "Incorrect password.";
      break;
    case "name already in use":
    case "409":
//      setError((err) => ({ ...err, errorMsg: "Email is already registered." }));
      returnMsg = "Email is already registered." ;
      break;
    case "password must be between 6 and 128 characters":
    case "400":
     // setError((err) => ({...err,  errorMsg: "Password must be between 6 and 128 characters."  }));
      returnMsg = "Password must be between 6 and 128 characters.";
      break;
    default:
      break;
  }
  return returnMsg ;
}

export function parseAuthenticationError(err) {
  const parts = err.message.split(":");
  const reason = parts[parts.length - 1].trimStart();
  if (!reason) return { status: "", message: "" };
  const reasonRegex = /(?<message>.+)\s\(status (?<status>[0-9][0-9][0-9])/;
  const match = reason.match(reasonRegex);
  const { status, message } = match?.groups ?? {};
  return { status, message };
}