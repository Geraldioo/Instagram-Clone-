import React, { useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { gql, useQuery } from "@apollo/client";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../res/colors";

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
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id },
  });

  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    // Menangani pengiriman komentar
    console.log("Submit comment:", comment);
    // Mengosongkan input setelah pengiriman komentar
    setComment("");
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
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <Image
          source={{ uri: "https://picsum.photos/600" }}
          style={{ width: 30, height: 30, borderRadius: 15, marginStart: 10 }}
        />
        <TextInput
          placeholder="Add a comment..."
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 16,
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: colors.lightGray,
            borderRadius: 20,
          }}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity onPress={handleSubmit} style={{ marginEnd: 10 }}>
          <FontAwesome name="send" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};



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
      <>
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
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              source={{ uri: "https://picsum.photos/600" }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                marginStart: 10,
              }}
            />
            <TextInput
              placeholder="Add a comment..."
              style={{
                flex: 1,
                marginLeft: 10,
                fontSize: 16,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderWidth: 1,
                borderColor: colors.lightGray,
                borderRadius: 20,
              }}
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              style={{ marginEnd: 10 }}
            >
              <FontAwesome name="send" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    ))