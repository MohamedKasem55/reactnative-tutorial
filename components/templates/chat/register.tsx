import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { appRoutes } from '../../../navigation/stackNavigation'
import { useNavigation } from '@react-navigation/native';
import { authenticate } from '../../../network/spotify/utils';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../../store/redux/authentication';
import { Icon, MD3Colors, useTheme } from 'react-native-paper';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth, database } from '../../../config/firebase.config';
import { addDoc, collection } from 'firebase/firestore';

function Register() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch()
  const theme = useTheme();
  const authenticationState = useSelector((state: any) => state.authentication)
  const [loginForm, setLoginForm] = useState<any>({
    name: "",
    email: "",
    password: "",
    avatar: "https://i.pravatar.cc/300",
  })
  const handleSignupPress = async () => {
    let isSignupSuccess = await signup();
    if(isSignupSuccess)
    await signUpToChatApp()
  }
  const signup = async () => {
    let type: "signUp" | "signInWithPassword" = true ? "signUp" : "signInWithPassword"
    let authResponse = await authenticate(loginForm, type)
    return authResponse.status === 200
  }
  const signUpToChatApp = async () => {
    let registeredData = {
      ...loginForm,
      chatRoomsIds: []
    }
    console.log(registeredData);
    let response = await addDoc(collection(database, "users"), registeredData)
    console.log(response);

  }
  return (
    <View style={styles.mainWrapper}>

      <View style={styles.formWrapper}>
        <TextInput placeholder='Enter Name' style={styles.formField}
          onChangeText={(text) => setLoginForm({ ...loginForm, name: text })}
        />
        <TextInput placeholder='Enter Email' style={styles.formField}
          onChangeText={(text) => setLoginForm({ ...loginForm, email: text })}
        />
        <TextInput placeholder='Enter Password' style={styles.formField}
          onChangeText={(text) => setLoginForm({ ...loginForm, password: text })}
        />
        <Button title='Sign up for chat App' onPress={handleSignupPress} />
      </View>
      {/* <Formik
        initialValues={{ email: '' }}
        onSubmit={values => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <Button onPress={() => handleSubmit} title="Submit" />
          </View>
        )}
      </Formik> */}
    </View>

  )
}

export default Register

export const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: "#e6f7ff",
    padding: 50,
    flex: 1
  },
  formWrapper: {
    // borderColor:"lightgray",
    // borderWidth:1,
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    rowGap: 10
  },
  formField: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 5
  }
})