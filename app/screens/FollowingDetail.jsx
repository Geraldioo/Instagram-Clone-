import { gql, useQuery } from "@apollo/client";
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const GET_FOLLOWS = gql`
  query Query {
    myProfile {
      _id
      name
      username
      email
      followerDetail {
        _id
        name
        username
        email
      }
      followingDetail {
        _id
        name
        username
        email
      }
    }
  }
`;

const FollowDetail = ({ navigation }) => {
  const { loading, data, error } = useQuery(GET_FOLLOWS);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      {/* <Text>Followers:</Text>
      <FlatList
        data={data.myProfile.followerDetail}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("User Profile", { id: item._id })
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Image
                source={{
                  uri: "https://i.pinimg.com/564x/e8/82/72/e8827292777dca5378d3c75899029883.jpg",
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 10,
                }}
              />
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      /> */}

      <FlatList
        style={{
            marginTop: 25,
            marginHorizontal: 15
        }}
        data={data.myProfile.followingDetail}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("User Profile", { id: item._id })
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Image
                source={{
                  uri: "https://i.pinimg.com/564x/e8/82/72/e8827292777dca5378d3c75899029883.jpg",
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 10,
                }}
              />
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FollowDetail;
