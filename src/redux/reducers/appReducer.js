import { createAction, createReducer } from '@reduxjs/toolkit'

export const FETCH_SITEDATA ='FETCH_SITEDATA';
export const FETCH_SITEDATA_SUCCESS ='FETCH_SITEDATA_SUCCESS';
export const FETCH_SITEDATA_ERROR ='FETCH_SITEDATA_FAILED';
export const FETCH_RESERVATION ='FETCH_RESERVATIONS';
export const FETCH_RESERVATION_SUCCESS ='FETCH_RESERVATION_SUCCESS';
export const FETCH_RESERVATION_ERROR ='FETCH_RESERVATION_FAILED';
export const RESERVATION_INSERT_ERROR ='RESERVATION_INSERT_FAILED';
export const RESERVATION_INSERT_SUCCESS ='RESERVATION_INSERT_SUCCESS';
export const RESERVATION_INSERT ='RESERVATION_INSERT_REQUESTED';
export const LOGIN_SUCCEEDED ='LOGIN_SUCCEEDED';
export const LOGIN_ERROR ='LOGIN_FAILED';
export const LOGIN ='LOGIN';
export const LOGOUT ='LOGOUT';
export const REGISTER_SUCCESS ='REGISTER_SUCCESS';
export const REGISTER_ERROR ='REGISTER_FAILED';
export const REGISTER ='REGISTER_REQUESTED';
export const USERDATA_FETCH ='USERDATA_FETCH';
export const USERDATA_FETCH_SUCCESS ='USERDATA_FETCH_SUCCESS';
export const USERDATA_FETCH_ERROR ='USERDATA_FETCH_ERROR';
export const FETCH_BACKEND ='LOAD_BACKEND';
export const FETCH_BACKEND_SUCCESS ='LOAD_BACKEND_SUCCESS';
export const FETCH_BACKEND_ERROR ='LOAD_BACKEND_ERROR';
export const BUBBLE_ERROR ='BUBBLEERROR';
export const LOAD_USER='LOAD/USER';
export const LOAD_PROFILE = "LOAD_PROFILE";

export const CREDIT_PAYMENT_SUCCESS = 'CREDIT_PAYMENT_SUCCESS';
export const CREDIT_PAYMENT_ERROR = 'CREDIT_PAYMENT_ERROR';

export const fetchSiteData = createAction(FETCH_SITEDATA);
export const fetchSiteDataError = createAction(FETCH_SITEDATA_ERROR);
export const fetchSiteDataSuccess = createAction(FETCH_SITEDATA_SUCCESS);
export const loadBackEnd = createAction(FETCH_BACKEND);
export const loadProfile = createAction(LOAD_PROFILE);
export const loadUser = createAction(LOAD_USER);
export const loadBackEndError = createAction(FETCH_BACKEND_ERROR);
export const loadBackEndSuccess = createAction(FETCH_BACKEND_SUCCESS);

export const bubbleError = createAction(BUBBLE_ERROR);

export const loginError = createAction(LOGIN_ERROR);
export const login = createAction(LOGIN);
export const loginSucceeded = createAction(LOGIN_SUCCEEDED);
export const logout = createAction(LOGOUT);
export const register = createAction(REGISTER)
export const registerSuccess = createAction(REGISTER_SUCCESS)
export const registerError = createAction(REGISTER_ERROR)

export const fetchReservations = createAction(FETCH_RESERVATION);
export const fetchReservationsSuccess = createAction(FETCH_RESERVATION_SUCCESS);
export const fetchReservationsError = createAction(FETCH_RESERVATION_ERROR);

export const insertReservation = createAction(RESERVATION_INSERT);
export const insertReservationSuccess = createAction(RESERVATION_INSERT_SUCCESS);
export const insertReservationError = createAction(RESERVATION_INSERT_ERROR);

export const refreshCustomData = createAction(USERDATA_FETCH);
export const refreshCustomDataSuccess = createAction(USERDATA_FETCH_SUCCESS);
export const refreshCustomDataError = createAction(USERDATA_FETCH_ERROR);

export const creditPaymentSuccess = createAction(CREDIT_PAYMENT_SUCCESS);
export const creditPaymenError = createAction(CREDIT_PAYMENT_ERROR);

const initialState={
  auth:{loginState :{isLoggedIn:false, isLoggingIn:false},
            backEnd:{}
       },
       app:{},
  reservations:[],
  profile:{},
  siteData:{},
  error:''
};

export const reducer = createReducer(initialState, (builder) => {

  builder
  .addCase(creditPaymentSuccess, (state, action) => {
      state.trace = action.type;
      state.user = action.payload;
      return state;
    })
    .addCase(creditPaymenError, (state, action) => {
      state.trace = action.type;
      state.user = action.payload;
      return state;
    })
      .addCase(loadUser, (state, action) => {
      state.trace = action.type;
      state.user = action.payload;
      return state;
    })
      .addCase(loadProfile, (state, action) => {
      state.trace = action.type;
      state.profile = action.payload;
      return state;
    })      
    .addCase(fetchSiteData, (state, action) => {
      state.trace = action.type;
      return state;
    })
        .addCase(fetchSiteDataSuccess, (state, action) => {
      state.trace = action.type;
      state.siteData= action.payload
      return state;
    })
      .addCase(refreshCustomDataSuccess, (state, action) => {
      state.trace = action.type;
      state.customProfileData= action.payload
      return state;
    })
    .addCase(refreshCustomData, (state, action) => {
      state.trace = action.type;
      return state;
    })
    .addCase(register, (state, action) => {
      state.trace = action.type;
      return state;
    }).addCase(registerSuccess, (state, action) => {
      state.trace = action.type;
      state.user = action.payload.user;
      state.profile = action.payload.profile;
      state.reservations= action.payload.reservations? action.payload.reservations:[];

      return state;
    })
      .addCase(loadBackEnd, (state, action) => {
      state.trace = action.type;
      state.app= action.payload;
      return state;
    })
    .addCase(loginSucceeded, (state, action) => {
       state.trace = action.type;
       state.authState = {status :'Logged In successfully'};
       state.user = action.payload.user;
       state.profile = action.payload.profile;
       //state.reservation= action.payload.reservations;
      state.reservations= action.payload.reservations? action.payload.reservations:[];

return state;
    })
      .addCase(loginError, (state, action) => {
       state.trace = action.type;
       state.error = action.payload;
      state.authState = {status :'Error while Logging In'};

return state;
    })
    .addCase(login, (state, action) => { 
             state.trace = action.type;
             state.error = '';
     state.authState = {status :'Logging In'};
      return state;
    })
    .addCase(fetchReservations, (state, action) => {
    state.trace = action.type; 
      return state;
    })
    .addCase(fetchReservationsSuccess, (state, action) => {
    state.trace = action.type; 
     state.reservations = action.payload;
      return state;
    })
    .addCase(insertReservation, (state, action) => {
    state.trace = action.type; 
      return state;
    })
    .addCase(insertReservationSuccess, (state, action) => {
    state.trace = action.type; 
    console.log(state.reservations,'----',typeof state.reservations ,action.payload);
      state.reservations= state.reservations? state.reservations.push(action.payload):[action.payload];
      return state;
    })
    .addCase(logout, (state, action) => {
      state.trace = action.type;
      state.app = null;
      state.profile=null;
      state.user = null;
      state.reservations = [];
      state.authState = null;
      return state;
    })
    .addCase(bubbleError, (state, action) => {
      state.trace = action.type;
      state.error = action.payload;
      return state;
    }).addDefaultCase((state, action) =>{
          state.trace = action.type;
            return state;})
})