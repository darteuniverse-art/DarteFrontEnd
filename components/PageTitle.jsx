"use client";
import { ArrowRightIcon } from "lucide-react";
import React from "react";
import Link from "next/link";

const PageTitle = ({ heading, text, path = "/", linkText }) => {
  return (
    <div className="my-6">
      <h2 className="text-2xl font-semibold dark:text-slate-400 text-slate-800">
        {heading}
      </h2>
      <div className="flex items-center gap-3">
        <p className="text-slate-600 dark:text-slate-500">{text}</p>
        <Link
          href={path}
          className="flex items-center gap-1 text-green-500 text-sm"
        >
          {linkText} <ArrowRightIcon size={14} />
        </Link>
      </div>
    </div>
  );
};

export default PageTitle;
