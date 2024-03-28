import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import palette from '../res/palette';
import {ScrollView, FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../res/colors';

const data = [{key: '1'}];

export default function ProfileScreen() {
  return (
    <FlatList
      style={{flex: 1, backgroundColor: colors.bottomBackGround}}
      /*<ProfileHeader />
      <UserBio />
      <EditProfileButton />
      <ConstantStories />
      <LineSeperator />
      <ProfileGrid />*/
      data={data}
      renderItem={() => (
        <>
         
         <View style={Styles.container}>
      <TouchableOpacity>
        <Image
          source={{uri: 'https://picsum.photos/600'}}
          style={Styles.prfilePicture}
        />
      </TouchableOpacity>

      <View style={Styles.container2}>
        <View style={Styles.container3}>
          <TouchableOpacity>
            <Text style={Styles.numberContainer}>10</Text>
            <Text style={Styles.text}>Posts</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.container3}>
          <TouchableOpacity>
            <Text style={Styles.numberContainer}>160</Text>
            <Text style={Styles.text}>Followers</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.container3}>
          <TouchableOpacity>
            <Text style={Styles.numberContainer}>100</Text>
            <Text style={Styles.text}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

          {/* <UserBio />
          <EditProfileButton />
          <ConstantStories />
          <LineSeperator />
          <GridIcon />
          <ProfileGrid /> */}
        </>
      )}
    />
  );
}


const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  prfilePicture: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginLeft: 20,
  },
  numberContainer: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 15,
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginEnd: 20,
  },
  text: {
    color: 'white',
    //fontWeight: 'bold',
    alignSelf: 'center',
  },
  container3: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
});