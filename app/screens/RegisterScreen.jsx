import { View, Text, Button } from "react-native";

function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Screen Screen</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

export default LoginScreen;