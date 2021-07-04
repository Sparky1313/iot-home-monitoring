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
import { kitchenSlice, setToasterSliderUIVal } from './kitchenSlice';
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


  export default function Kitchen(props) {
    let toasterSetting = useSelector(state => state.kitchen.toasterSetting);
    let isToastDone = useSelector(state => state.kitchen.isToastDone);
    

    const [toasterSliderVal, setToasterSliderVal] = useState(toasterSetting);
    const classes = useStyles();
    const dispatch = useDispatch();
    // let doValsMatch = toasterSliderVal === toasterSetting ? true : false;

    // useEffect( () => {
    //     console.log("use effect was run");
    //     if (toasterSliderVal !== toasterSetting) {
    //         // console.log("inside if statement");
    //         // console.log("Before " + document.getElementById('toaster-slider').value);
    //         document.getElementById('toaster-slider').value = 9;
    //         // console.log("After " + document.getElementById('toaster-slider').value);
    //     }
    // });
      
    //   let toasterTemp = useSelector(state => state.kitchen.toasterSetting);    // In order to update slider with sliding functionality still enable look into creating a helper component that has a MutationOberser and then manipulates the DOM's slider directly.
    //   function updateSliderFromRemoteChange() {
    //     //   if (toasterSetting === $("#toaster-slider").val()) {
    //         //   let val = $("#toaster-slider").val();
    //         let val = document.getElementById('toaster-slider').value;
    //         if (toasterSetting !== toasterSliderVal) {
    //             document.getElementById('toaster-slider').value = toasterSetting;
    //         }
    //         // return console.log(toasterSliderVal);
    //     //   }
    //   };

    //   let toasterRead = updateSliderFromRemoteChange();
      
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
            {
                isToastDone &&
                <Grid item xs={12}>
                    <Alert
                        severity="warning"
                    >
                        Your toast is done!
                        <Button onClick={async (evt) => await PubSub.publish('kitchen/toaster', {"isToastDone": false})}>Clear</Button>
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
            }
            {/* {doValsMatch ? console.log("Do match " + toasterSliderVal + " " + toasterSetting) : console.log("Don't match " + toasterSliderVal + " " + toasterSetting)} */}
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
                                    <ListItemText align="center" primary={`Toasting time left:\t${useSelector(state => state.kitchen.ovenTemp)}`} />
                                </ListItem>
                                {/* <ListItem>
                                    <ListItemText align="center" primary={`Slider Value:\t${toasterSliderVal}`} />
                                </ListItem> */}
                            </List>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
        </Grid>
            {/* <Grid item xs={1} sm={2} md={3} xl={4} />
            <Grid item xs={10} sm={8} md={6} xl={4}>
                <Box pt={2} pb={1} px={1}>
                    <Card className={classes.card} align="center">
                        <CardHeader fontWeight="fontWeightBold" title="Toaster Info" />
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
                                    <ListItemText align="center" primary={`Toasting time left:\t${useSelector(state => state.kitchen.ovenTemp)}`} />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
            <Grid item xs={1} sm={2} md={3} xl={4} /> */}
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
                                defaultValue={useSelector(state => state.kitchen.toasterSetting)}
                                value = {useSelector(state => state.kitchen.toasterSliderUIVal)}
                                min={1}
                                max={10}
                                step={1}
                                valueLabelDisplay="on"
                                marks={toasterSettingMarks}
                                onChange={(evt, value) => dispatch(setToasterSliderUIVal(value))}
                                onChangeCommitted={
                                    async (evt, value) => {
                                        if (value !== toasterSetting) {
                                            await PubSub.publish('kitchen/toaster', {"toasterSetting": value});
                                        }
                                    }
                                }                      
                            />
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
        </Grid>   
        </div>   
    )
  }