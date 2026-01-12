"use client";

import React from "react";

import { usePathname } from "next/navigation";
import TopNav from "../../components/chats/TopNav";
import MobileTitle from "../../components/chats/MobileTitle";
import SearchBar from "../../components/chats/SearchBar";
import ChatsList from "../../components/chats/ChatsList";
import CommunitiesList from "../../components/chats/CommunitiesList";
import OrdersList from "../../components/chats/OrdersList";
import MobileBottomNav from "../../components/chats/MobileBottomNav";
import { getChatViewState } from "../../components/chats/viewState";

export default function WhatsAppLayout({ children }) {
  const pathname = usePathname();
  const { activeTab, showSidebarOnMobile } = getChatViewState(pathname);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-200 dark:bg-slate-950 space-y-4">
      {/* SIDEBAR CONTAINER */}
      <aside
        className={`
          flex flex-col border-r border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900
          w-full md:w-[400px] h-full
          ${showSidebarOnMobile ? "flex" : "hidden md:flex"} 
        `}
      >
        <TopNav activeTab={activeTab} />
        <MobileTitle activeTab={activeTab} />
        <SearchBar activeTab={activeTab} />

        {/* DYNAMIC LIST CONTENT */}
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {activeTab === "chats" && <ChatsList />}
          {activeTab === "communities" && <CommunitiesList />}
          {activeTab === "orders" && <OrdersList />}
        </div>

        <MobileBottomNav activeTab={activeTab} />
      </aside>

      {/* MAIN CONTENT AREA */}
      <main
        className={`
          flex-1 flex-col h-full relative bg-slate-200 dark:bg-slate-950
          ${showSidebarOnMobile ? "hidden md:flex" : "flex"}
        `}
      >
        {children}
      </main>
    </div>
  );
}
