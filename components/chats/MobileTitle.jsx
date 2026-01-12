"use client";

export default function MobileTitle({ activeTab }) {
  const title =
    activeTab === "chats"
      ? "Chats"
      : activeTab === "communities"
      ? "Communities"
      : "Orders";

  return (
    <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shrink-0">
      <span className="text-xl font-bold text-green-600 dark:text-green-500">
        {title}
      </span>
    </div>
  );
}
