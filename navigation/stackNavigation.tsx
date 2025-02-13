import * as React from 'react';
import { createStaticNavigation, LinkingOptions, NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import LoginComponent from '../components/templates/loginPage/loginComponent';
import Products from '../components/templates/products/products-component';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Songs from '../components/templates/songs/songs-component';
import Home from '../components/templates/home/home.component';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import {  DrawerStack } from './drawerNavigation';

export enum appRoutes {
  login = "Login",
  products = "Products",
  songs = "Songs",
  home = "Home",
  favProducts = "FavProducts",
  drawerNavigation = "DrawerNavigation",
}
// export const StaticAuthenticationStack = createNativeStackNavigator({
//   initialRouteName: appRoutes.login,
//   screenOptions: {
//     headerStyle: { backgroundColor: 'white' },
//   },
//   screens: {
//     [appRoutes.login]: {
//       screen:LoginComponent,
//       options: {
//         title: 'Overview',
//       },
//     },
//     [appRoutes.drawerNavigation]: {
//       screen:DrawerNavigation,
//     },

//   },
// });

const dynamicStackNavigation = createNativeStackNavigator();
export function DynamicStackNavigator() {
  const isLoggedIn = useSelector((state: any) => state.authentication.isLoggedIn)
  return (
    <dynamicStackNavigation.Navigator
    initialRouteName={true ? appRoutes.drawerNavigation : appRoutes.login}
    >
      <dynamicStackNavigation.Screen name={appRoutes.login} component={LoginComponent} initialParams={{ signup: false }} options={{headerShown:false}}  />
      <dynamicStackNavigation.Screen name={appRoutes.drawerNavigation} component={DrawerStack} options={{headerShown:false}} />
    </dynamicStackNavigation.Navigator>
  );
}
