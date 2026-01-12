"use client";
import { XIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
const AddressModal = ({ setShowAddressModal }) => {
  const [address, setAddress] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowAddressModal(false);
  };

  return (
    <div
      className="fixed inset-0 z-120 flex items-center justify-center bg-black/10 dark:bg-black/30 backdrop-blur-sm"
      onClick={() => setShowAddressModal(false)}
    >
      <form
        onSubmit={(e) =>
          toast.promise(handleSubmit(e), { loading: "Adding Address..." })
        }
        onClick={(e) => e.stopPropagation()}
        className=" bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-6 relative"
      >
        <div className="flex flex-col gap-5 text-slate-700 dark:text-slate-500 ">
          <h2 className="text-3xl ">
            Add New <span className="font-semibold">Address</span>
          </h2>
          <input
            name="name"
            onChange={handleAddressChange}
            value={address.name}
            className="p-2 px-4 outline-none border border-slate-200 dark:border-slate-700 rounded w-full"
            type="text"
            placeholder="Enter your name"
            required
          />
          <input
            name="email"
            onChange={handleAddressChange}
            value={address.email}
            className="p-2 px-4 outline-none border border-slate-200 dark:border-slate-700 rounded w-full"
            type="email"
            placeholder="Email address"
            required
          />
          <input
            name="street"
            onChange={handleAddressChange}
            value={address.street}
            className="p-2 px-4 outline-none border border-slate-200 dark:border-slate-700 rounded w-full"
            type="text"
            placeholder="Street"
            required
          />
          <div className="flex gap-4">
            <input
              name="city"
              onChange={handleAddressChange}
              value={address.city}
              className="p-2 px-4 outline-none border border-slate-200 dark:border-slate-700 rounded w-full"
              type="text"
              placeholder="City"
              required
            />
            <input
              name="state"
              onChange={handleAddressChange}
              value={address.state}
              className="p-2 px-4 outline-none border border-slate-200 dark:border-slate-700 rounded w-full"
              type="text"
              placeholder="State"
              required
            />
          </div>
          <div className="flex gap-4">
            <input
              name="zip"
              onChange={handleAddressChange}
              value={address.zip}
              className="p-2 px-4 outline-none border border-slate-200 dark:border-slate-700 rounded w-full"
              type="number"
              placeholder="Zip code"
              required
            />
            <input
              name="country"
              onChange={handleAddressChange}
              value={address.country}
              className="p-2 px-4 outline-none border border-slate-200 dark:border-slate-700 rounded w-full"
              type="text"
              placeholder="Country"
              required
            />
          </div>
          <input
            name="phone"
            onChange={handleAddressChange}
            value={address.phone}
            className="p-2 px-4 outline-none border border-slate-200 dark:border-slate-700 rounded w-full"
            type="text"
            placeholder="Phone"
            required
          />
          <button className="w-full bg-slate-600 dark:bg-slate-700 text-white py-2.5 rounded hover:bg-slate-900 dark:hover:bg-slate-900 active:scale-95 transition-all">
            SAVE ADDRESS
          </button>
        </div>
        <XIcon
          size={30}
          className="absolute top-5 right-5 text-slate-500 hover:text-slate-700 cursor-pointer"
          onClick={() => setShowAddressModal(false)}
        />
      </form>
    </div>
  );
};

export default AddressModal;
