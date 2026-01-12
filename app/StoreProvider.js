"use client";
import React, { useRef, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";

export default function StoreProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const storeRef = useRef(null);

  useEffect(() => {
    if (!storeRef.current) {
      storeRef.current = makeStore();
    }
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return null;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
