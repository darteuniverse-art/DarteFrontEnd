"use client";

import React from "react";
import Navbar from "../../components/Navbar"; // <-- adjust if your navbar path is different

export default function AccountLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* PAGE CONTAINER */}
      <div className="pt-4">
        {children}
      </div>
    </div>
  );
}
