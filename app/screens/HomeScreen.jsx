import { View, Text, Button } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Post Detail" onPress={() => navigation.navigate('PostDetail')} />
      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

export default HomeScreen;