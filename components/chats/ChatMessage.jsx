import React from "react";
import { CheckCheck } from "lucide-react";
import CustomAudioPlayer from "./CustomAudioPlayer";

// 1. Professional, accessible color palette for sender names
const getNameColor = (name) => {
  const colors = [
    "text-orange-600 dark:text-orange-400",
    "text-pink-600 dark:text-pink-400",
    "text-purple-600 dark:text-purple-400",
    "text-blue-600 dark:text-blue-400",
    "text-teal-600 dark:text-teal-400",
    "text-amber-600 dark:text-amber-400",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

export default function ChatMessage({ msg, isSequence }) {
  const isMe = msg.senderId === "me";
  const nameColor = !isMe ? getNameColor(msg.senderName || "User") : "";

  return (
    <div
      className={`flex flex-col ${
        isMe ? "items-end" : "items-start"
      } mb-1 group`}
    >
      <div
        className={`relative max-w-[85%] md:max-w-[65%] min-w-[120px] px-3 py-1.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] text-[15px] leading-[22px]
          ${
            isMe
              ? "bg-[#d9fdd3] dark:bg-[#005c4b] rounded-lg rounded-tr-none text-slate-900 dark:text-slate-100"
              : "bg-white dark:bg-[#202c33] rounded-lg rounded-tl-none text-slate-900 dark:text-slate-100"
          }
          ${isSequence ? "mt-0.5 !rounded-lg" : "mt-2"} 
        `}
      >
        {/* --- TAIL SVG --- */}
        {/* Only show tail if it's the FIRST message in a sequence */}
        {!isSequence && (
          <span
            className={`absolute top-0 w-[10px] h-[13px] ${
              isMe ? "-right-[10px]" : "-left-[10px]"
            }`}
          >
            <svg
              viewBox="0 0 8 13"
              height="13"
              width="8"
              className="block w-full h-full overflow-visible"
            >
              <path
                opacity="1"
                d={
                  isMe
                    ? "M5.188,1H0v11.193l6.467-8.625C7.526,2.156,6.958,1,5.188,1z"
                    : "M2.812,1H8v11.193l-6.467-8.625C0.474,2.156,1.042,1,2.812,1z"
                }
                className={
                  isMe
                    ? "fill-[#d9fdd3] dark:fill-[#005c4b]"
                    : "fill-white dark:fill-[#202c33]"
                }
              />
            </svg>
          </span>
        )}

        {/* --- CONTENT CONTAINER --- */}
        <div className="flex flex-col">
          {/* 1. SENDER NAME (Communities/Groups) */}
          {!isMe && !isSequence && (
            <span
              className={`text-[12.5px] font-bold mb-1 leading-4 ${nameColor} cursor-pointer hover:underline`}
            >
              {msg.senderName}
            </span>
          )}

          {/* 2. MEDIA (Image) */}
          {msg.fileType === "image" && (
            <div
              className={`mb-1 overflow-hidden relative ${
                isSequence ? "mt-0" : "mt-1"
              } rounded-md`}
            >
              <img
                src={msg.fileData}
                alt="Shared"
                className="block w-full h-auto object-cover max-h-[350px] min-h-[100px] bg-slate-100 dark:bg-slate-700"
              />
            </div>
          )}

          {/* 3. MEDIA (Audio) */}
          {msg.fileType === "audio" && (
            <div className={!isMe ? "pr-2" : ""}>
              <CustomAudioPlayer src={msg.fileData} messageIsFromMe={isMe} />
            </div>
          )}

          {/* 4. TEXT CONTENT + TIMESTAMP WRAPPER */}
          {/* We use a specialized layout here: Text flows, and timestamp 'floats' at the end to save space */}
          <div className="relative">
            {msg.text && (
              <span className="whitespace-pre-wrap break-words">
                {msg.text}
                {/* Invisible padding to prevent text from being covered by the absolute timestamp if line is full */}
                <span className="inline-block w-14"></span>
              </span>
            )}

            {/* TIMESTAMP */}
            <div
              className={`
                        float-right flex items-center gap-1 select-none h-4 
                        ${msg.text ? "-mt-1 mb-0 relative top-[4px]" : "mt-1"}
                    `}
            >
              <span
                className={`text-[11px] whitespace-nowrap ${
                  isMe
                    ? "text-green-900/60 dark:text-green-100/60"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>

              {isMe && (
                <span
                  className={
                    msg.read
                      ? "text-[#53bdeb]"
                      : "text-slate-500/60 dark:text-slate-400/60"
                  }
                >
                  <CheckCheck size={15} strokeWidth={2} />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
