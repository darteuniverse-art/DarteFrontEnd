"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronRight,
  MoreVertical,
  MapPin,
  RotateCcw,
  Star,
  ArrowLeft,
} from "lucide-react";
import MessageInputs from "./MessageInputs";
import ChatMessage from "./ChatMessage";

export default function OrderChatThread({
  orderData,
  backHref = "/chats/orders",
  messages,
  onSend,
  onSendFile,
  onTrackOrder,
  onReturnOrder,
  onReviewOrder,
}) {
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    // 1. h-[100dvh] ensures it fits the mobile screen exactly, ignoring the URL bar
    <div className="flex flex-col h-[100dvh] bg-[#EFE7DD] dark:bg-[#0b141a] relative w-full">
      {/* WRAPPER: Sticky Header Elements */}
      <div className="flex flex-col shrink-0 z-20 bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800">
        {/* A. HEADER: Flexible height to handle long titles on mobile */}
        <header className="min-h-[60px] py-2 flex items-center px-3 md:px-4 justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            {/* Back Button (Mobile Only) */}
            <Link
              href={backHref}
              className="md:hidden p-1 -ml-1 text-slate-600 dark:text-slate-300"
            >
              <ArrowLeft size={22} />
            </Link>

            {/* Title Info */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm md:text-base truncate">
                  Order {orderData.id}
                </span>
                {/* Status Badge: Smaller text on mobile */}
                <span className="px-1.5 py-0.5 rounded text-[10px] md:text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 font-bold uppercase tracking-wider whitespace-nowrap">
                  {orderData.status}
                </span>
              </div>
              <span className="text-xs text-slate-500 truncate">
                Sold by {orderData.vendorName}
              </span>
            </div>
          </div>

          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition shrink-0">
            <MoreVertical
              size={20}
              className="text-slate-600 dark:text-slate-400"
            />
          </button>
        </header>

        {/* B. CONTEXT STRIP: Product Details */}
        <div className="px-3 space-y-2 py-2 md:px-4 md:py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition group">
          <div className="h-10 w-10 md:h-12 md:w-12 bg-slate-200 rounded-md overflow-hidden shrink-0 border border-slate-100 dark:border-slate-700">
            <img
              src={orderData.image}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-green-600 transition-colors">
              {orderData.product}
            </h4>
            <p className="text-xs text-slate-500 truncate">
              {orderData.details} • {orderData.price}
            </p>
          </div>
          <ChevronRight size={16} className="text-slate-400 shrink-0" />
        </div>

        {/* C. QUICK ACTIONS: Horizontal Scroll for small screens */}
        {/* 3. QUICK ACTIONS: Added 'pt-2' for spacing */}
        <div className="px-3 md:px-4 pb-3 pt-2 flex items-center gap-2 overflow-x-auto no-scrollbar mask-gradient-right">
          <ActionButton
            onClick={onTrackOrder}
            icon={<MapPin size={14} />}
            label="Track"
          />
          <ActionButton
            onClick={onReturnOrder}
            icon={<RotateCcw size={14} />}
            label="Return"
          />
          <ActionButton
            onClick={onReviewOrder}
            icon={<Star size={14} />}
            label="Review"
          />
        </div>
      </div>

      {/* 2. MESSAGES AREA: Flexible grow */}
      {/* 4. MESSAGES AREA */}
      <div className="flex-1 relative overflow-hidden bg-[#EFE7DD] dark:bg-[#0b141a] transition-colors duration-200">
        {/* A. Background Pattern Layer (Absolute Positioned) */}
        <div
          className="absolute inset-0 z-0 opacity-40 dark:opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
            backgroundRepeat: "repeat",
          }}
        />

        {/* B. Scrollable Content Layer */}
        <div
          ref={scrollRef}
          className="relative z-10 h-full overflow-y-auto p-3 md:p-4 custom-scrollbar"
        >
          {messages.map((msg) => (
            <ChatMessage key={msg.id} msg={msg} isMe={msg.senderId === "me"} />
          ))}
        </div>
      </div>

      {/* 3. FOOTER */}
      <MessageInputs
        value={input}
        onChange={setInput}
        onSend={() => {
          onSend(input);
          setInput("");
        }}
        onSendFile={onSendFile}
      />
    </div>
  );
}

// --- SUB-COMPONENTS for cleaner code ---

// A responsive button component that handles whitespace nicely
const ActionButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium transition whitespace-nowrap border border-transparent hover:border-slate-300 dark:hover:border-slate-600 shrink-0"
  >
    {icon}
    <span>{label}</span>
  </button>
);
