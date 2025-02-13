import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
        isLoggedIn: false,
        token: null,
        expirationDate: null
    },
    reducers: {
        logIn: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token    
            
            let expirationDateFormat = moment(new Date())
            .add(action.payload.expiresIn, 'second')
            .format('YYYY-MM-DD HH:mm:ss');
            state.expirationDate = expirationDateFormat
            
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.token = null
            state.expirationDate = null
        }
    }
})
export const { logIn, logOut } = authenticationSlice.actions
export default authenticationSlice.reducer