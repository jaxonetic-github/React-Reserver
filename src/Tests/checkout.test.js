/**
 * @jest-environment jsdom
 */
 import React from 'react';
import { render, screen, fireEvent,createEvent ,waitFor,act } from '@testing-library/react';
import Checkout from '../checkout/Checkout';

//import LocSelect from '../checkout/locationSelect.js';
import { configureStore } from '@reduxjs/toolkit'

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import * as ReactRedux from 'react-redux';
import {appReducer} from '../redux/reducers/appReducer'
import INITIAL_STATE_EMPTY from '../constants.js';

import {AgreementCheckboxAriaLabel,AgreementSignatureAriaLabel,AgreementAriaLabel,EmailAriaLabel, ErrorAriaLabel, submitAriaLabel, FirstNameAriaLabel, LastNameAriaLabel,
  PickUpDateAriaLabel, PickUpLocationAriaLabel,DropOffLocationAriaLabel,DropOffDateAriaLabel }  from '../constants'


const locations = [{label:'Alchemeia Center', value:'262 E Pastime rd, Tucson Az,'},
                    {label:'ASIS Massage', value:'000 4th St, Tucson AZ'}];

  describe('Checkout Test', () => {
//  let signin = null;
  let app = null;
 let signin = null;
 let store;
  const useSelectorMock = jest.spyOn(ReactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

 beforeAll(() => {
     store = configureStore({ reducer: { user: appReducer }, INITIAL_STATE_EMPTY })
   });


/**
*
*/
beforeEach(() => {
  useSelectorMock.mockClear();
  useDispatchMock.mockClear();
})


test('Checkout advances to Review if all fields are valid', async () => {
   const profile = {firstname:'fntest', lastname:'tttttttest', email:'test@email.com', phone:'1230900982'};

     render( <ReactRedux.Provider store={store}><BrowserRouter><Checkout/></BrowserRouter>  </ReactRedux.Provider>);

    const phone = screen.getByLabelText('Phone');

  const title = screen.getByText('Checkout');
  const dropOffLocation = screen.getByLabelText(DropOffLocationAriaLabel['aria-label']);
 // const dropOffDate = screen.getByLabelText(DropOffDateAriaLabel['aria-label']);
  const pickUpLocation = screen.getByLabelText(PickUpLocationAriaLabel['aria-label']);
  const firstName = screen.getByLabelText(FirstNameAriaLabel['aria-label']);
  const lastName = screen.getByLabelText(LastNameAriaLabel['aria-label']);
  const emailField = screen.getByLabelText(EmailAriaLabel['aria-label']);
  
  //console.log(next);
   //userEvent.type(dropOffLocation, '123 dropoff street');
  
   /**/
    userEvent.type(phone, profile.phone);
   userEvent.type(emailField, profile.email);
   userEvent.type(firstName, profile.firstname);
   userEvent.type(lastName, profile.lastname);

   userEvent.type(pickUpLocation, '123 pickup st');
   var typedElem = screen.getByText('Create "123 pickup st"');
   
   userEvent.click(typedElem);//userEvent.type(lastName, profile.lastname);
  const pickupElem = screen.getByText("123 pickup st");
//console.log('pickupElem',pickupElem)
   //userEvent.click(pickUpDate);
  
   userEvent.type(dropOffLocation, '123 dropoff street');
   const typedDropoffElem = screen.getByText('Create "123 dropoff street"');
     userEvent.click(typedDropoffElem);//userEvent.type(lastName, profile.lastname);

  const dropOffElem = screen.getByText("123 dropoff street");

   //userEvent.type(pickUpLocation, '123 pickup st');

  // userEvent.type(lastName, profile.lastname);
   // userEvent.clear(phone);
   // userEvent.type(phone, profile.phone);
//const tst = screen.getAllByRole('option');
//console.log(tst);

//userEvent.click(pickUpLocation);
  const week = await screen.getByText('View Availability');
 // userEvent.selectOptions(pickUpLocation,locations[0].value);
//console.log(pickupElem.value,'next click error',dropOffElem.value);
  const pickUpDate = screen.getByLabelText(PickUpDateAriaLabel['aria-label']);

  const next = screen.getByLabelText('Next');
 // console.log(next)
 //userEvent.t;ype(pickUpDate, new Date().toUTCString());
  // all fields entered so next button should be enabled
  try{
   userEvent.click(next);
  }catch(error){
    console.log('next click error',error);
  }

  //const one = await screen.getByText('1');
  expect ( screen.queryByText('1')).toBeNull();

const agreement = screen.getByLabelText(AgreementAriaLabel['aria-label']);
const agreementSignature = screen.getByLabelText(AgreementSignatureAriaLabel['aria-label']);
const agreementCheckbox = screen.getByLabelText(AgreementCheckboxAriaLabel['aria-label']);
 //  

//click the checkbox and digi sign to be able to advance
userEvent.click(agreementCheckbox);
userEvent.type(agreementSignature,'Test Signature');

  // all fields entered so next button should be enabled
   userEvent.click(next);
   expect ( screen.queryByText('2')).toBeNull();


 //const nameOnCard =  screen.getByText('Name on card');
 //const cardNumber =  screen.getByLabelText('SquarePay');
   const nextnext = screen.getByText('Place order');
    userEvent.click(nextnext);

    screen.getByText('Thank you for your order.')
     expect(useDispatchMock).toHaveBeenCalled();
/*
 // const day = await screen.getAllByText('29')
 
//console.log(day[0],'------',day.length);
  const next = screen.getByLabelText('Next');
      console.log('HTMLButtonElement',next.className);
  const one = await screen.getByText('1')


//expect ( screen.queryByText('1')).toBeNull();

 //const agreementTitle =  screen.getByText('Customer Agreements');




expect ( screen.queryByText('2')).toBeNull();

   /***  user can advance by Paying from the SquarePay Component***/
});


});