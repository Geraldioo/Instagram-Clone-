import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import RegisterScreen from "../screens/RegisterScreen";
// import { AddPostScreen } from "../screens/AddPostScreen";
import LoginScreen from "../screens/LoginScreen";
import { useState } from "react";
const Stack = createNativeStackNavigator();
import * as SecureStorage from "expo-secure-store";
import AuthContext from "../context/auth";
import { CommentScreen } from "../screens/CommentScreen";
import colors from "../res/colors";
import DetailScreen from "../screens/DetailPostScreen";
import ProfileScreen from "../screens/MyProfileScreen";
import ProfileScreen2 from "../screens/AnotherProfileScreen";
import FollowDetail from "../screens/FollowingDetail";
import FollowDetail2 from "../screens/FollowersDetail";


function StackNavigator() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  (async () => {
    const accessToken = await SecureStorage.getItemAsync("accessToken");
    // console.log(isSignedIn, "<<<");
    if (accessToken) {
      setIsSignedIn(true);
    }
  })();

  console.log(isSignedIn, "<= Status Login");
  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <Stack.Navigator>
        {!isSignedIn ? (
          <>
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />

            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Comments"
              component={CommentScreen}
            />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
            />
            <Stack.Screen
              name="My Profile"
              component={ProfileScreen}
            />
            <Stack.Screen
              name="User Profile"
              component={ProfileScreen2}
            />
            <Stack.Screen
              name="Following Detail"
              component={FollowDetail}
            />
            <Stack.Screen
              name="Followers Detail"
              component={FollowDetail2}
            />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}

export default StackNavigator;
