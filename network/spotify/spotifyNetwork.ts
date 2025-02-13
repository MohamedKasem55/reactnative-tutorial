// import base64 from 'react-native-base64';

const clientID = '51168d6245d5416baffc26c417d01151';
const clientSecretID = 'fa5d91f66bcd4cc2a74237bd0dd31087';
const api_prefix = 'https://accounts.spotify.com/api';
// const base64Credentials = base64.encode(clientID+":"+clientSecretID)
export const fetchNewToken = async () => {
  const response = await fetch(`${api_prefix}/token`, {
    method: 'POST',
    headers: {
      // Authorization:`Basic ${base64Credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    // body:'grant_type=client_credentials'
    body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecretID}`,
  })
  if(response.ok)
    return response.json()
};
export const search = async (token:string,searchInput:string) => {
let type = "album"
let headers = new Headers()
headers.append("Authorization",`Bearer ${token}`)
const response = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=${type}`, {
  method: 'GET',
  headers,
})
if(response.ok)
  return response.json()
};
export const fetchArtist = (token: string) => {
  console.log(token);
  let headers = new Headers();
  headers.append(
    'Authorization',
    `Bearer BQBMgebCg2k1cC7MVkFDoL8kNVX_17UIuHRQ6nH0mC7T556bk6F48uv1yikqnmpFUrt27FzdFXqk_EcMdgkjGOZ4fCKJHR_ezX14WjZjk2VU1hXvVpWPTTYWFcDVaGZTZrBTdsphYF4`,
  );
  headers.append('Content-Type', 'application/x-www-form-urlencoded',);
  // headers.append('Accept', `*/*`);
  // headers.append('Accept-Encoding', `gzip, deflate, br`);
  // headers.append('Connection', `keep-alive`);
  // headers.append('Content-Type', 'application/json');
  console.log(headers);
  try {
    fetch('https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb', {
      method: 'GET',
      headers,
    })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
export interface INewToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}
