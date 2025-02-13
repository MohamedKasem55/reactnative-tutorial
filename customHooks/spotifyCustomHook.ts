import axios, {AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {INewToken, search} from '../network/spotify/spotifyNetwork';
import {slices} from '../store/redux/slices';
import moment from 'moment';
import { postAlbums } from '../network/spotify/utils';
import { setExpirationDate, setToken } from '../store/redux/spotify';
const clientID = '51168d6245d5416baffc26c417d01151';
const clientSecretID = 'fa5d91f66bcd4cc2a74237bd0dd31087';
const api_prefix = 'https://accounts.spotify.com/api';

export const useSpotifyToken = () => {
  const tokenState = useSelector((state: any) => state.spotify);  
  const dispatch = useDispatch();
  const fetchToken = async () => {
    let tokenResponse: AxiosResponse<INewToken> = await axios({
      baseURL: `${api_prefix}/token`,
      method: 'POST',
      data: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecretID}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const {access_token,expires_in} = tokenResponse.data;
    console.log("fetching");
    
    dispatch(setToken(access_token))
    let expirationDateFormat = moment(new Date())
      .add(tokenResponse.data.expires_in, 'second')
      .format('YYYY-MM-DD HH:mm:ss');
    dispatch(setExpirationDate(expirationDateFormat));
  };
  useEffect(() => {
    if (
      tokenState?.token === '' ||
      tokenState?.expirationDate === '' ||
      new Date() >= new Date(tokenState?.expirationDate)
    ) {
      fetchToken();
    }
  }, []);
};
