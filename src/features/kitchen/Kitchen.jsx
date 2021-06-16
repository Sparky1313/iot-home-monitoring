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
    Slider
  } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { 
    Chart,
    PieSeries,
    Title
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';


const useStyles = makeStyles({
    root: {
        // backgroundColor: '#4dc3ff',
        backgroundColor: '#ccefff',
        // color: 'white'
    }
})


  export default function Kitchen(props) {
      const classes = useStyles();
      let toasterSetting = useSelector(state => state.kitchen.toasterSetting);
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
        <Grid justify="center" container>
            <Grid item xs={10} sm={8} md={6} xl={4}>
                <Card className={classes.root} align="center">
                    <CardHeader fontWeight="fontWeightBold" title="Patient Info" />
                    <CardContent>
                        <List>
                            <ListItem>
                                <ListItemText align="center" primary={`Patient Id:\t${useSelector(state => state.kitchen.isToasterOn)}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText align="center" primary={`Patient First Name:\t\t${useSelector(state => state.kitchen.toasterSetting)}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText align="center" primary={`Patient Last Name:\t${useSelector(state => state.kitchen.isOvenOn)}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText align="center" primary={`Patient Date of Birth:\t${useSelector(state => state.kitchen.ovenTemp)}`} />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Link to="/Home">Home</Link>
            {/* <Chart data={chartData}>
                <PieSeries
                    valueField="val"
                    argumentField=""
                />
                <Title text="Toaster Setting" />
            </Chart> */}
            <Grid item xs={10} sm={8} md={6} xl={4}>
                <Slider align="center"
                    defaultValue={toasterSetting}
                    min={1}
                    max={10}
                    step={1}
                    valueLabelDisplay="on"
                    marks={toasterSettingMarks}
                />
            </Grid>
        </Grid>
    )
  }