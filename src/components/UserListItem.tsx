import {View, Text, StyleSheet} from "react-native";
import React from "react";

const UserListItem = ({ user }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{user.full_name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: 'white',
    },

    text: {
        fontWeight: '600'
    },
});

export default UserListItem;
