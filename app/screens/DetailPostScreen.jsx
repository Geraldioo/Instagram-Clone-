import { View, Text, Button, ActivityIndicator } from "react-native";
import PostCard from "../components/postCard"
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { gql, useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const GET_POST = gql`
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
`

export const MY_PROFILE = gql`
  query Query {
    myProfile {
      _id
      name
      username
      email
      followingDetail {
        _id
        name
        username
        email
      }
      followerDetail {
        _id
        name
        username
        email
      }
    }
  }
`;

function DetailScreen({ navigation, route }) {
  const { id } = route.params  
  const { loading: loading2, error: error2, data: data2, refetch:refetch2 } = useQuery(MY_PROFILE);
  const { loading, error, data, refetch } = useQuery(GET_POST, {
    notifyOnNetworkStatusChange: true,
    variables: {
        id
    }
  });

  const [refreshing, setRefreshing] = useState(false)
  let flag = false

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    await refetch2()
    flag = false
    setRefreshing(false);
  };

  let user = data2?.myProfile;
  let post = data?.post;

  if (loading || loading2) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
         size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error || error2) {
    return <Text>Error: {error.message}</Text>;
  }

// console.log(data.post.author.username, "<<< DETAIL");
  return (
   <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        <PostCard key={post._id} post={post} flag={flag} user={user} refetch={refetch} id={post._id} navigate={navigation.navigate} />
    </ScrollView>
  );
}

export default DetailScreen;
