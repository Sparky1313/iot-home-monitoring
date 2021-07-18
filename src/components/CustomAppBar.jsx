import React, { useState } from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Button,
  Grid,
  TextField,
  Menu,
  MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LoginButton from '../components/LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";

function CustomAppBar(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const { error, user, isAuthenticated, isLoading } = useAuth0();
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getPageName = () => {
        if (props.location.pathname.length === 1) {
            return;
        }

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
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                {/* <LogoutButton /> */}
                {console.log("User: " + user + "\nAuthenticated: " + isAuthenticated + "\nIsLoading: " + isLoading +  "\nError: " + error)}
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(CustomAppBar);
