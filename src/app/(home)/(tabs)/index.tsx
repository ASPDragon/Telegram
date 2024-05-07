import { ChannelList } from 'stream-chat-expo';
import { useState } from "react";
import { router } from "expo-router";

export default function MainTabScreen() {
    const [channel, setChannel] = useState();

    return <ChannelList onSelect={(channel) => router.push(`/channel/${channel.cid}`)} />;
}
