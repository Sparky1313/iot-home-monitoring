import React, { useState } from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
  withRouter
} from 'react-router-dom';
import {
  AppBar,
  Typography,
  // MenuIcon,
  IconButton,
  Toolbar,
  Button,
  Grid,
  TextField,
  Menu,
  MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import Home from './views/Home';
import Kitchen from './features/kitchen/Kitchen';
import kitchenSlice, { setToasterSetting } from './features/kitchen/kitchenSlice';
import store from './store';
import CustomAppBar from './CustomAppBar';



Amplify.configure({
  Auth: {
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
  }
});

Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: process.env.REACT_APP_REGION,
  aws_pubsub_endpoint: `wss://${process.env.REACT_APP_MQTT_ID}.iot.${process.env.REACT_APP_REGION}.amazonaws.com/mqtt`,
}));

Amplify.PubSub.subscribe('kitchen/toaster').subscribe({
  next: data => {
    console.log('Message received', data);
    console.log("The value is:" + data.value.toasterSetting);

    if (data.value.toasterSetting >= 0) {
      store.dispatch(setToasterSetting(data.value.toasterSetting));
    }
  },
  error: error => console.error(error),
  close: () => console.log('Done'),
});


export default function App(props) {
  return (
    <div>
      <Router>
        <CustomAppBar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/kitchen">
            <Kitchen />
          </Route>
          {/* <Route exact path="/UserProfile">
            <UserProfile />
          </Route>
          <Route exact path="/Appointments">
            <Appointments />
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
}
