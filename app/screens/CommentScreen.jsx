import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import images from "../res/images";
import colors from "../res/colors";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Colors } from "react-native/Libraries/NewAppScreen";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
// import { formatDistanceToNow } from 'date-fns';

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

const ADD_COMMENT = gql`
  mutation Mutation($id: ID!, $content: String!) {
    commentPost(_id: $id, content: $content) {
      content
      username
      createdAt
      updatedAt
    }
  }
`;

export const CommentScreen = ({ route }) => {
  const { id } = route.params;
  const { loading, error, data, refetch } = useQuery(GET_POST, {
    variables: { id },
  });

  const [addComment, { loading: loading2, error: error2 }] =
    useMutation(ADD_COMMENT);

  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      if (comment.trim() === "") {
        Alert.alert("Error", "Please enter a comment.");
        return;
      }

      await addComment({
        variables: { id, content: comment },
      });
      setComment("");

      await refetch();
    } catch (error) {
      console.error("Error adding comment:", error.message);
      Alert.alert("Error", "Failed to add comment. Please try again.");
    }
  };

  if (loading || loading2) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error || error2) {
    return <Text>Error: {error.message}</Text>;
  }

  const timeAgo = (time) => {
    console.log(time, "???????");
    return formatDistanceToNow (new Date(time), { addSuffix: true });
  } 

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            marginHorizontal: 10,
            marginTop: 15,
            marginBottom: 20,
          }}
        >
          {data && data.post.comments.length > 0 ? (
            data.post.comments.map((comment, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Image
                  source={{ uri: "https://i.pinimg.com/564x/e8/82/72/e8827292777dca5378d3c75899029883.jpg" }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                  }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    {comment.username}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: "black", marginRight: 5 }}>
                      {comment.content}
                    </Text>
                    <Image
                      source={images.dot}
                      style={{ width: 3, height: 3 }}
                    />
                    <Text
                      style={{
                        color: "#8E8E8E",
                        fontSize: 12,
                        marginLeft: 5,
                      }}
                    >
                      1h
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={{ alignItems: "center", marginTop: 200 }}>
              <Text style={{ fontWeight: "600", fontSize: 30 }}>
                No Comments Yet
              </Text>
              <Text
                style={{ fontWeight: "400", fontSize: 15, color: "#817C7C" }}
              >
                Start Conversation..
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <Image
          source={{ uri: "https://i.pinimg.com/564x/e8/82/72/e8827292777dca5378d3c75899029883.jpg" }}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            marginRight: 10,
          }}
        />
        <TextInput
          placeholder="Add a comment..."
          style={{
            flex: 1,
            height: 40,
            fontSize: 16,
            paddingHorizontal: 12,
            borderWidth: 0.5,
            borderColor: "#D1D1D1",
            borderRadius: 20,
          }}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity onPress={handleSubmit} style={{ marginLeft: 5 }}>
          <FontAwesome name="send" size={23} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
