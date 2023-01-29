import { configureStore,combineReducers } from "@reduxjs/toolkit";
import postSlice from "../slices/post";

const root = combineReducers({
 postSlice
});

const store = configureStore({
    reducer : root,
    devtools : false
})

export default store;