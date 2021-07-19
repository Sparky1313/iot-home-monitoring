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
import { useDispatch, useSelector } from 'react-redux';
import { kitchenSlice, setToasterSetting, setToasterSliderUIVal, turnOffToasterAlert } from '../features/kitchen/kitchenSlice';
import ToastDoneAlert from './alerts/ToastDoneAlert';
import ToastCountdown from './alerts/ToastCountdown';


export default function AlertsBar(props) {
  const dispatch = useDispatch();

  let isToastDone = useSelector(state => state.kitchen.isToastDone);
  let isToasterOn = useSelector(state => state.kitchen.isToasterOn);

  return (
    <div>
      <Grid item xs={12}>
        { isToastDone && <ToastDoneAlert /> }
      </Grid>
      <Grid item xs={12}>
        { isToasterOn && !isToastDone && <ToastCountdown /> }
      </Grid>
    </div>
  );
}