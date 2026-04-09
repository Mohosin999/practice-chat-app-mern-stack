// import ChatBody from "@/components/chat/chat-body";
// import ChatFooter from "@/components/chat/chat-footer";
// import ChatHeader from "@/components/chat/chat-header";
// import EmptyState from "@/components/empty-state";
// import { Spinner } from "@/components/ui/spinner";
// import { useAuth } from "@/hooks/use-auth";
// import { useChat } from "@/hooks/use-chat";
// import useChatId from "@/hooks/use-chat-id";
// import { useSocket } from "@/hooks/use-socket";
// import type { MessageType } from "@/types/chat";
// import { useEffect, useState } from "react";

// const SingleChat = () => {
//   const chatId = useChatId();
//   const { fetchSingleChat, isSingleChatLoading, singleChat } = useChat();
//   const { socket, typingUsers } = useSocket();
//   const { user } = useAuth();

//   const [replyTo, setReplyTo] = useState<MessageType | null>(null);

//   const currentUserId = user?._id || null;
//   const chat = singleChat?.chat;
//   const messages = singleChat?.messages || [];

//   const chatTypingUsers = typingUsers[chatId || ""] || [];
//   const otherTypingUsers = chatTypingUsers.filter((id) => id !== currentUserId);
//   const isTyping = otherTypingUsers.length > 0;

//   useEffect(() => {
//     if (!chatId) return;
//     fetchSingleChat(chatId);
//   }, [fetchSingleChat, chatId]);

//   /**
//    * Socket chat room handling:
//    * - Join the current chat room when chatId and socket are available
//    * - Leave the previous chat room when chatId changes or component unmounts
//    */
//   useEffect(() => {
//     if (!chatId || !socket) return;

//     socket.emit("chat:join", chatId);

//     return () => {
//       socket.emit("chat:leave", chatId);
//       socket.emit("stopTyping", chatId);
//     };
//   }, [chatId, socket]);

//   if (isSingleChatLoading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <Spinner className="w-11 h-11 text-primary" />
//       </div>
//     );
//   }

//   if (!chat) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <p className="text-lg">Chat not found</p>
//       </div>
//     );
//   }

//   return (
//     // <div className="relative h-svh flex flex-col">
//     <div className="relative h-full flex flex-col">
//       <ChatHeader
//         chat={chat}
//         currentUserId={currentUserId}
//         isTyping={isTyping}
//         typingUsers={otherTypingUsers}
//       />

//       {/* <div className="flex-1 overflow-y-auto bg-background"> */}
//       <div className="flex-1 overflow-y-auto bg-background pb-px">
//         {messages.length === 0 ? (
//           <EmptyState
//             title="Start a conversation"
//             description="No messages yet. Send the first message"
//           />
//         ) : (
//           <ChatBody chatId={chatId} messages={messages} onReply={setReplyTo} />
//         )}
//       </div>

//       <ChatFooter
//         replyTo={replyTo}
//         chatId={chatId}
//         currentUserId={currentUserId}
//         onCancelReply={() => setReplyTo(null)}
//       />
//     </div>
//   );
// };

// export default SingleChat;

import ChatBody from "@/components/chat/chat-body";
import ChatHeader from "@/components/chat/chat-header";
import EmptyState from "@/components/empty-state";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/use-auth";
import { useChat } from "@/hooks/use-chat";
import useChatId from "@/hooks/use-chat-id";
import { useSocket } from "@/hooks/use-socket";
import type { MessageType } from "@/types/chat";
import { useEffect, useState, useRef } from "react";
import ChatFooter from "@/components/chat/chat-footer";

const SingleChat = () => {
  const chatId = useChatId();
  const { fetchSingleChat, isSingleChatLoading, singleChat } = useChat();
  const { socket, typingUsers } = useSocket();
  const { user } = useAuth();

  const [replyTo, setReplyTo] = useState<MessageType | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUserId = user?._id || null;
  const chat = singleChat?.chat;
  const messages = singleChat?.messages || [];

  const chatTypingUsers = typingUsers[chatId || ""] || [];
  const otherTypingUsers = chatTypingUsers.filter((id) => id !== currentUserId);
  const isTyping = otherTypingUsers.length > 0;

  // Auto scroll to latest message on load
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages.length]);

  useEffect(() => {
    if (!chatId) return;
    fetchSingleChat(chatId);
  }, [fetchSingleChat, chatId]);

  useEffect(() => {
    if (!chatId || !socket) return;

    socket.emit("chat:join", chatId);

    return () => {
      socket.emit("chat:leave", chatId);
      socket.emit("stopTyping", chatId);
    };
  }, [chatId, socket]);

  if (isSingleChatLoading) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <Spinner className="w-11 h-11 text-primary" />
      </div>
    );
  }

  if (!chat) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <p className="text-lg">Chat not found</p>
      </div>
    );
  }

  return (
    // Fixed height container using dvh
    <div className="h-dvh flex flex-col overflow-hidden bg-background">
      {/* Header - Always visible */}
      <div className="flex-shrink-0">
        <ChatHeader
          chat={chat}
          currentUserId={currentUserId}
          isTyping={isTyping}
          typingUsers={otherTypingUsers}
        />
      </div>

      {/* Scrollable messages area - takes remaining space */}
      <div
        className="flex-1 overflow-y-auto overscroll-contain"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="pb-2">
          {messages.length === 0 ? (
            <EmptyState
              title="Start a conversation"
              description="No messages yet. Send the first message"
            />
          ) : (
            <>
              <ChatBody
                chatId={chatId}
                messages={messages}
                onReply={setReplyTo}
              />
              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Footer - Always visible */}
      <div className="flex-shrink-0">
        <ChatFooter
          replyTo={replyTo}
          chatId={chatId}
          currentUserId={currentUserId}
          onCancelReply={() => setReplyTo(null)}
        />
      </div>
    </div>
  );
};

export default SingleChat;
