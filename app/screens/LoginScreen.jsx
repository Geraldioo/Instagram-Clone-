import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import images from "../res/images";
import { gql, useMutation } from "@apollo/client";
import AuthContext from "../context/auth";
import * as SecureStore from "expo-secure-store";

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

  console.log(setIsSignedIn, "<< DI LOGIN");

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
      navigation.navigate("Home")
    } catch (error) {
      Alert.alert("Login Failed", error.message);
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
      <View style={Styles.userNameContainer}>
        <TextInput
          onChangeText={(text) => setUsername(text)}
          style={Styles.userNameInput}
          placeholder="username.."
        />
      </View>
      <View style={Styles.passwordContainer}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          style={Styles.passwordInput}
          placeholder="password.."
        />
      </View>
      <View style={Styles.registerContainer}>
        <TouchableOpacity>
          <Text
            onPress={() => {
              navigation.navigate("Register");
            }}
            style={Styles.registerText}
          >
            Don't have account? Register here
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={Styles.loginContainer}
        onPress={() => navigation.navigate("Home")}
        // _signInAsync
      >
        <Text onPress={() => handleLogin()} style={Styles.loginText}>
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
  logoContainer: {
    alignItems: "center",
  },
  userNameContainer: {
    borderColor: "#ececec",
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    //alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  userNameInput: {
    marginStart: 10,
  },
  passwordContainer: {
    borderColor: "#ececec",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    //alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: "#fafafa",
    marginBottom: 20,
  },
  passwordInput: { marginStart: 10 },
  registerContainer: {
    alignItems: "flex-end",
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
