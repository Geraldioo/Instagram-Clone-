import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import images from "../res/images";
import { gql, useMutation } from "@apollo/client";
import AuthContext from "../context/auth";
import * as SecureStore from "expo-secure-store";
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Colors } from "react-native/Libraries/NewAppScreen";



const LOGIN = gql`
mutation Mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    accessToken
  }
}
`;
export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsSignedIn } = useContext(AuthContext);

  const [login, { error, loading, data }] = useMutation(LOGIN, {
    onCompleted: async (data) => {
      await SecureStore.setItemAsync("accessToken", data?.login.accessToken);
      setIsSignedIn(true);
    },
  });

  const handleLogin = async () => {
    try {
      login({
        variables: { username, password },
      });
    } catch (error) {
      console.log(error, "<< ERR");
      Alert.alert("Error Login");
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.logoContainer}>
        <Image
          source={images.logoBlack}
          style={{ height: 70, resizeMode: "contain" }}
        />
      </View>
      <View style={Styles.mainContainer}>
      <SimpleLineIcons name="user" size={20} color="black" style={Styles.icon} />
        <TextInput
          onChangeText={setUsername}
          value={username}
          style={Styles.mainInput}
          placeholder="username.."
        />
      </View>
      <View style={Styles.mainContainer}>
      <Feather name="lock" size={20} color="black" style={Styles.icon} />
        <TextInput
          onChangeText={setPassword}
          value={password}
          style={Styles.mainInput}
          placeholder="password.."
        />
      </View>
      <View style={Styles.registerContainer}>
        <TouchableOpacity>
          <Text>Dont't Have Account?{" "}
            <Text
              onPress={() => {
                navigation.navigate("Register");
              }}
              style={Styles.registerText}
            >
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={Styles.loginContainer}
        onPress={handleLogin}
      >
        <Text style={Styles.loginText}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 5,
    marginLeft: 10,
  },
  logoContainer: {
    alignItems: "center",
  },
  mainContainer: {
    borderColor: "#ececec",
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
  },
  mainInput: {
    flex: 1,
    marginLeft: 2,
    fontSize: 14,
  },
  registerContainer: {
    alignItems: "flex-end",
    marginTop: 10,
    marginEnd: 20,
    alignContent: "space-between",
  },
  registerText: {
    color: "#0088f8",
  },
  loginContainer: {
    alignItems: "center",
    height: 40,
    marginTop: 30,
    backgroundColor: "#0088f8",
    justifyContent: "center",
    marginStart: 20,
    marginEnd: 20,
    borderRadius: 5,
  },
  loginText: {
    color: "#fff",
  },
});
