import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages = [],
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const endRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-base-content/60">
        Open a chat to start talking
      </div>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-base-200/50">
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-3 sm:py-5 space-y-2 sm:space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-sm text-base-content/60">
            Say hello 👋
          </p>
        )}

        {messages.map((message, i) => {
          const isMine = message.senderId === authUser._id;
          const prev = messages[i - 1];
          const showAvatar = !prev || prev.senderId !== message.senderId;

          return (
            <div
              key={message._id}
              className={`flex items-end gap-1 sm:gap-2 ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar */}
              {!isMine && showAvatar && (
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt="avatar"
                  className="h-6 w-6 sm:h-7 sm:w-7 rounded-full object-cover"
                />
              )}

              <div
                className={`max-w-[85%] sm:max-w-[72%] rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 ${
                  isMine
                    ? "bg-primary text-primary-content rounded-br-md"
                    : "bg-base-100 border border-base-300 rounded-bl-md"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="attachment"
                    className="mb-2 max-w-full sm:max-w-xs rounded-xl"
                  />
                )}

                {message.text && (
                  <p className="text-sm leading-snug wrap-break-word">
                    {message.text}
                  </p>
                )}

                <span className="block mt-1 text-[10px] sm:text-[11px] opacity-60 text-right">
                  {formatMessageTime(message.createdAt)}
                </span>
              </div>

              {!isMine && !showAvatar && <div className="w-6 sm:w-7" />}
            </div>
          );
        })}

        <div ref={endRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
