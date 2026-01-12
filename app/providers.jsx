"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import StoreProvider from "./StoreProvider";
import { SessionProvider } from "next-auth/react";
import ModeToggle from "../components/ModeToggle";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <StoreProvider>
        <Toaster />
        <ModeToggle />
        {children}
      </StoreProvider>
    </SessionProvider>
  );
}
