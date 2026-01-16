// app/chats/page.tsx

import React from "react";

export default function EmptyState() {
  return (
    <div className="hidden md:flex h-full flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 border-b-8 border-green-500">
      <div className="text-center p-10">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Click on a chat to start messaging
        </p>
      </div>
    </div>
  );
}
