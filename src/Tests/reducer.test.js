import {appReducer,fetchReservationsSuccess,fetchSiteDataSuccess,loadProfile,loginSucceeded,LOGIN_SUCCEEDED} from '../redux/reducers/appReducer';
import {INITIAL_STATE, RESERVATION} from '../constants';


const reservation = {
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



test('fetchReservationsSuccess', () => {
  expect(appReducer (undefined, fetchReservationsSuccess([RESERVATION]))).toEqual(

  {
  auth:{loginState :{isLoggedIn:false, isLoggingIn:false},
            backEnd:{}
       },
       app:{},
  reservations:[RESERVATION],
  profile:{ firstName:"A", lastName:"Z",  email:"az@email"},
  siteData:{},
  trace:"FETCH_RESERVATION_SUCCESS",
  error:''
}
   
  )
})


test('fetchSiteDataSuccess', () => {
  const altState = {...INITIAL_STATE, siteData:{screen:'test'},trace: "FETCH_SITEDATA_SUCCESS"};
  expect(appReducer (INITIAL_STATE, fetchSiteDataSuccess({screen:'test'}))).toEqual(
altState   
  )
})

test('loadProfile', () => {
  const altState = {...INITIAL_STATE, profile:{email:'test@email.com'},trace: "LOAD_PROFILE"};
  expect(appReducer (INITIAL_STATE, loadProfile({email:'test@email.com'}))).toEqual(
altState   
  )
})


test('loginSucceeded', () => {
  const altState = {...INITIAL_STATE, profile:{email:'test@email.com'},trace: LOGIN_SUCCEEDED};
  expect(appReducer (INITIAL_STATE, loginSucceeded({email:'test@email.com'}))).toEqual(
altState   
  )
})