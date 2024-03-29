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
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  return (
    <View style={Styles.container}>
      <View style={Styles.logoContainer}>
        <Image
          source={images.logoBlack}
          style={{ height: 70, resizeMode: "contain" }}
        />
      </View>
      <View style={Styles.mainContainer}>
        <FontAwesome5 name="user" size={20} color="#333" style={Styles.icon} />
        <TextInput
          onChangeText={(text) => setUsername(text)}
          style={Styles.mainInput}
          placeholder="name.."
        />
      </View>
      <View style={Styles.mainContainer}>
        <SimpleLineIcons name="user" size={20} color="black" style={Styles.icon} />
        <TextInput
          onChangeText={(text) => setUsername(text)}
          style={Styles.mainInput}
          placeholder="username.."
        />
      </View>
      <View style={Styles.mainContainer}>
        <Fontisto name="email" size={20} color="black" style={Styles.icon} />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          style={Styles.mainInput}
          placeholder="email.."
        />
      </View>
      <View style={Styles.mainContainer}>
      <Feather name="lock" size={20} color="black" style={Styles.icon} />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          style={Styles.mainInput}
          placeholder="password.."
        />
      </View>
      <View style={Styles.registerContainer}>
        <TouchableOpacity>
          <Text>
            Already Have Account?{" "}
            <Text
              onPress={() => {
                navigation.navigate("Login");
              }}
              style={Styles.registerText}
            >
              Login here
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={Styles.loginContainer}
        onPress={() => navigation.navigate("Home")}
        // _signInAsync
      >
        <Text onPress={() => handleLogin()} style={Styles.loginText}>
          Sign Up
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
