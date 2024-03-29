import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import palette from "../res/palette";
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";
import colors from "../res/colors";
import images from "../res/images";
import StoryListItem from "../components/StoryListItem";

const data = [{ key: "1" }];

export default function ProfileScreen() {
  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.bottomBackGround }}
      /*<ProfileHeader />
      <UserBio />
      <EditProfileButton />
      <ConstantStories />
      <LineSeperator />
      <ProfileGrid />*/
      data={data}
      renderItem={() => (
        <>
          <View style={Styles.container}>
            <TouchableOpacity>
              <Image
                source={{ uri: "https://picsum.photos/600" }}
                style={Styles.prfilePicture}
              />
            </TouchableOpacity>

            <View style={Styles.container2}>
              <View style={Styles.container3}>
                <TouchableOpacity>
                  <Text style={Styles.numberContainer}>10</Text>
                  <Text style={Styles.text}>Posts</Text>
                </TouchableOpacity>
              </View>
              <View style={Styles.container3}>
                <TouchableOpacity>
                  <Text style={Styles.numberContainer}>160</Text>
                  <Text style={Styles.text}>Followers</Text>
                </TouchableOpacity>
              </View>
              <View style={Styles.container3}>
                <TouchableOpacity>
                  <Text style={Styles.numberContainer}>100</Text>
                  <Text style={Styles.text}>Following</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              marginStart: 10,
              marginTop: 20,
            }}
          >
            <View style={{ marginBottom: 5 }}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                John Doe
              </Text>
            </View>
            <View style={{ marginBottom: 5 }}>
              <Text style={{ color: "white" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flex: 1,
                  height: 30,
                  borderRadius: 5,
                  marginStart: 10,
                  marginEnd: 10,
                  backgroundColor: "#000",
                  justifyContent: "center",
                  borderColor: "#262626",
                  borderWidth: 1,
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "white" }}>Edit Profile</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <ScrollView horizontal={true}>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                marginStart: 10,
                marginEnd: 10,
                marginTop: 10,
                marginBottom: 5,
                alignItems: "center",
              }}
            >
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: colors.bottomBackGround,
                    width: 64,
                    height: 64,
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "#262626",
                  }}
                >
                  <Image
                    source={images.addIcon}
                    style={{ width: 20, height: 20, borderRadius: 100 }}
                  />
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  marginTop: 5,
                }}
              >
                New
              </Text>
            </View>
            <StoryListItem name="Holiday" />
          </ScrollView>
          {/* 
       
          <ConstantStories />
          <LineSeperator />
          <GridIcon />
          <ProfileGrid /> */}
        </>
      )}
    />
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  prfilePicture: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginLeft: 20,
  },
  numberContainer: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 15,
  },
  container2: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    marginEnd: 20,
  },
  text: {
    color: "white",
    //fontWeight: 'bold',
    alignSelf: "center",
  },
  container3: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
  },
});
