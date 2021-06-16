import { 
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';


export const kitchenSlice = createSlice({
    name: 'kitchen',
    initialState: {
        isToasterOn: false,
        toasterSetting: 1,
        isOvenOn: false,
        ovenTemp: 0
    },
    reducers: {
        turnOnToaster: (state) => state.isToasterOn = true,
        turnOffToaster: (state) => state.isToasterOn = false,
        setToasterSetting: (state, action) => state.toasterSetting = action.payload,
        
        turnOnOven: (state) => state.isOvenOn = true,
        turnOffOven: (state) => state.isOvenOn = false,
        setOvenTemp: (state, action) => state.ovenTemp = action.payload,
    }
});


export const { signedIn, signedOut } = kitchenSlice.actions;
export default kitchenSlice.reducer;