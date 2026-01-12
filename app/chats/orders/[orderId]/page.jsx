"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatThread from "../../../../components/chats/ChatThread";
import {
  selectConversation,
  selectMessages,
  sendMessage,
} from "../../../../lib/features/chat/chatSlice";

export default function OrderDetailPage({ params }) {
  const { orderId } = React.use(params);
  const dispatch = useDispatch();
  const conversation = useSelector((state) =>
    selectConversation(state, "order", orderId)
  );
  const messages = useSelector((state) =>
    selectMessages(state, "order", orderId)
  );

  const handleSend = (text) => {
    dispatch(
      sendMessage({
        conversationType: "order",
        conversationId: orderId,
        text,
        senderId: "me",
        senderName: "You",
      })
    );
  };

  const handleSendFile = (fileData) => {
    dispatch(
      sendMessage({
        conversationType: "order",
        conversationId: orderId,
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
    return <div className="p-6 text-slate-600">Order not found.</div>;
  }

  return (
    <ChatThread
      backHref="/chats/orders"
      title={conversation.title}
      subtitle={conversation.subtitle}
      avatar={conversation.avatar}
      messages={messages}
      onSend={handleSend}
      onSendFile={handleSendFile}
      align="left"
    />
  );
}
