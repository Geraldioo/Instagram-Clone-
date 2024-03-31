import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import colors from "../res/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { MY_PROFILE } from "./DetailPostScreen";
import { FontAwesome5 } from "@expo/vector-icons";

const SEARCH_USERS = gql`
  query Query($username: String!) {
    searchUser(username: $username) {
      _id
      name
      username
      email
      password
    }
  }
`;

function ExploreScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [searchUsers, { loading, data }] = useLazyQuery(SEARCH_USERS);
  const { loading: profileLoading, data: profileData } = useQuery(MY_PROFILE);

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      searchUsers({ variables: { username: searchText } });
    }
  };

  const myProfileId = profileData?.myProfile?._id;

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: colors.lightGray,
            borderRadius: 8,
            paddingHorizontal: 10,
          }}
          placeholder="Search Users.."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity onPress={handleSearch}>
          <FontAwesome5
            style={{ marginLeft: 10, marginTop: 7 }}
            name="search"
            size={26}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {loading || profileLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : data && data.searchUser && data.searchUser.length > 0 ? (
        <FlatList
          data={data.searchUser.filter((user) => user._id !== myProfileId)}
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
                  source={{ uri: "https://i.pinimg.com/564x/e8/82/72/e8827292777dca5378d3c75899029883.jpg" }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: 10,
                  }}
                />
                <Text>{item.username}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>No users found</Text>
      )}
    </View>
  );
}

export default ExploreScreen;
