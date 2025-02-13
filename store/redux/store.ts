import {combineReducers, configureStore} from '@reduxjs/toolkit';
import favReducer from './favorite.js';
import spotifyReducer from './spotify.js';
import authenticationReducer from './authentication.js';
import {slices} from './slices.ts';
export const store = configureStore({
  reducer: {
    spotify:spotifyReducer,
    favorite:favReducer,
    authentication:authenticationReducer
  }
});
