"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectConversationsByType } from "../../lib/features/chat/chatSlice";

export default function ChatsList() {
  const conversations = useSelector((state) =>
    selectConversationsByType(state, "direct")
  );

  return (
    <>
      {conversations.map((convo) => (
        <Link
          key={convo.id}
          href={`/chats/${convo.id}`}
          className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800/50"
        >
          <div className="h-12 w-12 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0 overflow-hidden">
            {convo.avatar ? (
              <img
                src={convo.avatar}
                alt={convo.title}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between">
              <h4 className="font-medium text-slate-900 dark:text-slate-100">
                {convo.title}
              </h4>
              <span className="text-xs text-slate-400">
                {convo.lastMessageAt}
              </span>
            </div>
            <p className="text-sm text-slate-500 truncate">{convo.subtitle}</p>
          </div>
        </Link>
      ))}
    </>
  );
}
