import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import AllUsers from './allUsers';
import ChatRoom from './chatRoom';
import Register from './register';

export enum appRoutes {
  allUsers = 'AllUsers',
  chatRoom = 'ChatRoom',
  chatRegister = 'ChatRegister',
}
const DynamicDrawer = createDrawerNavigator();

export function ChatDrawerNavigator() {
  return (
    <DynamicDrawer.Navigator initialRouteName={appRoutes.chatRegister}>
      <DynamicDrawer.Screen name={appRoutes.allUsers} component={AllUsers} />
      <DynamicDrawer.Screen name={appRoutes.chatRoom} component={ChatRoom}  />
      <DynamicDrawer.Screen name={appRoutes.chatRegister} component={Register} />
    </DynamicDrawer.Navigator>
  );
}
