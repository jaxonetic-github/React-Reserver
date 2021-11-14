
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

export function handleAuthenticationError(err, setError) {
  let returnMsg=null;
  const { status, message } = parseAuthenticationError(err);
  const errorType = message || status;
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
      setError((err) => ({ ...err, errorMsg: "Email is already registered." }));
      returnMsg = "Email is already registered." ;
      break;
    case "password must be between 6 and 128 characters":
    case "400":
      setError((err) => ({
        ...err,
        errorMsg: "Password must be between 6 and 128 characters."
      }));
      returnMsg = "Password must be between 6 and 128 characters.";
      break;
    default:
    returnMsg='See Logs';
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