import React from 'react';
import { render, screen, fireEvent,createEvent ,waitFor,act } from '@testing-library/react';
import envVars from '../envVars.js';

import SignIn from '../signinup/Signin';
import { Routes, Route} from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import {BrowserRouter} from 'react-router-dom';


  describe('Signin Test', () => {
//  let signin = null;
  let app = null;
  const signInObject = { email:'jaxonetic@gmail.com', password:'123456789',  };
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


test('SignUp displays expected text', async () => {

     render(<BrowserRouter><SignIn/></BrowserRouter>);

 
  const passwordField = screen.getByLabelText('Password');

 const emailField =  screen.getByLabelText('EmailAddress');

  const signInButton = screen.getByLabelText('Submit');
 


 const forgotPwdLink = screen.getByText(/forgot password?/i);
 
 const signUpLink = screen.getByText(`Don't have an account? Sign Up`);

});





test('user get error when credentials don\'t match', async () => {
  
     render(<BrowserRouter><SignIn /></BrowserRouter>);

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



/**afterAll(() => {
  app.logout();
  expect(app.currentUser ).ToBeNull();
});
*/
});