"use client";
import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import { orderDummyData } from "../../../assets/assets";

export default function StoreOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrders = async () => {
    setOrders(orderDummyData);
    setLoading(false);
  };

  const updateOrderStatus = async (orderId, status) => {
    // Logic to update the status of an order
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="mb-28 ">
      <h1 className="text-xl sm:text-2xl lg:text-3xl text-slate-500 dark:text-slate-400 mb-4 sm:mb-5">
        Store{" "}
        <span className="text-slate-800 dark:text-white font-medium">
          Orders
        </span>
      </h1>
      {orders.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-400">No orders found</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-md shadow border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm text-left text-gray-600 dark:text-slate-400 min-w-[768px]">
              <thead className="bg-gray-50 text-gray-700 dark:text-slate-400 dark:bg-slate-700 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-3 sm:px-4 py-3">Sr. No.</th>
                  <th className="px-3 sm:px-4 py-3">Customer</th>
                  <th className="px-3 sm:px-4 py-3">Total</th>
                  <th className="px-3 sm:px-4 py-3 hidden sm:table-cell">
                    Payment
                  </th>
                  <th className="px-3 sm:px-4 py-3 hidden md:table-cell">
                    Coupon
                  </th>
                  <th className="px-3 sm:px-4 py-3">Status</th>
                  <th className="px-3 sm:px-4 py-3 hidden lg:table-cell">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {orders.map((order, index) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 cursor-pointer"
                    onClick={() => openModal(order)}
                  >
                    <td className="pl-3 sm:pl-6 text-green-600 dark:text-green-400 text-xs sm:text-sm">
                      {index + 1}
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm truncate max-w-[120px]">
                      {order.user?.name}
                    </td>
                    <td className="px-3 sm:px-4 py-3 font-medium text-slate-800 dark:text-slate-400 text-xs sm:text-sm whitespace-nowrap">
                      ${order.total}
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm hidden sm:table-cell">
                      {order.paymentMethod}
                    </td>
                    <td className="px-3 sm:px-4 py-3 hidden md:table-cell">
                      {order.isCouponUsed ? (
                        <span className="bg-green-100 text-green-700 dark:text-green-400 dark:bg-green-700 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                          {order.coupon?.code}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td
                      className="px-3 sm:px-4 py-3"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                        className="border-gray-300 rounded-md text-xs sm:text-sm focus:ring focus:ring-blue-200 dark:border-gray-700 dark:text-slate-400 dark:bg-slate-700 py-1 px-2"
                      >
                        <option value="ORDER_PLACED">ORDER_PLACED</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                      </select>
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-gray-500 dark:text-slate-400 text-xs sm:text-sm whitespace-nowrap hidden lg:table-cell">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 sm:hidden">
            ← Swipe to see more →
          </p>
        </>
      )}

      {/* Modal */}
      {isModalOpen && selectedOrder && (
        <div
          onClick={closeModal}
          className="fixed inset-0 flex items-center justify-center bg-black/50 text-slate-700 text-sm backdrop-blur-xs dark:bg-black/50 dark:text-slate-400 z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative dark:bg-slate-800 dark:text-slate-400"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 text-center dark:text-slate-400">
              Order Details
            </h2>

            {/* Customer Details */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2 dark:text-slate-400 text-sm sm:text-base">
                Customer Details
              </h3>
              <div className="space-y-1 text-xs sm:text-sm">
                <p>
                  <span className="text-green-700 font-medium">Name:</span>{" "}
                  {selectedOrder.user?.name}
                </p>
                <p className="truncate">
                  <span className="text-green-700 font-medium">Email:</span>{" "}
                  {selectedOrder.user?.email}
                </p>
                <p>
                  <span className="text-green-700 font-medium">Phone:</span>{" "}
                  {selectedOrder.address?.phone}
                </p>
                <p className="break-words">
                  <span className="text-green-700 font-medium">Address:</span>{" "}
                  {`${selectedOrder.address?.street}, ${selectedOrder.address?.city}, ${selectedOrder.address?.state}, ${selectedOrder.address?.zip}, ${selectedOrder.address?.country}`}
                </p>
              </div>
            </div>

            {/* Products */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2 dark:text-slate-400 text-sm sm:text-base">
                Products
              </h3>
              <div className="space-y-2">
                {selectedOrder.orderItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 border border-slate-100 dark:border-slate-700 rounded p-2"
                  >
                    <img
                      src={
                        item.product.images?.[0].src || item.product.images?.[0]
                      }
                      alt={item.product?.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover shrink-0 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-800 dark:text-slate-400 font-medium truncate text-xs sm:text-sm">
                        {item.product?.name}
                      </p>
                      <p className="text-xs sm:text-sm">Qty: {item.quantity}</p>
                      <p className="text-xs sm:text-sm">Price: ₦{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Status */}
            <div className="mb-4">
              <div className="space-y-1 text-xs sm:text-sm">
                <p className="dark:text-slate-400">
                  <span className="text-green-700 font-medium">
                    Payment Method:
                  </span>{" "}
                  {selectedOrder.paymentMethod}
                </p>
                <p className="dark:text-slate-400">
                  <span className="text-green-700 font-medium">Paid:</span>{" "}
                  {selectedOrder.isPaid ? "Yes" : "No"}
                </p>
                {selectedOrder.isCouponUsed && (
                  <p>
                    <span className="text-green-700 font-medium">Coupon:</span>{" "}
                    {selectedOrder.coupon.code} ({selectedOrder.coupon.discount}
                    % off)
                  </p>
                )}
                <p>
                  <span className="text-green-700 font-medium">Status:</span>{" "}
                  {selectedOrder.status}
                </p>
                <p className="break-words">
                  <span className="text-green-700 font-medium">
                    Order Date:
                  </span>{" "}
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 sm:px-6 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600 text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
