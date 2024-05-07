import { Stack } from 'expo-router';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { useEffect } from "react";

const client = StreamChat.getInstance('fx9k3vdnaqf8');

export default function HomeLayout() {
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

            // const channel = client.channel('messaging', 'the_park', {
            //     name: 'The Park',
            // });
            //
            // await channel.watch();
        };

        connect();
    });

    return (
        <OverlayProvider>
            <Chat client={client}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </Chat>
        </OverlayProvider>
    );
}
