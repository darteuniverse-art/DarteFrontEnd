"use client";

import {
  SendHorizontal,
  Image as ImageIcon,
  File,
  Plus,
  Mic,
  Smile,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const MessageInputs = ({ value, onChange, onSend, onSendFile }) => {
  const [showMenu, setShowMenu] = useState(false);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSend?.();
    }
  };

  const handleImageClick = () => {
    imageInputRef.current?.click();
    setShowMenu(false);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
    setShowMenu(false);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onSendFile?.({
          type: "image",
          data: event.target?.result,
          name: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
    // Reset value so same file can be selected again
    e.target.value = "";
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onSendFile?.({
        type: "file",
        name: file.name,
        size: file.size,
      });
    }
    e.target.value = "";
  };

  const isTextEmpty = !value || value.trim().length === 0;

  return (
    <footer className="w-full bg-[#f0f2f5] dark:bg-[#202c33] px-4 py-2 flex items-center gap-2 shrink-0 z-20 relative">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageSelect}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Emoji Button (Visual only) */}
      <button className="text-slate-500 dark:text-slate-400 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition hidden md:block">
        <Smile size={24} />
      </button>

      {/* Attachment Menu Wrapper */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className={`
            p-2 rounded-full transition duration-200 ease-in-out
            ${
              showMenu
                ? "bg-slate-200 dark:bg-slate-700 rotate-45"
                : "hover:bg-black/5 dark:hover:bg-white/10"
            }
            text-slate-500 dark:text-slate-400
          `}
        >
          <Plus size={24} />
        </button>

        {/* Floating Menu */}
        {showMenu && (
          <div className="absolute bottom-16 left-0 min-w-[180px] bg-white dark:bg-[#233138] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col py-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <button
              type="button"
              onClick={handleImageClick}
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-[#182229] transition text-slate-700 dark:text-slate-200"
            >
              <div className="text-purple-500">
                <ImageIcon size={20} />
              </div>
              <span className="text-sm font-medium">Photos & Videos</span>
            </button>

            <button
              type="button"
              onClick={handleFileClick}
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-[#182229] transition text-slate-700 dark:text-slate-200"
            >
              <div className="text-indigo-500">
                <File size={20} />
              </div>
              <span className="text-sm font-medium">Document</span>
            </button>
          </div>
        )}
      </div>

      {/* Input Field */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 bg-white dark:bg-[#2a3942] rounded-full flex items-center px-4 py-2 mx-2"
      >
        <input
          type="text"
          placeholder="Type a message"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-slate-100 placeholder-slate-500 text-[15px]"
        />
      </form>

      {/* Send / Mic Button Logic */}
      <div className="flex items-center justify-center w-10 h-10">
        {isTextEmpty ? (
          <button
            type="button"
            className="text-slate-500 dark:text-slate-400 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition"
          >
            <Mic size={24} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="text-green-600 dark:text-green-500 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition transform hover:scale-110 active:scale-95"
          >
            <SendHorizontal size={24} />
          </button>
        )}
      </div>
    </footer>
  );
};

export default MessageInputs;
