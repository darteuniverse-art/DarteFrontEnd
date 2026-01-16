"use client";

import React, { useRef, useEffect } from "react";
import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import Link from "next/link";
import ChatMessage from "./ChatMessage"; // We will update this next
import MessageInputs from "./MessageInputs"; // The component we built earlier

export default function ChatThread({
  backHref,
  title,
  subtitle,
  avatar,
  messages = [],
  onSend,
  onSendFile,
}) {
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[#EFE7DD] dark:bg-[#0b141a] relative overflow-hidden">
      {/* 1. HEADER */}
      <header className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#202c33] shrink-0 border-b dark:border-slate-800 z-20">
        <Link
          href={backHref}
          className="md:hidden text-slate-600 dark:text-slate-300"
        >
          <ArrowLeft size={24} />
        </Link>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0">
          <img
            src={avatar || "/default-group.png"}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100 truncate text-[16px]">
            {title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {subtitle}
          </p>
        </div>

        {/* Actions (Visual Only) */}
        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
          <button>
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      {/* 2. BACKGROUND PATTERN */}
      <div
        className="absolute inset-0 z-0 opacity-40 dark:opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
          backgroundRepeat: "repeat",
        }}
      />

      {/* 3. MESSAGES AREA */}
      <div
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto p-3 md:p-4 custom-scrollbar"
      >
        {messages.map((msg, index) => {
          // Check if previous message was from same sender (to group visually)
          const isSequence =
            index > 0 && messages[index - 1].senderId === msg.senderId;
          return (
            <ChatMessage
              key={msg.id || index}
              msg={msg}
              isSequence={isSequence}
            />
          );
        })}
      </div>

      {/* 4. INPUTS */}
      <MessageInputs
        value=""
        // Note: Logic for managing input state should ideally be here or passed down.
        // For Redux integration, you might want to handle local state in MessageInputs
        // and just fire onSend with the final text.
        onSend={(text) => onSend(text)}
        onSendFile={onSendFile}
        onChange={(val) => {
          // If you need parent to control input state, pass it here.
          // Otherwise MessageInputs can handle its own state.
          onSend(val);
        }}
      />
    </div>
  );
}
