import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
// import { RegisterScreen } from "../screens/RegisterScreen";
// import { AddPostScreen } from "../screens/AddPostScreen";
import LoginScreen from "../screens/LoginScreen";
const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;