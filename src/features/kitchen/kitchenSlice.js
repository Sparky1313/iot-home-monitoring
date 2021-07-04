import { 
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';


export const kitchenSlice = createSlice({
    name: 'kitchen',
    initialState: {
        isToasterOn: false,
        toasterSetting: 1,
        isToastDone: false,
        isOvenOn: false,
        ovenTemp: 0
    },
    reducers: {
        turnOnToaster: (state) => {state.isToasterOn = true},
        turnOffToaster: (state) => {state.isToasterOn = false},
        setToasterSetting: (state, action) => {state.toasterSetting = action.payload},
        turnOnToasterAlert: (state) => {state.isToastDone = true},
        turnOffToasterAlert: (state) => {state.isToastDone = false},
        
        turnOnOven: (state) => {state.isOvenOn = true},
        turnOffOven: (state) => {state.isOvenOn = false},
        setOvenTemp: (state, action) => {state.ovenTemp = action.payload},
    }
});


export const { turnOnToaster, turnOffToaster, setToasterSetting, turnOnToasterAlert, turnOffToasterAlert, turnOnOven, turnOffOven, setOvenTemp } = kitchenSlice.actions;
export default kitchenSlice.reducer;