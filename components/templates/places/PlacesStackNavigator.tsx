import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./allPlaces";
import AddPlace from "./addPlace";
import { colors } from "../../../consts/colors";
import { Pressable, Text } from "react-native";
export enum PlacesStackRoutes {
  allPlaces = "AllPlaces",
  addPlace = "AddPlace",
}
const placesNativeStackNavigator = createNativeStackNavigator();
export function PlacesStackNavigator() {
  return (
    <placesNativeStackNavigator.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.colors.secondary },
        headerTintColor: colors.colors.onPrimary,
        contentStyle: {
          backgroundColor: colors.colors.onPrimaryContainer
        }
      }}
    >
      <placesNativeStackNavigator.Screen name={PlacesStackRoutes.allPlaces} component={AllPlaces}

        options={({ navigation }) => (
          {
            title: "Your favorite Places",
            headerRight: ({ tintColor }) => (
              <Pressable onPress={() => navigation.navigate(PlacesStackRoutes.addPlace)}><Text>Add Place</Text></Pressable>
              // <IconButton
              //   iconName={"add"}
              //   size={24}
              //   color={tintColor}
              //   onPressHandler={() => navigation.navigate(PlacesStackRoutes.addPlace)}
              // />
            )

          }
        )} />
      <placesNativeStackNavigator.Screen
        options={{
          title: "Add A new Place"
        }}
        name={PlacesStackRoutes.addPlace} component={AddPlace} />
    </placesNativeStackNavigator.Navigator>
  );
}
//   <PlacesNativeStackNavigator.Screen name={appRoutes.login} component={LoginComponent} />