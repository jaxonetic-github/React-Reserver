import {appReducer,registerSuccess,REGISTER_SUCCESS,
  fetchReservationsSuccess,fetchSiteDataSuccess,
  loadUser,LOAD_USER, loadProfile,loginError,LOGIN_ERROR,loginSucceeded,LOGIN_SUCCEEDED,
logout, LOGOUT,bubbleError,BUBBLE_ERROR,loadBackEnd,FETCH_BACKEND} from '../redux/reducers/appReducer';
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

test('loadUser', () => {
  const altState = {...INITIAL_STATE,trace: LOAD_USER, user:{id:'testid'}};
  expect(appReducer (INITIAL_STATE, loadUser({id:'testid'}))).toEqual(
altState   
  )
})


test('loginSucceeded', () => {
  const altState = {...INITIAL_STATE, trace: LOGIN_SUCCEEDED,
    reservations:[RESERVATION],
    profile:{email:'test@email.com'},
    user:{id:'testid'},
    authState : {status :'Logged In successfully'}
  };
  expect(appReducer (INITIAL_STATE, loginSucceeded( {profile:{email:'test@email.com'}, reservations:[RESERVATION], user:{id:'testid'} } ))).toEqual(
altState   
  )
})


test('registerSuccess', () => {
  const altState = {...INITIAL_STATE, trace: REGISTER_SUCCESS,
    reservations:[RESERVATION],
    profile:{email:'test@email.com'},
    user:{id:'testid'},
  };
  expect(appReducer (INITIAL_STATE, registerSuccess( {profile:{email:'test@email.com'}, reservations:[RESERVATION], user:{id:'testid'} } ))).toEqual(
altState   
  )
})


test('logout', () => {
  const altState = {...INITIAL_STATE,trace: LOGOUT, user:null, profile:null,reservations:[],authState:null};
  expect(appReducer (INITIAL_STATE, logout())).toEqual(
altState   
  )
})


test('BUBBLE_ERROR', () => {
  const altState = {...INITIAL_STATE,trace: BUBBLE_ERROR, error:'unexpected error'};
  expect(appReducer (INITIAL_STATE, bubbleError('unexpected error'))).toEqual(
altState   
  )
})



test('loginError action', () => {
  const altState = {...INITIAL_STATE,trace: LOGIN_ERROR, error:'unexpected error',authState: {status :'Error while Logging In'}};
  expect(appReducer (INITIAL_STATE, loginError('unexpected error'))).toEqual(
altState   
  )
})


test('Load  BackEnd', () => {
  const altState = {...INITIAL_STATE,trace: FETCH_BACKEND, app:{}};
  expect(appReducer (INITIAL_STATE, loadBackEnd({}))).toEqual(
altState   
  )
})




