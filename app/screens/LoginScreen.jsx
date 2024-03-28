import { View, Text, Button } from "react-native";

function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Screen</Text>
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default LoginScreen;