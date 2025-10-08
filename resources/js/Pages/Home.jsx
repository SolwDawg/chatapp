import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';

import MessageInput from '@/Components/App/MessageInput';
import ConversationHeader from '@/Components/ConversationHeader';
import { useEventBus } from '@/EventBus';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChatLayout from '@/Layouts/ChatLayout';

function Home({ messages = null, selectedConversation = null }) {
    const [localMessages, setLocalMessages] = useState([]);
    const messagesCtrRef = useRef(null);
    const { on } = useEventBus();

    useEffect(() => {
        const messageCreated = (message) => {
            if (
                selectedConversation &&
                selectedConversation.is_group &&
                selectedConversation.id === message.group_id
            ) {
                setLocalMessages((prevMessages) => [message, ...prevMessages]);
            }

            if (
                selectedConversation &&
                selectedConversation.is_user &&
                (selectedConversation.id === message.receiver_id ||
                    selectedConversation.id === message.sender_id)
            ) {
                setLocalMessages((prevMessages) => [message, ...prevMessages]);
            }
        };

        setTimeout(() => {
            if (messagesCtrRef.current) {
                messagesCtrRef.current.scrollTop =
                    messagesCtrRef.current.scrollHeight;
            }
        }, 10);

        const offCreated = on('message.created', messageCreated);

        return () => {
            offCreated();
        };
    }, [selectedConversation, on]);

    useEffect(() => {
        setLocalMessages(messages ? messages.data.reverse() : []);
    }, [messages]);

    return (
        <>
            {!messages && (
                <div className="flex h-full flex-col items-center justify-center gap-8 text-center opacity-35">
                    <div className="p-16 text-2xl text-slate-200 md:text-4xl">
                        Please select a conversation to start chatting
                    </div>
                    <ChatBubbleLeftRightIcon className="inline-block h-32 w-32" />
                </div>
            )}
            {messages && (
                <>
                    <ConversationHeader
                        selectedConversation={selectedConversation}
                    />
                    <div
                        ref={messagesCtrRef}
                        className="flex-1 overflow-y-auto p-5"
                    >
                        {localMessages.length === 0 && (
                            <div className="flex h-full items-center justify-center">
                                <div className="text-lg text-slate-200">
                                    No messages found
                                </div>
                            </div>
                        )}
                        {localMessages.length > 0 && (
                            <div className="flex flex-1 flex-col">
                                {localMessages.map((message) => (
                                    <MessageItem
                                        key={message.id}
                                        message={message}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <MessageInput conversation={selectedConversation} />
                </>
            )}
        </>
    );
}

Home.layout = (page) => {
    return (
        <AuthenticatedLayout user={page.props.auth.user}>
            <ChatLayout children={page} />
        </AuthenticatedLayout>
    );
};

export default Home;
