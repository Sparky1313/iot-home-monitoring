import { configureStore } from "@reduxjs/toolkit";
import kitchenReducer from './features/kitchen/kitchenSlice';

export default configureStore({
    reducer: {
        kitchen: kitchenReducer
    }
});