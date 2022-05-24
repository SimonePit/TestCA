import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import DetailScreen from "../screens/DetailScreen";

const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor:'blue',
      }}
    >
      <MainStack.Screen name=" Rick & Morty" component={Home} />
      <MainStack.Screen name="DetailScreen" options={({ route }) => ({ title: route.params.selectedItem.name })} component={DetailScreen} />
    </MainStack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};
