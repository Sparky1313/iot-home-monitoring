import React, { useState } from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect
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
  Menu
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import Home from './views/Home';
import Kitchen from './features/kitchen/Kitchen';



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

Amplify.PubSub.subscribe('doggo').subscribe({
  next: data => console.log('Message received', data),
  error: error => console.error(error),
  close: () => console.log('Done'),
});


export default function App() {
  const [anchorEl, setAnchorEl] = useState(null);


  const handleClose = () => {
    setAnchorEl(null);
  }


  return (
    <div>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className="menubutton" color="inherit" aria-label="menu" onClick={(evt) => setAnchorEl(evt.currentTarget)}>
              <MenuIcon />
            </IconButton>
            <Menu
                id="nav-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
              {/* <MenuItem onClick={handleClose}>Home</MenuItem>
              <MenuItem>
                <Link>Kitchen</Link>
              </MenuItem> */}
              <Link to="/home">Home</Link>
              <Link to="/kitchen">Kitchen</Link>
            </Menu>
            <Typography variant="h6" className="title">
              Home
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
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
