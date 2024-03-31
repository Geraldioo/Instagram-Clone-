import { gql, useMutation } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { GET_POSTS } from "./HomeScreen";

const ADD_POST = gql`
  mutation AddPost($content: String!, $tags: [String], $imgUrl: String) {
    addPost(content: $content, tags: $tags, imgUrl: $imgUrl) {
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

function AddPostScreen({ navigation }) {
  const image = { uri: "https://wallpapercave.com/wp/wp9307062.jpg" };

  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isPostSuccess, setIsPostSuccess] = useState(false);

  const [post, { loading, error }] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  async function handleAddPost() {
    try {
      await post({ variables: { content, tags, imgUrl } });
      setIsPostSuccess(true);
      navigation.navigate("Home2");
    } catch (err) {
      Alert.alert("Create Post Failed", err.message);
    }
  }
  
  useEffect(() => {
    if (isPostSuccess) {
      setContent("");
      setTags("");
      setImgUrl("");
      setIsPostSuccess(false);
    }
  }, [isPostSuccess]);

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
    <>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.text}>Add Your Own Post</Text>
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              onChangeText={setContent}
              value={content}
              placeholder="description"
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="tags"
              onChangeText={setTags}
              value={tags}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="img url"
              onChangeText={setImgUrl}
              value={imgUrl}
            />
          </View>
          <View>
            <TouchableOpacity
              title="Create Post"
              onPress={handleAddPost}
              style={styles.button}
            >
              <Text style={styles.textBtn}>Create Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 30,
    margin: 40,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 10,
  },
  inputGroup: {
    gap: 5,
    backgroundColor: "#F8F0F0",
    marginEnd: 5,
    marginStart: 5,
    marginBottom: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#3b5998",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3b5998",
    padding: 10,
    borderRadius: 12,
    marginEnd: 5,
    marginStart: 5,
  },
  textBtn: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default AddPostScreen;
