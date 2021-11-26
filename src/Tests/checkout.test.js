import React from 'react';
import { render, screen, fireEvent,createEvent ,waitFor,act } from '@testing-library/react';

import Checkout from '../checkout/Checkout';

import { Routes, Route} from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import {BrowserRouter} from 'react-router-dom';

import {EmailAriaLabel, ErrorAriaLabel, submitAriaLabel, FirstNameAriaLabel, LastNameAriaLabel,
  PickUpDateAriaLabel, PickUpLocationAriaLabel,DropOffLocationAriaLabel,DropOffDateAriaLabel }  from '../constants'



  describe('Checkout Test', () => {
//  let signin = null;
  let app = null;
 let signin = null;

/*
 beforeAll(() => {
    RealmAppProvider.mockImplementation(() => {
      return {
        login: () => {
          throw new Error('login Test error');
        },
        app:{}
      };
    });
  });
*/

/**
*
*/


test('Checkout displays expected text', async () => {

     render(<BrowserRouter><Checkout/></BrowserRouter>);

 
  const title = screen.getByText('Checkout');
  const dropOffLocation = screen.getByLabelText(DropOffLocationAriaLabel['aria-label']);
  const dropOffDate = screen.getByLabelText(DropOffDateAriaLabel['aria-label']);
  const pickUpLocation = screen.getByLabelText(PickUpLocationAriaLabel['aria-label']);
  const pickUpDate = screen.getByLabelText(PickUpDateAriaLabel['aria-label']);
  const firstName = screen.getByLabelText(FirstNameAriaLabel['aria-label']);
  const next = screen.getByLabelText('Next');

   userEvent.click(next);
   
/** const emailField =  screen.getByLabelText('EmailAddress');

  const signInButton = screen.getByLabelText('Submit');
 const forgotPwdLink = screen.getByText(/forgot password?/i);
 
 const signUpLink = screen.getByText(`Don't have an account? Sign Up`);
*/
});


/*


test('user get error when credentials don\'t match', async () => {
  
     render(<BrowserRouter><Reservations /></BrowserRouter>);

  const passwordField = screen.getByLabelText('Password');
  fireEvent.change(passwordField, {target: {value: '123456789'}})

  const emailField =  screen.getByLabelText('EmailAddress');
  await act(async () =>fireEvent.change(emailField, {target: {value: 'jaxonetic@gmail.com'}}));

  const signInButton = screen.getByLabelText('Submit');
 const forgotPwdLink = screen.getByText(/forgot password?/i); 
 const signUpLink = screen.getByText(`Don't have an account? Sign Up`);

  userEvent.click(signInButton);
  userEvent.click(forgotPwdLink);
  userEvent.click(signUpLink);

});

*/

/**afterAll(() => {
  app.logout();
  expect(app.currentUser ).ToBeNull();
});
*/
});