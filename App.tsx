
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { DynamicStackNavigator } from './navigation/stackNavigation';
import { NavigationContainer } from '@react-navigation/native';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        {/* <FavoriteProductsProvider> */}
        <Provider store={store}>
          <NavigationContainer>
          <DynamicStackNavigator/>
          {/* <StaticAuthenticationStack/> */}
          </NavigationContainer>
        </Provider>
        {/* </FavoriteProductsProvider> */}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
