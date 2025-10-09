import { Popover } from '@headlessui/react';
import {
    FaceSmileIcon,
    HandThumbUpIcon,
    PaperAirplaneIcon,
    PaperClipIcon,
    PhotoIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { useState } from 'react';

import NewMessageInput from './NewMessageInput';
const MessageInput = ({ conversation = null }) => {
    const [newMessage, setNewMessage] = useState('');
    const [inputErrorMessage, setInputErrorMessage] = useState('');
    const [messageSending, setMessageSending] = useState(false);

    const onSendClick = () => {
        if (messageSending) {
            return;
        }

        if (newMessage.trim() === '') {
            setInputErrorMessage('Message is required');

            setTimeout(() => {
                setInputErrorMessage('');
            }, 3000);
            return;
        }
        const formData = new FormData();
        formData.append('message', newMessage);
        if (conversation.is_user) {
            formData.append('receiver_id', conversation.id);
        } else {
            formData.append('group_id', conversation.id);
        }

        setMessageSending(true);

        axios
            .post(route('messages.store'), formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100,
                    );
                    console.log(progress);
                },
            })
            .then((res) => {
                console.log(res);
                setNewMessage('');
                setMessageSending(false);
            })
            .catch((err) => {
                console.log(err);
                setMessageSending(false);
            });
    };

    const onLikeClick = () => {
        if (messageSending) {
            return;
        }

        const data = {
            message: '👍',
        };

        if (conversation.is_user) {
            data['receiver_id'] = conversation.id;
        } else if (conversation.is_group) {
            data['group_id'] = conversation.id;
        }

        axios.post(route('messages.store'), data);
    };

    return (
        <div className="flex flex-wrap items-start border-t border-slate-700 py-3">
            <div className="xs:flex-none xs:order-1 order-2 flex-1 p-2">
                <button className="relative p-1 text-gray-400 hover:text-gray-300">
                    <PaperClipIcon className="w-6" />
                    <input
                        type="file"
                        className="absolute bottom-0 left-0 right-0 top-0 z-20 cursor-pointer opacity-0"
                        multiple
                    />
                </button>
                <button className="relative p-1 text-gray-400 hover:text-gray-300">
                    <PhotoIcon className="w-6" />
                    <input
                        type="file"
                        className="absolute bottom-0 left-0 right-0 top-0 z-20 cursor-pointer opacity-0"
                        accept="image/*"
                        multiple
                    />
                </button>
            </div>
            <div className="xs:p-0 xs:basis-0 xs:order-2 relative order-1 min-w-[220px] flex-1 basis-full px-3">
                <div className="flex">
                    <NewMessageInput
                        value={newMessage}
                        onSend={onSendClick}
                        onChange={(ev) => setNewMessage(ev.target.value)}
                    />
                    <button
                        onClick={onSendClick}
                        disabled={messageSending}
                        className="btn btn-info rounded-l-none"
                    >
                        {messageSending && (
                            <span className="loading loading-spinner loading-xs"></span>
                        )}
                        <PaperAirplaneIcon className="w-6" />
                        <span className="hidden sm:inline">Send</span>
                    </button>
                </div>
                {inputErrorMessage && (
                    <p className="text-xs text-red-400">{inputErrorMessage}</p>
                )}
            </div>
            <div className="xs:order-3 order-3 flex p-2">
                <Popover className="relative">
                    <Popover.Button className="p-1 text-gray-400 hover:text-gray-300">
                        <FaceSmileIcon className="h-6 w-6" />
                    </Popover.Button>
                    <Popover.Panel className="absolute bottom-full right-0 z-10">
                        <EmojiPicker
                            theme="dark"
                            onEmojiClick={(ev) =>
                                setNewMessage(newMessage + ev.emoji)
                            }
                        />
                    </Popover.Panel>
                </Popover>
                <button
                    onClick={onLikeClick}
                    className="p-1 text-gray-400 hover:text-gray-300"
                >
                    <HandThumbUpIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};

export default MessageInput;
