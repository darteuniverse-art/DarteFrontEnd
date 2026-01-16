"use client";

import {
  SendHorizontal,
  Image as ImageIcon,
  File,
  Plus,
  Mic,
  Smile,
  Trash2,
} from "lucide-react";
import React from "react";
import EmojiPicker from "emoji-picker-react";
import { useMessageHandling } from "../../hooks/useMessageHandling";

const MessageInputs = ({ value, onChange, onSend, onSendFile }) => {
  const {
    showMenu,
    setShowMenu,
    showEmoji,
    setShowEmoji,
    isRecording,
    recordingDuration,
    imageInputRef,
    fileInputRef,
    menuRef,
    emojiRef,
    handleImageSelect,
    handleFileSelect,
    startRecording,
    stopAndSendRecording,
    cancelRecording,
    formatTime,
    handleEmojiClick,
    handleImageClick,
    handleFileClick,
  } = useMessageHandling();

  const isTextEmpty = !value || value.trim().length === 0;

  return (
    <footer className="w-full bg-[#f0f2f5] dark:bg-[#202c33] px-2 md:px-4 py-2 flex items-center gap-2 shrink-0 z-50 relative">
      {/* Hidden Inputs */}
      <input
        type="file"
        ref={imageInputRef}
        onChange={(e) => handleImageSelect(e, onSendFile)}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileSelect(e, onSendFile)}
        className="hidden"
      />

      {/* 1. EMOJI BUTTON */}
      <div className="relative" ref={emojiRef}>
        <button
          onClick={() => setShowEmoji(!showEmoji)}
          disabled={isRecording} // Disable while recording
          className={`p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition hidden md:block ${
            showEmoji ? "text-green-600" : "text-slate-500 dark:text-slate-400"
          }`}
        >
          <Smile size={24} />
        </button>

        {showEmoji && (
          <div className="absolute bottom-16 left-0 z-50 shadow-2xl rounded-xl">
            <EmojiPicker
              onEmojiClick={(emojiObj) =>
                handleEmojiClick(emojiObj, value, onChange)
              }
              theme="auto"
              searchDisabled={false}
              width={300}
              height={400}
            />
          </div>
        )}
      </div>

      {/* 2. ATTACHMENT MENU */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          disabled={isRecording}
          className={`p-2 rounded-full transition duration-200 ease-in-out ${
            showMenu
              ? "bg-slate-200 dark:bg-slate-700 rotate-45"
              : "hover:bg-black/5 dark:hover:bg-white/10"
          } text-slate-500 dark:text-slate-400`}
        >
          <Plus size={24} />
        </button>
        {showMenu && (
          <div className="absolute bottom-16 left-0 min-w-[160px] bg-white dark:bg-[#233138] rounded-xl shadow-lg flex flex-col py-2 z-50 overflow-hidden">
            <button
              onClick={handleImageClick}
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-[#182229] text-slate-700 dark:text-slate-200"
            >
              <ImageIcon size={20} className="text-purple-500" /> Photos
            </button>
            <button
              onClick={handleFileClick}
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-[#182229] text-slate-700 dark:text-slate-200"
            >
              <File size={20} className="text-indigo-500" /> Document
            </button>
          </div>
        )}
      </div>

      {/* 3. INPUT AREA vs RECORDING UI */}
      <div className="flex-1 mx-2">
        {isRecording ? (
          // RECORDING STATE UI
          <div className="flex items-center justify-between bg-white dark:bg-[#2a3942] rounded-lg px-4 py-2 animate-pulse border border-red-200 dark:border-red-900/30">
            <div className="flex items-center gap-3">
              <Mic size={20} className="text-red-500 animate-pulse" />
              <span className="text-slate-500 dark:text-slate-300 text-sm font-mono">
                {formatTime(recordingDuration)}
              </span>
            </div>
            <button
              onClick={cancelRecording}
              className="flex items-center gap-1 text-red-500 hover:text-red-600 font-medium text-sm px-2 py-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
            >
              <Trash2 size={16} /> Cancel
            </button>
          </div>
        ) : (
          // TEXT INPUT STATE UI
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!isTextEmpty) onSend?.();
            }}
            className="w-full bg-white dark:bg-[#2a3942] rounded-lg flex items-center px-4 py-2"
          >
            <input
              type="text"
              placeholder="Type a message"
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-slate-100 placeholder-slate-500 text-[15px]"
            />
          </form>
        )}
      </div>

      {/* 4. SEND / MIC BUTTON */}
      <div className="flex items-center justify-center w-10 h-10 shrink-0">
        {isTextEmpty && !isRecording ? (
          <button
            onClick={() => startRecording(onSendFile)}
            className="text-slate-500 dark:text-slate-400 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition"
          >
            <Mic size={24} />
          </button>
        ) : (
          <button
            onClick={isRecording ? stopAndSendRecording : onSend}
            className="text-green-600 dark:text-green-500 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition transform hover:scale-110 active:scale-95"
          >
            {isRecording ? (
              <SendHorizontal
                size={24}
                className="fill-current animate-pulse"
              />
            ) : (
              <SendHorizontal size={24} />
            )}
          </button>
        )}
      </div>
    </footer>
  );
};

export default MessageInputs;
