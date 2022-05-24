import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { NativeBaseProvider, Text, Box } from 'native-base';


export default function App() {
  console.log("APP START")
  return (
    <NativeBaseProvider>
      <AppNavigator />
    </NativeBaseProvider>
  );
}
