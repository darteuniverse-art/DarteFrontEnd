import StoreLayout from "../../components/store/StoreLayout";
import React from "react";

export const metadata = {
  title: "Darté. - Store Dashboard",
  description: "Darté. - Store Dashboard",
};

export default function RootAdminLayout({ children }) {
  return (
    <>
      <StoreLayout>{children}</StoreLayout>
    </>
  );
}
