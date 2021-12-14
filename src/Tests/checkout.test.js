/**
 * @jest-environment jsdom
 */
 import React from 'react';
import { render, screen, fireEvent,createEvent ,waitFor,act } from '@testing-library/react';

import Checkout from '../checkout/Checkout';
import { configureStore } from '@reduxjs/toolkit'

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import * as ReactRedux from 'react-redux';
import {appReducer} from '../redux/reducers/appReducer'
import INITIAL_STATE from '../constants.js';

import {AgreementCheckboxAriaLabel,AgreementSignatureAriaLabel,AgreementAriaLabel,EmailAriaLabel, ErrorAriaLabel, submitAriaLabel, FirstNameAriaLabel, LastNameAriaLabel,
  PickUpDateAriaLabel, PickUpLocationAriaLabel,DropOffLocationAriaLabel,DropOffDateAriaLabel }  from '../constants'



  describe('Checkout Test', () => {
//  let signin = null;
  let app = null;
 let signin = null;
 let store;
  const useSelectorMock = jest.spyOn(ReactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

 beforeAll(() => {
     store = configureStore({ reducer: { user: appReducer }, INITIAL_STATE })
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
  const dropOffDate = screen.getByLabelText(DropOffDateAriaLabel['aria-label']);
  const pickUpLocation = screen.getByLabelText(PickUpLocationAriaLabel['aria-label']);
  const pickUpDate = screen.getByLabelText(PickUpDateAriaLabel['aria-label']);
  const firstName = screen.getByLabelText(FirstNameAriaLabel['aria-label']);
  const lastName = screen.getByLabelText(LastNameAriaLabel['aria-label']);
  const emailField = screen.getByLabelText(EmailAriaLabel['aria-label']);
  const next = screen.getByLabelText('Next');
  //console.log(next);


   userEvent.type(phone, profile.phone);
   userEvent.type(emailField, profile.email);
   userEvent.type(firstName, profile.firstname);
   userEvent.type(pickUpLocation, '123 pickup st');
   userEvent.type(dropOffLocation, '123 dropoff st');
   userEvent.type(lastName, profile.lastname);
    userEvent.clear(phone);
    userEvent.type(phone, profile.phone);
  //    console.log(next);
  const one = await screen.getByText('1')

  // all fields entered so next button should be enabled
   userEvent.click(next);
expect ( screen.queryByText('1')).toBeNull();

 const agreementTitle =  screen.getByText('Customer Agreements');
const agreement = screen.getByLabelText(AgreementAriaLabel['aria-label']);
const agreementSignature = screen.getByLabelText(AgreementSignatureAriaLabel['aria-label']);
const agreementCheckbox = screen.getByLabelText(AgreementCheckboxAriaLabel['aria-label']);

//click the checkbox and digi sign to be able to advance
userEvent.click(agreementCheckbox);
userEvent.type(agreementSignature,'Test Signature');

  // all fields entered so next button should be enabled
   userEvent.click(next);

    const nameOnCard =  screen.getByText('Name on card');
expect ( screen.queryByText('2')).toBeNull();

   /***  user can advance by Paying from the SquarePay Component***/
});


});