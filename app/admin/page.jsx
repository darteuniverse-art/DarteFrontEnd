"use client";
import { dummyAdminDashboardData } from "../../assets/assets";
import Loading from "../../components/Loading";
import OrdersAreaChart from "../../components/OrdersAreaChart";
import {
  CircleDollarSignIcon,
  ShoppingBasketIcon,
  StoreIcon,
  TagsIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₦";

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    products: 0,
    revenue: 0,
    orders: 0,
    stores: 0,
    allOrders: [],
  });

  const dashboardCardsData = [
    {
      title: "Total Products",
      value: dashboardData.products,
      icon: ShoppingBasketIcon,
    },
    {
      title: "Total Revenue",
      value: currency + dashboardData.revenue,
      icon: CircleDollarSignIcon,
    },
    { title: "Total Orders", value: dashboardData.orders, icon: TagsIcon },
    { title: "Total Stores", value: dashboardData.stores, icon: StoreIcon },
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyAdminDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="text-slate-500 dark:text-slate-400 w-full">
      <h1 className="text-2xl md:text-3xl font-bold">
        Admin{" "}
        <span className="text-slate-800 dark:text-white font-medium">
          Dashboard
        </span>
      </h1>

      {/* Responsive Grid Layout: 1 col mobile, 2 cols tablet, 4 cols desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 my-8">
        {dashboardCardsData.map((card, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-5 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-transparent"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide">
                {card.title}
              </p>
              <b className="text-xl md:text-2xl font-semibold text-slate-700 dark:text-white">
                {card.value}
              </b>
            </div>
            <card.icon
              size={45}
              className="p-2.5 text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-200 rounded-full shrink-0"
            />
          </div>
        ))}
      </div>

      {/* Chart Container - Ensures chart doesn't overflow on small screens */}
      <div className="w-full overflow-hidden bg-white dark:bg-transparent rounded-lg border border-slate-200 dark:border-slate-700 p-4">
        <OrdersAreaChart allOrders={dashboardData.allOrders} />
      </div>
    </div>
  );
}
