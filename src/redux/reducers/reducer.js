/**
import{ FETCH_SITEDATA,FETCH_SITEDATA_SUCCESS, FETCH_SITEDATA_ERROR ,
FETCH_RESERVATION, FETCH_RESERVATION_SUCCESS, FETCH_RESERVATION_ERROR, RESERVATION_INSERT_ERROR, RESERVATION_INSERT_SUCCESS, RESERVATION_INSERT,
LOGIN_SUCCEEDED, LOGIN_ERROR,LOGIN ,
  REGISTER_SUCCESS, REGISTER_ERROR, REGISTER, SITEDATA_FETCH, SITEDATA_FETCH_SUCCESS, SITEDATA_FETCH_ERROR,
  USERDATA_FETCH,USERDATA_FETCH_SUCCESS, USERDATA_FETCH_ERROR} = from './actions';


import { createAction, createReducer } from '@reduxjs/toolkit'

export const FETCH_SITEDATA ='FETCH_SITEDATA_REQUEST';
export const FETCH_SITEDATA_SUCCESS ='FETCH_SITEDATA_SUCCESS';
export const FETCH_SITEDATA_ERROR ='FETCH_SITEDATA_FAILED';
export const FETCH_RESERVATION ='FETCH_RESERVATION_REQUEST';
export const FETCH_RESERVATION_SUCCESS ='FETCH_RESERVATION_SUCCESS';
export const FETCH_RESERVATION_ERROR ='FETCH_RESERVATION_FAILED';
export const RESERVATION_INSERT_ERROR ='RESERVATION_INSERT_FAILED';
export const RESERVATION_INSERT_SUCCESS ='RESERVATION_INSERT_SUCCESS';
export const RESERVATION_INSERT ='RESERVATION_INSERT_REQUESTED';
export const LOGIN_SUCCEEDED ='LOGIN_SUCCEEDED';
export const LOGIN_ERROR ='LOGIN_FAILED';
export const LOGIN ='LOGIN_REQUESTED';
export const LOGOUT ='LOGOUT';
export const REGISTER_SUCCESS ='REGISTER_SUCCESS';
export const REGISTER_ERROR ='REGISTER_FAILED';
export const REGISTER ='REGISTER_REQUESTED';
export const SITEDATA_FETCH ='SITEDATA_FETCH';
export const SITEDATA_FETCH_SUCCESS ='SITEDATA_FETCH_SUCCESS';
export const SITEDATA_FETCH_ERROR ='SITEDATA_FETCH_ERROR';
export const USERDATA_FETCH ='SITEDATA_FETCH';
export const USERDATA_FETCH_SUCCESS ='SITEDATA_FETCH_SUCCESS';
export const USERDATA_FETCH_ERROR ='SITEDATA_FETCH_ERROR';
export const LOAD_BACKEND ='LOAD_BACKEND';

*/


/*
 * action creators
 */
 /*
export function insertReservations(reservation) {
  return { type:RESERVATION_INSERT , payload:reservation }
}
export function insertReservationError(error) {
  return { type:RESERVATION_INSERT_ERROR , payload:error }
}
export function insertReservationSuccess() {
  return { type:RESERVATION_INSERT_SUCCESS  }
}
export function loadBackEndAction(backEnd) {
  return { type:LOAD_BACKEND, payload:backEnd }
}




export const reducer = (state={}, action) => {
 // console.log(state,action);
  switch (action.type) {
      case 'LOADBACKEND': 
      const app = { ...state, app:action.payload.app };
      console.log("added app::",app);
      return { ...state, app:action.payload.app};
      case SITEDATA_FETCH:
      return [...state,{}];
      case SITEDATA_FETCH_SUCCESS:
      return state;
      case SITEDATA_FETCH_ERROR:
      return state;
      case FETCH_RESERVATION:
      return state;
      case FETCH_RESERVATION_SUCCESS:
      return state;
      case FETCH_RESERVATION_ERROR:
      return state;
      case RESERVATION_INSERT_ERROR:
      return [...state,{}];
      case RESERVATION_INSERT_SUCCESS:
      return [...state,{}];
      case RESERVATION_INSERT:
      return state;
      case LOGIN_SUCCEEDED:
      return state;
      case LOGIN_ERROR:
      return [state,{error:action.payload}];
    case LOGIN:
      return state;
      case LOGOUT:
      return state;
     case REGISTER_SUCCESS:
      return state;
     case REGISTER_ERROR:
      return state;
     case REGISTER:
      return state;
     case USERDATA_FETCH:
      return state;
       case USERDATA_FETCH_SUCCESS:
      return state;
      case USERDATA_FETCH_ERROR:
      return state;
    default:
      return state;
  }
};
*/