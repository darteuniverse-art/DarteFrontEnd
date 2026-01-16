"use client";
import { storesDummyData } from "../../../assets/assets";
import StoreInfo from "../../../components/admin/StoreInfo";
import Loading from "../../../components/Loading";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    setStores(storesDummyData);
    setLoading(false);
  };

  const toggleIsActive = async (storeId) => {
    // Logic to toggle the status of a store
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return !loading ? (
    <div className="text-slate-500 dark:text-slate-400 mb-28">
      <h1 className="text-2xl md:text-3xl font-bold">
        Live{" "}
        <span className="text-slate-800 dark:text-white font-medium">
          Stores
        </span>
      </h1>

      {stores.length ? (
        // RESPONSIVE LAYOUT CHANGE:
        // Mobile: 1 Column | Laptop: 2 Columns
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Store Info Wrapper - Takes available space */}
              <div className="flex-1 min-w-0">
                <StoreInfo store={store} />
              </div>

              {/* Actions Wrapper - Stays fixed size, adds divider on desktop */}
              <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-slate-700 sm:pl-4 shrink-0 mt-2 sm:mt-0">
                <p className="text-sm font-medium text-slate-700 dark:text-white">
                  Active
                </p>
                <label className="relative inline-flex items-center cursor-pointer text-gray-900 dark:text-white">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={() =>
                      toast.promise(toggleIsActive(store.id), {
                        loading: "Updating data...",
                        success: "Updated",
                        error: "Error",
                      })
                    }
                    checked={store.isActive}
                  />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200 dark:bg-slate-700 dark:peer-checked:bg-green-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-300 dark:peer-focus:ring-slate-800"></div>
                  <span className="absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-full shadow-sm"></span>
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-80 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg mt-6">
          <h1 className="text-xl md:text-2xl text-slate-400 dark:text-slate-500 font-medium">
            No stores Available
          </h1>
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
}
