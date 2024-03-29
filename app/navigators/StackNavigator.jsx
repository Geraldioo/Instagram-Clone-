import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import RegisterScreen from "../screens/RegisterScreen";
// import { AddPostScreen } from "../screens/AddPostScreen";
import LoginScreen from "../screens/LoginScreen";
import { useState } from "react";
const Stack = createNativeStackNavigator();
import * as SecureStorage from "expo-secure-store";
import AuthContext from "../context/auth";

function StackNavigator() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  (async () => {
    const accessToken = await SecureStorage.getItemAsync("accessToken");
    // console.log(isSignedIn, "<<<");
    if (accessToken) {
      setIsSignedIn(true);
    }
  })();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>

    // <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
    //   <Stack.Navigator>
    //     {!isSignedIn ? (
    //       <>
    //       <Stack.Screen name="Register" component={RegisterScreen} />
    //         <Stack.Screen
    //           name="Login"
    //           options={{ headerShown: false }}
    //           component={LoginScreen}
    //         />
    //       </>
    //     ) : (
    //       <>
    //         <Stack.Screen
    //           name="Home"
    //           component={TabNavigator}
    //           options={{ headerShown: false }}
    //         />
    //       </>
    //     )}
    //   </Stack.Navigator>
    // </AuthContext.Provider>
  );
}

export default StackNavigator;
