import React from 'react';
import { render, screen, fireEvent,createEvent ,waitFor,act } from '@testing-library/react';

import SignUp from '../signinup/Signup';
import { Routes, Route} from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import {BrowserRouter} from 'react-router-dom';


  describe('Signup Component Test', () => {
//  let signin = null;
  let app = null;
  const signUpObject = { email:'jaxonetic@gmail.com', password:'123456789',  };
 let signup = null;

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

     render(<BrowserRouter><SignUp/></BrowserRouter>);

 
  const passwordField = screen.getByLabelText('Password');

 const emailField =  screen.getByLabelText('EmailAddress');

  const signUnButton = screen.getByLabelText('Submit');
 
 const firstNameField =  screen.getByLabelText('FirstName');

  const lastNameField = screen.getByLabelText('LastName');
 
 const signInLink = screen.getByLabelText(`signInLink`);

});





test('user get error when credentials don\'t match', async () => {
  
     render(<BrowserRouter><SignUp /></BrowserRouter>);

  const passwordField = screen.getByLabelText('Password');
  fireEvent.change(passwordField, {target: {value: '123456789'}})

  const emailField =  screen.getByLabelText('EmailAddress');
  await act(async () =>fireEvent.change(emailField, {target: {value: 'jaxonetic@gmail.com'}}));

  const submitButton = screen.getByLabelText('Submit');
 const signInLink = screen.getByLabelText(`signInLink`);

  userEvent.click(submitButton);
  userEvent.click(signInLink);

});



/**afterAll(() => {
  app.logout();
  expect(app.currentUser ).ToBeNull();
});
*/
});