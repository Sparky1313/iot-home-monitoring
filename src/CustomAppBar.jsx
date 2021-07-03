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


function CustomAppBar(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getPageName = () => {
        let pageName = '';
        let pageNameWords = props.location.pathname.substring(1).split('-');
        
        for (let word of pageNameWords) {
            pageName += word[0].toUpperCase() + word.substring(1) + ' ';
        }

        return pageName.substring(0, pageName.length - 1);
    };

    return (
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
                    <MenuItem component={Link} to="/home">
                    Home
                    </MenuItem>
                    <MenuItem component={Link} to="/kitchen">
                    Kitchen
                    </MenuItem>
                </Menu>
                <Typography variant="h6" className="title">
                    {getPageName()}
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(CustomAppBar);
