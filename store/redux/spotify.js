import { createSlice } from '@reduxjs/toolkit';
import { slices } from './slices';

const spotifySlice = createSlice({
  name: "spotify",
  initialState: {
    token: "",
    expirationDate: ""
  },

  reducers: {
    setToken: (state, action) => { 
      // await AsyncStorage.setItem("token",action.payload.token)
      state.token = action.payload;
     },
    setExpirationDate: (state, action) => { 
      // await AsyncStorage.setItem("expirationDate",action.payload.expirationDate)      
      state.expirationDate = action.payload 
    }
  },
});

export const {setToken,setExpirationDate} = spotifySlice.actions 
export default spotifySlice.reducer;
