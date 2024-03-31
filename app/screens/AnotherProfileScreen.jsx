import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native-gesture-handler";
import images from "../res/images";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Colors } from "react-native/Libraries/NewAppScreen";

const data1 = [{ key: "1" }];

const USER_PROFILE = gql`
  query UserById($id: ID) {
    userById(_id: $id) {
      _id
      name
      username
      email
      password
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
      userPost {
        _id
        content
        tags
        imgUrl
        authorId
        createdAt
        updatedAt
        comments {
          content
          username
          createdAt
          updatedAt
        }
        likes {
          username
          createdAt
          updatedAt
        }
      }
    }
  }
`;

const FOLLOW_USER = gql`
  mutation Mutation($id: ID!) {
    followUser(_id: $id) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;
const UNFOLLOW_USER = gql`
  mutation Mutation($id: ID!) {
    unfollowUser(_id: $id) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;

export default function ProfileScreen({ navigation, route }) {
  const { id } = route.params;
  const { loading, error, data, refetch } = useQuery(USER_PROFILE, {
    notifyOnNetworkStatusChange: true,
    variables: { id },
  });


  const [refreshing, setRefreshing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followUser] = useMutation(FOLLOW_USER, {
    refetchQueries: [{ query: USER_PROFILE, variables: { id } }],
  });
  const [unfollowUser] = useMutation(UNFOLLOW_USER, {
    refetchQueries: [{ query: USER_PROFILE, variables: { id } }],
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

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

  const RenderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Detail", { id: item._id })}
        >
          <Image
            source={{ uri: item.imgUrl }}
            style={{
              height: 200,
              flex: 1,
              marginEnd: 2,
              marginBottom: 2,
              alignItems: "center",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };


  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser({ variables: { id: data.userById._id } });
      } else {
        await followUser({ variables: { id: data.userById._id } });
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error toggling follow:", error.message);
      Alert.alert("Error!", error.message);
    }
  };

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: "white" }}
      data={data1}
      renderItem={() => (
        <>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          >
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
                    <Text style={Styles.numberContainer}>
                      {data.userById.userPost.length}
                    </Text>
                    <Text style={Styles.text}>Posts</Text>
                  </TouchableOpacity>
                </View>
                <View style={Styles.container3}>
                  <TouchableOpacity>
                    <Text style={Styles.numberContainer}>
                      {data.userById.followerDetail.length}
                    </Text>
                    <Text style={Styles.text}>Followers</Text>
                  </TouchableOpacity>
                </View>
                <View style={Styles.container3}>
                  <TouchableOpacity>
                    <Text style={Styles.numberContainer}>
                      {data.userById.followingDetail.length}
                    </Text>
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
                  {data.userById.username}
                </Text>
              </View>
              <View style={{ marginBottom: 5 }}>
                <Text style={{ color: "black" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={toggleFollow}>
              <View
                style={[
                  Styles.button,
                  isFollowing ? Styles.followed : Styles.follow,
                ]}
              >
                <Text style={Styles.buttonText}>
                  {isFollowing ? "Followed" : "Follow"}
                </Text>
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
                  HighLight
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
          </ScrollView>
          <FlatList
            data={data.userById.userPost}
            style={{ marginTop: 2, marginStart: 2 }}
            renderItem={({ item }) => <RenderItem item={item} />}
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
  button: {
    flex: 1,
    height: 30,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 10,
    marginStart: 10,
    marginEnd: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  follow: {
    backgroundColor: "#3586FF",
  },
  followed: {
    backgroundColor: "#E4E3E3",
  },
  buttonText: {
    color: "black",
  },
});
