import { View, Text, Button } from "react-native";

function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}

export default LoginScreen;