import { View, Text, Image, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../res/colors";
import { gql, useMutation } from "@apollo/client";
import { GET_POSTS } from "../screens/HomeScreen";
import { Feather } from '@expo/vector-icons';

const LIKE_POST = gql`
  mutation Mutation($id: ID!) {
    likePost(_id: $id) {
      username
      createdAt
      updatedAt
    }
  }
`;

const UNLIKE_POST = gql`
  mutation Mutation($id: ID!) {
    unlikePost(_id: $id) {
      username
      createdAt
      updatedAt
    }
  }
`;

function PostCard({ post, id, navigate }) {
  const [liked, setLiked] = useState(false);

  const [likePost] = useMutation(LIKE_POST, {
    refetchQueries: [{ query: GET_POSTS }]
  });
  const [unlikePost] = useMutation(UNLIKE_POST, {
    refetchQueries: [{ query: GET_POSTS }]
  });
  
  const toggleLike = async () => {
    try {
      if (liked) {
        await unlikePost({ variables: { id } });
      } else {
        await likePost({ variables: { id } });
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Error toggling like:", error.message);
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity>
        <View style={styles.header}>
          <Image
            source={{ uri: `http://placekitten.com/g/200/300` }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{post.author.username}</Text>
        </View>
      </TouchableOpacity>
      <Image
        source={{
          uri: post.imgUrl,
        }}
        style={styles.image}
      />
      <View style={styles.footer}>
        <View style={styles.caption}>
          <TouchableOpacity onPress={toggleLike}>
            <AntDesign
              name={liked ? "heart" : "hearto"}
              size={24}
              color={liked ? "red" : "black"}
              style={styles.iconHeart}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("Comments", { id: post._id })}
          >
            <FontAwesome
              name="commenting"
              size={24}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
          <Feather name="send" 
              size={24}
              color="black"
              style={styles.iconShare}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.count}>
          <Text style={styles.countText}>{post.likes.length} likes</Text>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.description}>
              <Text style={[styles.textFooter, { marginRight: 5 }]}>
                {post.author.username}
                {"  "}
              </Text>
              {post.content}
            </Text>
          </View>
          <TouchableOpacity
            style={{ marginTop: 5 }}
            onPress={() => navigate("Comments", { id: post._id })}
          >
            <Text style={{ color: colors.textFaded2 }}>
              View all {post.comments.length} comments
            </Text>
          </TouchableOpacity>
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
    marginLeft: 5,
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
    marginBottom: 5,
    marginStart: 5,
    marginTop: -5,
  },
  iconHeart: {
    marginTop: 5,
    marginRight: 15,
  },
  icon: {
    marginRight: 15,
    fontSize: 25,
    alignItems: "center",
    alignContent: "center",
  },
  iconShare: {
    marginRight: 15,
    fontSize: 23,
    alignItems: "center",
    alignContent: "center",
    marginTop: 6,
  },
  count: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 14,
    marginBottom: 5,
    marginStart: 0,
    marginTop: -5,
  },
  countText: {
    marginTop: 5,
    marginLeft: 10,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
  },
  textFooter: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PostCard;
