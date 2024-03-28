import React from "react";
import { View, Image, StyleSheet } from "react-native";

const LogoTitle = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={{
                    uri: "https://logos-world.net/wp-content/uploads/2020/04/Instagram-Logo-2010-2013.png"
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 145,
        height: 60,
        resizeMode: "contain",
    },
});

export default LogoTitle;
