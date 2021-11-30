import {appReducer,fetchReservationsSuccess} from '../redux/reducers/appReducer';
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



test('should return the initial state', () => {
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
