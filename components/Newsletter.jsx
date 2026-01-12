import React from "react";
import Title from "./Title";

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center mx-2 sm:mx-4 my-36">
      <Title
        title="Join Newsletter"
        description="Subscribe to get exclusive deals, new arrivals, and insider updates delivered straight to your inbox every week."
        visibleButton={false}
      />
      <div className="flex bg-slate-100 dark:bg-slate-800 text-sm p-1 rounded-full w-full max-w-xl my-10 border-2 border-white dark:border-slate-900 ring ring-slate-200 dark:ring-slate-800 dark:text-slate-400 ">
        <input
          className="flex-1 pl-3 sm:pl-5 outline-none text-xs sm:text-sm"
          type="text"
          placeholder="Enter your email"
        />
        <button className="font-medium bg-green-500 text-white px-3 sm:px-7 py-2.5 sm:py-3 rounded-full hover:scale-103 active:scale-95 transition whitespace-nowrap text-xs sm:text-sm">
          <span className="hidden sm:inline">Get Updates</span>
          <span className="sm:hidden">Subscribe</span>
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
