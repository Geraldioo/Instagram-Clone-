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
// import { useRoute } from "@react-navigation/native";

const data1 = [{key: '1'}];
const data = [
  {key: '1'},
  {key: '2'},
  {key: '3'},
  {key: '4'},
  {key: '5'},
  {key: '6'},
  /*{key: '7'},
  {key: '8'},
  {key: '9'},
  {key: '10'},
  {key: '11'},
  {key: '12'},
  {key: '13'},
  {key: '14'},*/
];
function Test() {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => console.log('Pressed Profile Grid Image')}>
        <Image
          source={{uri: 'https://picsum.photos/1920/1080'}}
          style={{
            height: 200,
            flex: 1,
            marginEnd: 2,
            marginBottom: 2,
            alignItems: 'center',
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function ProfileScreen() {
  // const route = useRoute();
  // const { _id } = route.params

  // console.log(_id, "<<< ID");
  return (
    <FlatList
      style={{ flex: 1, backgroundColor: "white" }}
      data={data1}
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
              <Text style={{ color: "black", fontWeight: "bold" }}>
                John Doe
              </Text>
            </View>
            <View style={{ marginBottom: 5 }}>
              <Text style={{ color: "black" }}>
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
                  backgroundColor: "#E4E3E3",
                  justifyContent: "center",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "black" }}>Edit Profile</Text>
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
                    backgroundColor: "#E4E3E3",
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
                  color: "black",
                  fontSize: 12,
                  marginTop: 5,
                }}
              >
                New
              </Text>
            </View>
          </ScrollView>
          <View
            style={{
              backgroundColor: "#DAD7D7",
              height: 1,
              justifyContent: "center",
              marginTop: 10,
            }}
          ></View>
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
              marginVertical: 10,
            }}
          >
            <TouchableOpacity>
              <Image source={images.grid} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            style={{ marginTop: 2, marginStart: 2 }}
            renderItem={({ item, index }) => <Test />}
            numColumns={3}
            indicatorStyle={"black"}
            showsVerticalScrollIndicator={true}
          />
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
    color: "black",
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
    color: "black",
    //fontWeight: 'bold',
    alignSelf: "center",
  },
  container3: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
  },
});
