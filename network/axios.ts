import axios from 'axios';
const clientID = '51168d6245d5416baffc26c417d01151';
const clientSecretID = 'fa5d91f66bcd4cc2a74237bd0dd31087';
const api_prefix = 'https://accounts.spotify.com/api';
export const dataAxiosinstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    
  },
});
