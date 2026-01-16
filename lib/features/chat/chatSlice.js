import { createSlice, nanoid } from "@reduxjs/toolkit";

const buildConversationKey = (type, id) => `${type}:${id}`;

const initialConversations = [
  {
    id: "1",
    type: "direct",
    title: "Alice Design",
    subtitle: "Online",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AD",
    lastMessageAt: "10:05 AM",
  },
  {
    id: "2",
    type: "direct",
    title: "Bob UI",
    subtitle: "Last seen recently",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=BU",
    lastMessageAt: "9:40 AM",
  },
  {
    id: "1",
    type: "community",
    title: "Community 1",
    subtitle: "42 members",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=Com1",
    lastMessageAt: "10:15 AM",
  },
  {
    id: "2",
    type: "community",
    title: "Community 2",
    subtitle: "18 members",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=Com2",
    lastMessageAt: "9:55 AM",
  },
  {
    id: "1001",
    type: "order",
    title: "Pizza Palace",
    subtitle: "2x Pizza, 1x Coke • $24.00",
    avatar: "https://api.dicebear.com/7.x/icons/svg?seed=Ord1",
    lastMessageAt: "9:30 AM",
    status: "Pending",
    vendorName: "Pizza Palace",
    productName: "Margherita Pizza",
    price: "$24.00",
    details: "2x Pizza, 1x Coke",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=150&h=150&fit=crop",
  },
  {
    id: "1002",
    type: "order",
    title: "Burger Joint",
    subtitle: "1x Burger, Fries • $14.50",
    avatar: "https://api.dicebear.com/7.x/icons/svg?seed=Ord2",
    lastMessageAt: "10:00 AM",
    status: "Preparing",
    vendorName: "Burger Joint",
    productName: "Classic Burger",
    price: "$14.50",
    details: "1x Burger, Fries",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&h=150&fit=crop",
  },
];

const initialMessages = {
  [buildConversationKey("direct", "1")]: [
    {
      id: "m1",
      senderId: "them",
      senderName: "Alice Design",
      senderAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=AD",
      text: "Hey! Did you see the new design?",
      createdAt: "10:00 AM",
    },
    {
      id: "m2",
      senderId: "me",
      senderName: "You",
      senderAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=YU",
      text: "Yes, I'm looking at it right now. The green accents look great.",
      createdAt: "10:01 AM",
    },
    {
      id: "m3",
      senderId: "me",
      senderName: "You",
      senderAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=YU",
      text: "We need to make sure dark mode works perfectly though.",
      createdAt: "10:02 AM",
    },
    {
      id: "m4",
      senderId: "them",
      senderName: "Alice Design",
      senderAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=AD",
      text: "Agreed. I'll test the slate-900 backgrounds.",
      createdAt: "10:05 AM",
    },
  ],
  [buildConversationKey("community", "1")]: [
    {
      id: "c1",
      senderId: "admin",
      senderName: "Admin",
      senderAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=ADM",
      text: "Welcome to the community!",
      createdAt: "10:00 AM",
    },
    {
      id: "c2",
      senderId: "member1",
      senderName: "Member 1",
      senderAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=M1",
      text: "Thanks for the update!",
      createdAt: "10:15 AM",
    },
  ],
  [buildConversationKey("order", "1001")]: [
    {
      id: "o1",
      senderId: "owner",
      senderName: "Store Owner",
      senderAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=SO",
      text: "Your order has been confirmed!",
      createdAt: "9:30 AM",
    },
    {
      id: "o2",
      senderId: "owner",
      senderName: "Store Owner",
      senderAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=SO",
      text: "We're preparing your items now.",
      createdAt: "10:00 AM",
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: initialConversations,
    messagesByKey: initialMessages,
  },
  reducers: {
    sendMessage: {
      reducer: (state, action) => {
        const {
          conversationType,
          conversationId,
          text,
          senderId = "me",
          senderName = "You",
          senderAvatar = "https://api.dicebear.com/7.x/initials/svg?seed=YU",
          fileType,
          fileData,
          fileName,
          fileSize,
        } = action.payload;
        const key = buildConversationKey(conversationType, conversationId);
        const message = {
          id: action.payload.id,
          senderId,
          senderName,
          senderAvatar,
          text,
          fileType,
          fileData,
          fileName,
          fileSize,
          createdAt: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        if (!state.messagesByKey[key]) {
          state.messagesByKey[key] = [];
        }
        state.messagesByKey[key].push(message);

        const convo = state.conversations.find(
          (c) => c.id === conversationId && c.type === conversationType
        );
        if (convo) {
          convo.lastMessageAt = message.createdAt;
        }
      },
      prepare: ({
        conversationType,
        conversationId,
        text,
        senderId,
        senderName,
        senderAvatar,
        fileType,
        fileData,
        fileName,
        fileSize,
      }) => ({
        payload: {
          id: nanoid(),
          conversationType,
          conversationId,
          text,
          senderId,
          senderName,
          senderAvatar,
          fileType,
          fileData,
          fileName,
          fileSize,
        },
      }),
    },
  },
});

export const { sendMessage } = chatSlice.actions;

export const selectConversationsByType = (state, type) =>
  state.chat.conversations.filter((c) => c.type === type);

export const selectMessages = (state, type, id) => {
  const key = buildConversationKey(type, id);
  return state.chat.messagesByKey[key] || [];
};

export const selectConversation = (state, type, id) =>
  state.chat.conversations.find((c) => c.type === type && c.id === id);

export default chatSlice.reducer;
