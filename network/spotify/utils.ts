import axios from 'axios';
export const API_KEY = 'AIzaSyCLzwMbZjjC4HZfMnb5e2g4vVxSHA6thvQ'
export  const authenticate = (form:any,type:'signUp'|'signInWithPassword')=>{
  return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${API_KEY}`,{
    email:form.email,
    password:form.password,
    returnSecureToken:true
  })
}

export const postAlbums = (album: any) => {
  return axios.post(
    'https://react-native-tutorial-493c8-default-rtdb.firebaseio.com/albums.json',
    album,
  );
};
export const getAlbums = () => {
  return axios.get(
    'https://react-native-tutorial-493c8-default-rtdb.firebaseio.com/albums.json',
  );
};
