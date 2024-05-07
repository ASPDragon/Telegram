import { PropsWithChildren, useEffect, useState } from "react";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { ActivityIndicator, View } from "react-native";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

export default function ChatProvider({children}: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const connect = async () => {
            await client.connectUser(
                {
                    id: 'jlahey',
                    name: 'Jim Lahey',
                    image: 'https://i.imgur.com/fR9Jz14.png',
                },
                client.devToken('jlahey')
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
            client.disconnectUser();
            setIsReady(false);
        };
    }, []);

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