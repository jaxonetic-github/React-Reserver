// YourComponent.stories.js|jsx

import  Reservations  from './Reservations.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {appReducer} from '../redux/reducers/appReducer'
import {INITIAL_STATE }  from '../constants'
import { ThemeProvider } from '@mui/styles';
import { createMuiTheme } from "@material-ui/core";
import { createTheme } from '@mui/material/styles';

const muitheme = createMuiTheme({
   spacing: [0, 4, 8, 16, 32, 64],
});

const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: "#007bff",
    },
  }
});

const store = createStore(appReducer, INITIAL_STATE)

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docsreact/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Reservations',
  component: Reservations,
};

//👇 We create a “template” of how args map to rendering
//const Template = (args) => <Reservations {...args} />;

export const ReservationsStory = () => <Reservations />
