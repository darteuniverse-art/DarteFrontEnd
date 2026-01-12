// app/chats/page.tsx

import React from "react";

export default function EmptyState() {
  return (
    <div className="hidden md:flex h-full flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 border-b-8 border-green-500">
      <div className="text-center p-10">
        <h1 className="text-3xl font-light text-slate-600 dark:text-slate-300 mb-4">
          WhatsApp Next
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Send and receive messages without keeping your phone online. <br />
          Use WhatsApp on up to 4 linked devices and 1 phone.
        </p>
        <div className="mt-8 text-xs text-slate-400 flex items-center justify-center gap-2">
          <span className="text-slate-400">🔒 End-to-end encrypted</span>
        </div>
      </div>
    </div>
  );
}
