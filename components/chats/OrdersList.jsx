"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectConversationsByType } from "../../lib/features/chat/chatSlice";

export default function OrdersList() {
  const conversations = useSelector((state) =>
    selectConversationsByType(state, "order")
  );

  return (
    <>
      {conversations.map((convo) => (
        <Link
          key={convo.id}
          href={`/chats/orders/${convo.id}`}
          className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800/50"
        >
          <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 border border-green-200 dark:border-green-800 overflow-hidden">
            <span className="text-green-700 dark:text-green-500 text-xs font-bold">
              #{convo.id}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between">
              <h4 className="font-medium text-slate-900 dark:text-slate-100">
                {convo.title}
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-[10px] font-bold">
                {convo.status || "PENDING"}
              </span>
            </div>
            <p className="text-sm text-slate-500 truncate">{convo.subtitle}</p>
          </div>
        </Link>
      ))}
    </>
  );
}
