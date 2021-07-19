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
import { kitchenSlice, setToasterSetting, setToasterSliderUIVal, turnOffToasterAlert } from '../../features/kitchen/kitchenSlice';
import Sound from 'react-sound';
import ding from '../../media/Ding-da-ding-ding.mp3';

export default function ToastDoneAlert(props) {
    const dispatch = useDispatch();

    return (
        <div>
            {/* <Grid justify="center" container> */}
                <Grid item xs={12}>
                    <Alert
                        severity="warning"
                    >
                        Your toast is done!
                        <Button onClick={(evt) => dispatch(turnOffToasterAlert())}>Clear</Button> {/* Make an alerts component */}
                        <Sound
                            url={ding}
                            playStatus={Sound.status.PLAYING}
                            // playFromPosition={300}
                            // onLoading={handleSongLoading}
                            // onPlaying={handleSongPlaying}
                            // onFinishedPlaying={this.handleSongFinishedPlaying}
                            loop={true}
                        />
                    </Alert>
                </Grid>
            {/* </Grid> */}
        </div>
    );
}