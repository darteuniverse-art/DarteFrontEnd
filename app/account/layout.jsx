"use client";

import React from "react";
import Navbar from "../../components/Navbar"; // <-- adjust if your navbar path is different

export default function AccountLayout({ children }) {
  return (
    <div className="min-h-screen">
      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* PAGE CONTAINER */}
      <div className="">{children}</div>
    </div>
  );
}
