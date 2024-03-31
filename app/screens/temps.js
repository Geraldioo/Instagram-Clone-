// import React, { useState } from "react";
// import { ActivityIndicator, Image, Text, View } from "react-native";
// import {
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
// } from "react-native-gesture-handler";
// import { gql, useQuery } from "@apollo/client";
// import { Colors } from "react-native/Libraries/NewAppScreen";
// import { FontAwesome } from "@expo/vector-icons";
// import colors from "../res/colors";

// const GET_POST = gql`
//   query Post($id: ID) {
//     post(_id: $id) {
//       _id
//       content
//       tags
//       imgUrl
//       authorId
//       comments {
//         content
//         username
//         createdAt
//         updatedAt
//       }
//       likes {
//         username
//         createdAt
//         updatedAt
//       }
//       createdAt
//       updatedAt
//       author {
//         _id
//         name
//         username
//         email
//       }
//     }
//   }
// `;

// export const CommentScreen = ({ route }) => {
//   const { id } = route.params;
//   const { loading, error, data } = useQuery(GET_POST, {
//     variables: { id },
//   });

//   const [comment, setComment] = useState("");

//   const handleSubmit = () => {
//     // Menangani pengiriman komentar
//     console.log("Submit comment:", comment);
//     // Mengosongkan input setelah pengiriman komentar
//     setComment("");
//   };

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color={Colors.primary} />
//       </View>
//     );
//   }

//   if (error) {
//     return <Text>Error: {error.message}</Text>;
//   }

//   return (
//     <ScrollView>
//       <View
//         style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
//       >
//         <Image
//           source={{ uri: "https://picsum.photos/600" }}
//           style={{ width: 30, height: 30, borderRadius: 15, marginStart: 10 }}
//         />
//         <TextInput
//           placeholder="Add a comment..."
//           style={{
//             flex: 1,
//             marginLeft: 10,
//             fontSize: 16,
//             paddingVertical: 8,
//             paddingHorizontal: 12,
//             borderWidth: 1,
//             borderColor: colors.lightGray,
//             borderRadius: 20,
//           }}
//           value={comment}
//           onChangeText={setComment}
//         />
//         <TouchableOpacity onPress={handleSubmit} style={{ marginEnd: 10 }}>
//           <FontAwesome name="send" size={24} color={colors.primary} />
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };



// <ScrollView>
// <View
//   style={{
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginStart: 10,
//     marginEnd: 10,
//     marginTop: 15,
//   }}
// >
//   {data && data.post.comments.length > 0 ? (
//     data.post.comments.map((comment, index) => (
//       <>
//         <View
//           key={index}
//           style={{ flexDirection: "row", marginBottom: 10 }}
//         >
//           <Image
//             source={{ uri: "https://picsum.photos/600" }}
//             style={{ width: 60, height: 60, borderRadius: 70 }}
//           />
//           <View style={{ flexDirection: "column", marginStart: 15 }}>
//             <Text style={{ color: "black", fontWeight: "bold" }}>
//               {comment.username}
//             </Text>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Text style={{ color: "black" }}>{comment.content}</Text>
//               <Image
//                 source={images.dot}
//                 style={{ width: 3, height: 3, marginStart: 5 }}
//               />
//               <Text style={{ color: colors.textFaded2, marginStart: 5 }}>
//                 2h
//               </Text>
//             </View>
//           </View>
//         </View>
//         <ScrollView>
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               marginTop: 10,
//             }}
//           >
//             <Image
//               source={{ uri: "https://picsum.photos/600" }}
//               style={{
//                 width: 30,
//                 height: 30,
//                 borderRadius: 15,
//                 marginStart: 10,
//               }}
//             />
//             <TextInput
//               placeholder="Add a comment..."
//               style={{
//                 flex: 1,
//                 marginLeft: 10,
//                 fontSize: 16,
//                 paddingVertical: 8,
//                 paddingHorizontal: 12,
//                 borderWidth: 1,
//                 borderColor: colors.lightGray,
//                 borderRadius: 20,
//               }}
//               value={comment}
//               onChangeText={setComment}
//             />
//             <TouchableOpacity
//               onPress={handleSubmit}
//               style={{ marginEnd: 10 }}
//             >
//               <FontAwesome name="send" size={24} color={colors.primary} />
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </>
//     ))


import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Colors } from "react-native/Libraries/NewAppScreen";

const like = gql`
  mutation Mutation($id: String!) {
    like(_id: $id) {
      likes {
        username
        createdAt
        updatedAt
      }
    }
  }
`;

function Card({ post, user, refetch, flag }) {
  post.likes.map((item) => {
    if (item.username === user.username) {
      flag = true;
    }
  });
  const [likefunction, { loading, error, data }] = useMutation(like);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  async function handleLogin() {
    try {
      await likefunction({
        variables: {
          id: post._id,
        },
      });
      flag = true;
      refetch();
    } catch (error) {
      Alert.alert("Something Error", error.message);
    }
  }
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="account-circle" size={35} color="black" />
        <View style={{flexDirection: "column"}}>
          <Text style={styles.username}>{post.author.username}</Text>
          <Text style={styles.tags}>{post.tags}</Text>
        </View>
      </View>
      <Image
        source={{
          uri: post.imgUrl,
        }}
        style={styles.image}
      />
      <View style={styles.footer}>
        <View style={styles.caption}>
          <TouchableOpacity onPress={handleLogin}>
            <AntDesign
              name={flag ? "heart" : "hearto"}
              size={24}
              color={flag ? "red" : "black"}
              style={styles.iconComment}
            />
          </TouchableOpacity>
          <FontAwesome5
            name="comment"
            size={24}
            color="black"
            style={styles.iconComment}
          ></FontAwesome5>
          <Feather
            name="send"
            size={24}
            color="black"
            style={styles.iconComment}
          />
        </View>
        <View>
          {post.likes.length > 1 && (
            <Text style={styles.numberOfLike}>
              Liked by {post.likes[0].username} and {post.likes.length - 1}{" "}
              others
            </Text>
          )}
          {post.likes.length === 1 && (
            <Text style={styles.numberOfLike}>
              Liked by {post.likes[0].username}
            </Text>
          )}
          {post.likes.length === 0 && (
            <Text style={styles.numberOfLike}>
              No one has liked this post yet
            </Text>
          )}
        </View>
        <View style={styles.nameAccount}>
          <Text style={styles.postName}>{post.author.username}</Text>
          <Text style={styles.description}>{post.content}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    marginBottom: 0,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  nameAccount: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: 500,
  },
  footer: {
    padding: 10,
  },
  caption: {
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginStart: 5,
  },
  iconComment: {
    marginRight: 15,
    marginLeft: -5,
  },
  numberOfLike: {
    marginRight: 15,
    fontSize: 15,
  },
  description: {
    fontSize: 14,
    marginLeft: 7,
    marginTop: 2,
  },
  postName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  tags: {
    fontSize: 12,
    marginLeft: 10,
  },
});

export default Card;


return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <ScrollView
      ref={scrollViewRef}
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginTop: 15,
          marginBottom: 20, // Untuk memberi ruang agar input tidak tertutup oleh keyboard
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
                source={{ uri: "https://picsum.photos/600" }}
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
                    2h
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
            <Text style={{ fontWeight: "400", fontSize: 15, color: "#817C7C" }}>
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
        source={{ uri: "https://picsum.photos/600" }}
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
  </KeyboardAvoidingView>
);