import { View, Text, Button, ActivityIndicator } from "react-native";
import PostCard from "../components/postCard"
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { gql, useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

const GET_POSTS = gql`
  query Query {
  posts {
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
`

function HomeScreen({ navigation }) {
  const { loading, error, data, refetch } = useQuery(GET_POSTS, {
    notifyOnNetworkStatusChange: true
  });

  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
         size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }


  return (
   <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
      {data?.posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </ScrollView>
  );
}

export default HomeScreen;
