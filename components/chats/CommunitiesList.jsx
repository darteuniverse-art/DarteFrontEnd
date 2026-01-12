"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectConversationsByType } from "../../lib/features/chat/chatSlice";

export default function CommunitiesList() {
  const conversations = useSelector((state) =>
    selectConversationsByType(state, "community")
  );

  return (
    <>
      {conversations.map((convo) => (
        <Link
          key={convo.id}
          href={`/chats/communities/${convo.id}`}
          className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800/50"
        >
          <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center shrink-0 overflow-hidden">
            {convo.avatar ? (
              <img
                src={convo.avatar}
                alt={convo.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xl">📣</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-slate-900 dark:text-slate-100">
              {convo.title}
            </h4>
            <p className="text-sm text-slate-500 truncate">{convo.subtitle}</p>
          </div>
        </Link>
      ))}
    </>
  );
}
