export function getChatViewState(pathname) {
  const isCommunities = pathname.includes("/chats/communities");
  const isOrders = pathname.includes("/chats/orders");
  const isChats = !isCommunities && !isOrders;

  const activeTab = isChats
    ? "chats"
    : isCommunities
    ? "communities"
    : "orders";

  const listPaths = ["/chats", "/chats/communities", "/chats/orders"];
  const isListView = listPaths.includes(pathname);
  const showSidebarOnMobile = isListView;

  return { activeTab, isListView, showSidebarOnMobile };
}
