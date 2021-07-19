import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
    AppBar,
    Typography,
    // MenuIcon,
    IconButton,
    Toolbar,
    Button,
    Grid,
    TextField,
    Table,
    makeStyles,
    TableContainer,
    TableHead,
    TableCell,
    List,
    ListItem,
    ListItemText,
    Card,
    CardHeader,
    CardContent,
    Slider,
    Box
  } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Chart,
    PieSeries,
    Title
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { kitchenSlice, setToasterSetting, setToasterSliderUIVal, turnOffToasterAlert } from './kitchenSlice';
import { PubSub } from 'aws-amplify';
import {$, jquery} from 'jquery';
import { SortRounded } from '@material-ui/icons';
import Sound from 'react-sound';
import ding from '../../media/Ding-da-ding-ding.mp3';
import { useEffect, createRef } from 'react';


const useStyles = makeStyles({
    root: {
        // backgroundColor: '#4dc3ff',
        padding: 8
        // color: 'white'
    },
    card: {
        backgroundColor: '#ccefff',
        // padding: 8
    }
});

const theme = {
    spacing: 8
}

const PUBLISH_TOPIC_NAME = 'cmd/smart-house/kitchen/toaster/req';


  export default function Kitchen(props) {
    let toasterSetting = useSelector(state => state.kitchen.toasterSetting);
    let isToasterOn = useSelector(state => state.kitchen.isToasterOn);
    let isToastDone = useSelector(state => state.kitchen.isToastDone);
    

    const [toasterSliderVal, setToasterSliderVal] = useState(toasterSetting);
    const classes = useStyles();
    const dispatch = useDispatch();
      
    const toasterSettingMarks = [
        {
            value: 1,
            label: '1'
        },
        {
            value: 2,
            label: '2'
        },
        {
            value: 3,
            label: '3'
        },
        {
            value: 4,
            label: '4'
        },
        {
            value: 5,
            label: '5'
        },
        {
            value: 6,
            label: '6'
        },
        {
            value: 7,
            label: '7'
        },
        {
            value: 8,
            label: '8'
        },
        {
            value: 9,
            label: '9'
        },
        {
            value: 10,
            label: '10'
        }
    ];

    return (
        <div>
            <Grid justify="center" container>
                <Grid item xs={10} sm={8} md={6} xl={4}>
                    <Box pt={2} pb={1} px={1}>
                        <Card className={classes.card} align="center">
                            <CardHeader fontWeight="fontWeightBold" title="Toaster Overview" />
                            <CardContent>
                                <List>
                                    <ListItem>
                                        <ListItemText align="center" primary={`Toaster On:\t${useSelector(state => state.kitchen.isToasterOn)}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText align="center" primary={`Toaster Setting:\t\t${useSelector(state => state.kitchen.toasterSetting)}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText align="center" primary={`Toast Done:\t${useSelector(state => state.kitchen.isToastDone)}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText align="center" primary={`Toasting time left:\t${useSelector(state => state.kitchen.millisUntilToastDone) / 1000} seconds`} />
                                    </ListItem>
                                </List>
                                <Button 
                                    onClick={
                                        async (evt, value) => {
                                            await PubSub.publish(PUBLISH_TOPIC_NAME, {"startToasting": true, "toasterSetting": toasterSetting}); // Add in something so that if this fails that another dispatch is called to change ui back to what it was.  Add in other error handling, too.
                                        }
                                    }
                                >
                                Start Toasting!
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
                {/* <button type="button" onClick={updateSliderFromRemoteChange}>Update</button> */}
                {/* <Link to="/Home">Home</Link> */}
                {/* <Chart data={chartData}>
                    <PieSeries
                        valueField="val"
                        argumentField=""
                    />
                    <Title text="Toaster Setting" />
                </Chart> */}
            <Grid justify="center" container>
                <Grid item xs={10} sm={8} md={6} xl={4} m={4}>
                    <Box p={1}>
                        <Card className={classes.card} align="center">
                            <CardHeader fontWeight="fontWeightBold" title="Toaster Setting" />
                            <CardContent>
                                <Slider id="toaster-slider"
                                    align="center"
                                    disabled={isToasterOn}
                                    defaultValue={useSelector(state => state.kitchen.toasterSetting)}
                                    value = {useSelector(state => state.kitchen.toasterSliderUIVal)}
                                    min={1}
                                    max={10}
                                    step={1}
                                    valueLabelDisplay="on"
                                    marks={toasterSettingMarks}
                                    onChange={(evt, value) => dispatch(setToasterSliderUIVal(value))}
                                    onChangeCommitted={
                                        (evt, value) => {
                                            if (value !== toasterSetting && isToasterOn === false) {
                                                dispatch(setToasterSetting(value));
                                            }
                                        }
                                        // async (evt, value) => {
                                        //     if (value !== toasterSetting) {
                                        //         await PubSub.publish(PUBLISH_TOPIC_NAME, {"toasterSetting": value}); // Add in something so that if this fails that another dispatch is called to change ui back to what it was.  Add in other error handling, too.
                                        //     }
                                        // }
                                    }                    
                                />
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </div>   
    );
  }