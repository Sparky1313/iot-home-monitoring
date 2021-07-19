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
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { kitchenSlice, setToasterSetting, setToasterSliderUIVal, setMillisUntilToastDone, turnOffToasterAlert } from '../../features/kitchen/kitchenSlice';
import Sound from 'react-sound';
import ding from '../../media/Ding-da-ding-ding.mp3';
import { useEffect } from 'react';

export default function ToastCountdown(props) {
    const dispatch = useDispatch();
    const [seconds, setSeconds] = useState(props.millisUntilToastDone / 1000);

    let millisUntilToastDone = useSelector(state => state.kitchen.millisUntilToastDone);
    let secondsUntilToastDone = millisUntilToastDone / 1000;

    useEffect(() => {
        let timer = setInterval(() => {
            if (millisUntilToastDone > 0) {
                dispatch(setMillisUntilToastDone(millisUntilToastDone - 1000));
            } else {
                clearInterval(timer);
            }
        }, 1000);
        
        return () => { clearInterval(timer) };
    });

    return (
        <div>
            {/* <Grid justify="center" container> */}
                <Grid item xs={12}>
                    <Alert
                        severity="warning"
                    >
                        Time until toast is done: {secondsUntilToastDone} seconds
                    </Alert>
                </Grid>
            {/* </Grid> */}
        </div>
    );
}