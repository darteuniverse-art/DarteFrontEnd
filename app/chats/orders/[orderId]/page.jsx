// "use client";

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ChatThread from "../../../../components/chats/ChatThread";
// import {
//   selectConversation,
//   selectMessages,
//   sendMessage,
// } from "../../../../lib/features/chat/chatSlice";

// export default function OrderDetailPage({ params }) {
//   const { orderId } = React.use(params);
//   const dispatch = useDispatch();
//   const conversation = useSelector((state) =>
//     selectConversation(state, "order", orderId)
//   );
//   const messages = useSelector((state) =>
//     selectMessages(state, "order", orderId)
//   );

//   const handleSend = (text) => {
//     dispatch(
//       sendMessage({
//         conversationType: "order",
//         conversationId: orderId,
//         text,
//         senderId: "me",
//         senderName: "You",
//       })
//     );
//   };

//   const handleSendFile = (fileData) => {
//     dispatch(
//       sendMessage({
//         conversationType: "order",
//         conversationId: orderId,
//         senderId: "me",
//         senderName: "You",
//         fileType: fileData.type,
//         fileData: fileData.data,
//         fileName: fileData.name,
//         fileSize: fileData.size,
//       })
//     );
//   };

//   if (!conversation) {
//     return <div className="p-6 text-slate-600">Order not found.</div>;
//   }

//   return (
//     <ChatThread
//       backHref="/chats/orders"
//       title={conversation.title}
//       subtitle={conversation.subtitle}
//       avatar={conversation.avatar}
//       messages={messages}
//       onSend={handleSend}
//       onSendFile={handleSendFile}
//       align="left"
//     />
//   );
// }

"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
// 1. Import the specialized Order component
import OrderChatThread from "../../../../components/chats/OrderChatThread";
import {
  selectConversation,
  selectMessages,
  sendMessage,
} from "../../../../lib/features/chat/chatSlice";

export default function OrderDetailPage({ params }) {
  // Unwrap params for Next.js 15+ support (React.use)
  const { orderId } = React.use(params);
  const dispatch = useDispatch();

  // 2. Select data from Redux
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
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        Order conversation not found.
      </div>
    );
  }

  // 3. Transform Redux data into the 'orderData' format required by OrderChatThread
  const orderContextData = {
    id: orderId,
    vendorName:
      conversation.vendorName || conversation.title || "Unknown Vendor",
    status: conversation.status || "Processing",
    product: conversation.productName || "Order Item",
    price: conversation.price || "$0.00",
    details: conversation.details || conversation.subtitle || "View details",
    image:
      conversation.image ||
      conversation.avatar ||
      "https://via.placeholder.com/150",
  };

  // 4. Transform messages to match OrderChatThread expected format (time instead of createdAt)
  const transformedMessages = messages.map((msg) => ({
    ...msg,
    time: msg.createdAt || msg.time,
  }));

  return (
    <OrderChatThread
      backHref="/chats/orders"
      orderData={orderContextData}
      messages={transformedMessages}
      onSend={handleSend}
      onSendFile={handleSendFile}
    />
  );
}
