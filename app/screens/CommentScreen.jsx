import { ActivityIndicator, Image, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import images from "../res/images";
import colors from "../res/colors";
import { gql, useQuery } from "@apollo/client";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useState } from "react";

const GET_POST = gql`
  query Post($id: ID) {
    post(_id: $id) {
      _id
      content
      tags
      imgUrl
      authorId
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
      createdAt
      updatedAt
      author {
        _id
        name
        username
        email
      }
    }
  }
`;

export const CommentScreen = ({ route }) => {
  const { id } = route.params;
  const { loading, error, data, refetch } = useQuery(GET_POST, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });
  const [refreshing, setRefreshing] = useState(false);

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

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginStart: 10,
          marginEnd: 10,
          marginTop: 15,
        }}
      >
        {data && data.post.comments.length > 0 ? (
          data.post.comments.map((comment, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", marginBottom: 10 }}
            >
              <Image
                source={{ uri: "https://picsum.photos/600" }}
                style={{ width: 60, height: 60, borderRadius: 70 }}
              />
              <View style={{ flexDirection: "column", marginStart: 15 }}>
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  {comment.username}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "black" }}>{comment.content}</Text>
                  <Image
                    source={images.dot}
                    style={{ width: 3, height: 3, marginStart: 5 }}
                  />
                  <Text style={{ color: colors.textFaded2, marginStart: 5 }}>
                    2h
                  </Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 200 }}
          >
            <Text style={{fontWeight: "600", fontSize: 30}}> No Comments Yet</Text>
            <Text style={{fontWeight: "400", fontSize: 15, color: "#817C7C"}}> Start Conversation..</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
