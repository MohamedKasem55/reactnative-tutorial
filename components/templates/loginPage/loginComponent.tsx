import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, ImageBackground, Pressable, Text, TextInput, View } from 'react-native'
import { styles } from './loginComponent.style'
import { appRoutes } from '../../../navigation/stackNavigation'
import { useNavigation } from '@react-navigation/native';
import { authenticate } from '../../../network/spotify/utils';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../../store/redux/authentication';
import { Icon, MD3Colors, useTheme } from 'react-native-paper';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth } from '../../../config/firebase.config';

function LoginComponent(props: { route: any }) {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch()
  const theme = useTheme();
  const authenticationState = useSelector((state: any) => state.authentication)
  const [loginForm, setLoginForm] = useState<any>({
    ...(props.route.params.signup && { username: "" }),
    email: "",
    password: "",
    ...(props.route.params.signup && { confirmPassword: "" }),
  })
  useLayoutEffect(() => {
    navigation.setOptions({
      title: props.route.params.signup ? "Sign Up Form" : "Sign In Form"
    })
  }, [props.route.params.signup])
  const shouldUseAuthFromFirebaseLibrary = true
  const handleLoginPress = async () => {
    // navigation.navigate(appRoutes.products);
    if (props.route.params.signup) {
      navigation.setParams({ signup: false })
    } else {
      let type: "signUp" | "signInWithPassword" = props.route.params.signup ? "signUp" : "signInWithPassword"
      if (shouldUseAuthFromFirebaseLibrary) {
        if (loginForm.email !== "" && loginForm.password !== "") {
          let authResponse: UserCredential = await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
          console.log(authResponse);
          dispatch(logIn({ token: authResponse.user.refreshToken, expiresIn: 600}))
          navigation.navigate(appRoutes.drawerNavigation, { screen: appRoutes.home });
        }
      }
      else {

        if (loginForm.email !== "" && loginForm.password !== "") {
          let authResponse = await authenticate(loginForm, type)
          if (authResponse.status === 200) {
            navigation.navigate(appRoutes.drawerNavigation, { screen: appRoutes.home });
            dispatch(logIn({ token: authResponse.data.refreshToken, expiresIn: authResponse.data.expiresIn }))
            console.log(authenticationState);
          }
        }
      }
    }
  }
  const handleSignupPress = async () => {
    if (!props.route.params.signup) {
      navigation.setParams({ signup: true })
    } else {
      if (loginForm.email !== "" && loginForm.password !== "" && loginForm.confirmPassword !== "" && loginForm.password === loginForm.confirmPassword) {
        if(shouldUseAuthFromFirebaseLibrary){
          let authResponse: UserCredential = await createUserWithEmailAndPassword(auth, loginForm.email, loginForm.password)
          console.log(authResponse);
          // dispatch(logIn({ token: authResponse.data.refreshToken, expiresIn: 3600 }))
          // navigation.navigate(appRoutes.drawerNavigation, { screen: appRoutes.home });
        }else{
          let type: "signUp" | "signInWithPassword" = props.route.params.signup ? "signUp" : "signInWithPassword"        
          let authResponse = await authenticate(loginForm, type)        
          if (authResponse.status === 200) {
            dispatch(logIn({ token: authResponse.data.refreshToken, expiresIn: authResponse.data.expiresIn }))
            navigation.navigate(appRoutes.drawerNavigation, { screen: appRoutes.home });
          }
        }
      }
    }
  }
  return (
    <ImageBackground source={require('./../../../assets/images/background.jpg')} resizeMode="cover" style={styles.mainWrapper}>

      <View style={styles.formWrapper}>
        {props.route.params.signup &&
          <TextInput placeholder='Enter Username' style={styles.formField}
            onChangeText={(text) => setLoginForm({ ...loginForm, username: text })}
          />
        }
        <TextInput placeholder='Enter email' style={styles.formField}
          onChangeText={(text) => setLoginForm({ ...loginForm, email: text })}
        />
        <TextInput placeholder='Enter Password' secureTextEntry={true} style={styles.formField}
          onChangeText={(text) => setLoginForm({ ...loginForm, password: text })}
        />
        {props.route.params.signup &&
          <TextInput placeholder='Enter confirmed password' style={styles.formField}
            onChangeText={(text) => setLoginForm({ ...loginForm, confirmPassword: text })}
          />
        }
        <Button title='login' color={theme.colors.primary} onPress={handleLoginPress} disabled={(!loginForm.email || !loginForm.password) && !props.route.params.signup} />
        <Button title='Sign up for a new Account' color={theme.colors.secondary} onPress={handleSignupPress} disabled={(!loginForm.email || !loginForm.password) && props.route.params.signup} />
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
    </ImageBackground>

  )
}

export default LoginComponent