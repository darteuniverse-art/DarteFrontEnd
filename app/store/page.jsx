"use client";
import { dummyStoreDashboardData } from "../../assets/assets";
import Loading from "../../components/Loading";
import {
  CircleDollarSignIcon,
  ShoppingBasketIcon,
  StarIcon,
  TagsIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₦";
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalEarnings: 0,
    totalOrders: 0,
    ratings: [],
  });

  const dashboardCardsData = [
    {
      title: "Total Products",
      value: dashboardData.totalProducts,
      icon: ShoppingBasketIcon,
    },
    {
      title: "Total Earnings",
      value: currency + dashboardData.totalEarnings,
      icon: CircleDollarSignIcon,
    },
    { title: "Total Orders", value: dashboardData.totalOrders, icon: TagsIcon },
    {
      title: "Total Ratings",
      value: dashboardData.ratings.length,
      icon: StarIcon,
    },
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyStoreDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="w-full text-slate-500 dark:text-slate-400 mb-28">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold">
        Seller{" "}
        <span className="text-slate-800 dark:text-white font-medium">
          Dashboard
        </span>
      </h1>

      {/* Stats Cards Grid - 1 Col Mobile, 2 Col Tablet, 4 Col Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-10">
        {dashboardCardsData.map((card, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-transparent shadow-sm"
          >
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {card.title}
              </p>
              <b className="text-xl md:text-2xl font-semibold text-slate-700 dark:text-white truncate">
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

      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
        Total Reviews
      </h2>

      {/* Reviews List */}
      <div className="flex flex-col gap-4">
        {dashboardData.ratings.map((review, index) => (
          <div
            key={index}
            // Responsive Layout: Stack vertically on mobile, Row on medium screens+
            className="flex flex-col md:flex-row gap-6 p-5 border border-slate-100 dark:border-slate-700 rounded-lg bg-white dark:bg-transparent shadow-sm"
          >
            {/* Left Side: User Info & Review Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={review.user.image}
                  alt={review.user.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-600"
                  width={40}
                  height={40}
                />
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {review.user.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(review.createdAt).toDateString()}
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed break-words">
                {review.review}
              </p>
            </div>

            {/* Right Side: Product Info & Action Button */}
            {/* Mobile: Full width, Tablet: Fixed width sidebar */}
            <div className="flex flex-col md:items-end justify-between gap-4 md:w-64 md:border-l md:border-slate-100 md:dark:border-slate-700 md:pl-6 shrink-0">
              <div className="md:text-right w-full min-w-0">
                <p className="text-xs uppercase font-bold text-slate-400 mb-1">
                  Product
                </p>
                <p className="font-medium text-slate-700 dark:text-white text-sm truncate">
                  {review.product?.name}
                </p>
                <div className="flex md:justify-end items-center mt-1 gap-0.5">
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        size={14}
                        className={
                          review.rating >= i + 1
                            ? "fill-green-500 text-green-500"
                            : "fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700"
                        }
                      />
                    ))}
                </div>
              </div>

              <button
                onClick={() => router.push(`/product/${review.product.id}`)}
                className="w-full md:w-auto px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-white text-xs font-medium rounded transition-colors"
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
