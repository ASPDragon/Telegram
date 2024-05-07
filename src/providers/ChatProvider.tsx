import { PropsWithChildren, useEffect, useState } from "react";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "./AuthProvider";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

export default function ChatProvider({children}: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const { profile } = useAuth();

    useEffect(() => {
        if (!profile) {
            return;
        }

        const connect = async () => {
            await client.connectUser(
                {
                    id: profile.id,
                    name: profile.full_name,
                    image: 'https://i.imgur.com/fR9Jz14.png',
                },
                client.devToken(profile.id)
            );

            setIsReady(true);

            // const channel = client.channel('messaging', 'the_park', {
            //     name: 'The Park',
            // });
            //
            // await channel.watch();
        };

        connect();

        return () => {
            if (isReady) {
                client.disconnectUser();
            }
            setIsReady(false);
        };
    }, [profile?.id]);

    if (!isReady) {
        return (
            <View style={{ flex: 1 }}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <OverlayProvider>
            <Chat client={client}>
                {children}
            </Chat>
        </OverlayProvider>
    );
}
