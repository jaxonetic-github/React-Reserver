// YourComponent.stories.js|jsx

import  Profile  from './Profile.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {appReducer} from '../redux/reducers/appReducer'
import {INITIAL_STATE }  from '../constants'


const store = createStore(appReducer, INITIAL_STATE)

//๐ This default export determines where your story goes in the story list
export default {
  /* ๐ The title prop is optional.
  * See https://storybook.js.org/docsreact/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Profile',
  component: Profile,
};

const Template = args => <Profile {...args} />;


//๐ We create a โtemplateโ of how args map to rendering
//const Template = (args) => <Reservations {...args} />;

export const Story_Profile = Template.bind({});
