import * as React from 'react';
import { Button, View } from 'react-native';
import {
  createStaticNavigation,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import LoginComponent from '../components/templates/loginPage/loginComponent';
import Products from '../components/templates/products/products-component';
import Songs from '../components/templates/songs/songs-component';
import { DynamicStackNavigator } from './stackNavigation';
import { Icon, IconButton, MD3Colors, useTheme } from 'react-native-paper';
import Home from '../components/templates/home/home.component';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/redux/authentication';
import AllPlaces from '../components/templates/places/allPlaces';
import { PlacesStackNavigator } from '../components/templates/places/PlacesStackNavigator';
import ChatRoom from '../components/templates/chat/chatRoom';
import { ChatDrawerNavigator } from '../components/templates/chat/chatNavigation';

export enum appRoutes {
  login = "Login",
  staticstackNavigation = "StaticStackNavigation",
  dynamicstackNavigation = "DynamicStackNavigation",
  songs = "Songs",
  products = "Products",
  home = "Home",
  favProducts = "FavProducts",
  drawerNavigation = "DrawerNavigation",
  places = "PlacesStackNavigator",
  chatDrawerNavigator = "ChatDrawerNavigator",
}
const DynamicDrawer = createDrawerNavigator();

export function DrawerStack() {
  const theme = useTheme()
  return (
    <DynamicDrawer.Navigator
      initialRouteName={appRoutes.chatDrawerNavigator}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ drawerStyle: { backgroundColor: theme.colors.surfaceVariant }, swipeEnabled: true }}
    >
      <DynamicDrawer.Screen name={appRoutes.home} component={Home} />
      <DynamicDrawer.Screen name={appRoutes.products} component={Products} />
      <DynamicDrawer.Screen name={appRoutes.favProducts} component={Products} initialParams={{ isFavScreen: true }} />
      <DynamicDrawer.Screen name={appRoutes.login} component={LoginComponent} />
      <DynamicDrawer.Screen name={appRoutes.songs} component={Songs} />
      <DynamicDrawer.Screen name={appRoutes.places} component={PlacesStackNavigator} />
      <DynamicDrawer.Screen name={appRoutes.chatDrawerNavigator} component={ChatDrawerNavigator} />
    </DynamicDrawer.Navigator>
  );
}
export const CustomDrawerContent = (props: any) => {
  const dispatch = useDispatch()
  const navigation = useNavigation<any>()
  const logout = () => {
    dispatch(logOut());
    navigation.replace(appRoutes.login)
  }
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log out"
        onPress={logout}
      />
    </DrawerContentScrollView>
  );
}
// export function DrawerNavigation() {
//   return (<NavigationContainer>
//     <DrawerStack />
//   </NavigationContainer>)
// }
