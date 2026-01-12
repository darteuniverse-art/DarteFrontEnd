"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatThread from "../../../components/chats/ChatThread";

import {
  selectConversation,
  selectMessages,
  sendMessage,
} from "../../../lib/features/chat/chatSlice";

export default function ChatScreen({ params }) {
  const { id } = React.use(params);
  const dispatch = useDispatch();
  const conversation = useSelector((state) =>
    selectConversation(state, "direct", id)
  );
  const messages = useSelector((state) => selectMessages(state, "direct", id));

  const handleSend = (text) => {
    dispatch(
      sendMessage({ conversationType: "direct", conversationId: id, text })
    );
  };

  const handleSendFile = (fileData) => {
    dispatch(
      sendMessage({
        conversationType: "direct",
        conversationId: id,
        senderId: "me",
        senderName: "You",
        fileType: fileData.type,
        fileData: fileData.data,
        fileName: fileData.name,
        fileSize: fileData.size,
      })
    );
  };

  if (!conversation) {
    return <div className="p-6 text-slate-600">Conversation not found.</div>;
  }

  return (
    <ChatThread
      backHref="/chats"
      title={conversation.title}
      subtitle={conversation.subtitle}
      avatar={conversation.avatar}
      messages={messages}
      onSend={handleSend}
      onSendFile={handleSendFile}
      align="mixed"
    />
  );
}
