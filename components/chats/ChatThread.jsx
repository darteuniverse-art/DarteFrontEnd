"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MessageInputs from "./MessageInputs";
import { CheckCheck } from "lucide-react";

export default function ChatThread({
  backHref = "/chats",
  title,
  subtitle,
  avatar,
  messages,
  onSend,
  onSendFile,
  align = "left",
}) {
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  // 1. Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend?.(input.trim());
    setInput("");
  };

  const handleSendFile = (fileData) => {
    onSendFile?.(fileData);
  };

  return (
    <div
      className="flex flex-col h-full bg-[#EFE7DD] dark:bg-[#0b141a] relative"
      style={{
        backgroundImage:
          "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* HEADER */}
      <header className="h-[60px] bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 justify-between shrink-0 z-10 sticky top-0 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href={backHref}
            className="md:hidden text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </Link>

          {/* Avatar */}
          <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-300 dark:bg-slate-700 shrink-0">
            {avatar ? (
              <img
                src={avatar}
                alt={title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-slate-500 font-bold">
                {title?.[0]}
              </div>
            )}
          </div>

          <div className="flex flex-col cursor-pointer">
            <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm md:text-base leading-tight">
              {title}
            </span>
            {subtitle && (
              <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight truncate max-w-[150px] md:max-w-xs">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4 md:gap-6 text-green-600 dark:text-green-500">
          <button className="hover:bg-slate-200 dark:hover:bg-slate-800 p-2 rounded-full transition">
            📞
          </button>
          <button className="hover:bg-slate-200 dark:hover:bg-slate-800 p-2 rounded-full transition">
            🎥
          </button>
        </div>
      </header>

      {/* MESSAGES LIST */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:px-16 md:py-6 space-y-2 custom-scrollbar"
      >
        {messages.map((msg) => {
          const isMe = align === "mixed" ? msg.senderId === "me" : false;

          return (
            <div
              key={msg.id}
              className={`flex w-full ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                  relative px-2 py-1 rounded-lg shadow-sm max-w-[85%] md:max-w-[65%] min-w-[100px]
                  ${
                    isMe
                      ? "bg-[#d9fdd3] dark:bg-[#005c4b] text-slate-900 dark:text-slate-100 rounded-tr-none"
                      : "bg-white dark:bg-[#202c33] text-slate-900 dark:text-slate-100 rounded-tl-none"
                  }
                `}
              >
                {/* 1. Image Attachment */}
                {msg.fileType === "image" && msg.fileData && (
                  <div className="mb-1 rounded overflow-hidden">
                    <img
                      src={msg.fileData}
                      alt="Shared"
                      className="w-full h-auto object-cover max-h-[300px]"
                    />
                  </div>
                )}

                {/* 2. File Attachment */}
                {msg.fileType === "file" && msg.fileName && (
                  <div className="flex items-center gap-3 p-3 bg-black/5 dark:bg-white/10 rounded mb-1">
                    <div className="h-8 w-8 bg-red-500 rounded flex items-center justify-center text-white text-[10px] font-bold">
                      PDF
                    </div>
                    <div className="text-sm font-medium truncate max-w-[150px]">
                      {msg.fileName}
                    </div>
                  </div>
                )}

                {/* 3. Message Content & Time Wrapper */}
                {/* This flex-wrap layout prevents the time from overlapping the text */}
                <div
                  className={`flex flex-wrap items-end gap-x-2 ${
                    isMe ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.text && (
                    <p className="pt-1 text-[15px] leading-[19px] text-slate-900 dark:text-slate-100">
                      {msg.text}
                      {/* Invisible spacer: forces the timestamp to wrap if text is too long */}
                      <span className="invisible inline-block w-12"></span>
                    </p>
                  )}

                  {/* Timestamp */}
                  <div
                    className={`
                       text-[11px] h-4 flex items-center gap-1 shrink-0 ml-auto pb-1
                       ${
                         isMe
                           ? "text-green-900/60 dark:text-green-100/60"
                           : "text-slate-500 dark:text-slate-400"
                       }
                       ${!msg.text ? "-mt-1" : "-mt-3"} 
                    `}
                  >
                    <span>{msg.createdAt}</span>
                    {isMe && (
                      <CheckCheck
                        size={16}
                        className={
                          msg.isRead ? "text-blue-500" : "currentColor"
                        }
                      />
                    )}
                  </div>
                </div>

                {/* 4. The "Tail" Triangle */}
                <div
                  className={`absolute top-0 w-0 h-0 border-[8px] border-transparent 
                  ${
                    isMe
                      ? "-right-[8px] border-t-[#d9fdd3] dark:border-t-[#005c4b] border-l-[#d9fdd3] dark:border-l-[#005c4b]"
                      : "-left-[8px] border-t-white dark:border-t-[#202c33] border-r-white dark:border-r-[#202c33]"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <MessageInputs
        value={input}
        onChange={setInput}
        onSend={handleSend}
        onSendFile={handleSendFile}
      />
    </div>
  );
}
