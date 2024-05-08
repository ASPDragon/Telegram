import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import {useChatContext} from "stream-chat-expo";
import {useAuth} from "../providers/AuthProvider";
import { router } from "expo-router";

const UserListItem = ({ user }) => {
        const { client } = useChatContext();
        const { user: me } = useAuth();

        const onPress = async () => {
            // Start chat with user
            const channel = client.channel('messaging', {
                members: [me.id, user.id],
            });

            await channel.watch();
            router.replace(`/(home)/channel/${channel.cid}`);
        };

    return (
        <Pressable
            onPress={onPress}
            style={styles.container}
        >
            <Text style={styles.text}>{user.full_name}</Text>
        </Pressable>
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
