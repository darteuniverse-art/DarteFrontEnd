"use client";

import * as React from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export function LoginCard() {
  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex justify-center items-center">
      {/* Left Side - Instagram-style Collage */}
      <div className="hidden md:flex w-1/2 items-center justify-center relative overflow-hidden">
        <div className="relative w-[300px] h-[500px]">
          <img
            src="/image1.jpeg"
            alt="Collage 1"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[220px] h-[400px] object-cover rounded-2xl shadow-2xl z-10"
          />
          <img
            src="/image2.jpeg"
            alt="Collage 2"
            className="absolute bottom-[20px] right-[0px] w-[120px] h-[180px] object-cover rounded-2xl shadow-lg rotate-[7deg] z-20"
          />
          <img
            src="/image3.jpeg"
            alt="Collage 3"
            className="absolute top-[40px] left-[0px] w-[110px] h-[160px] object-cover rounded-2xl shadow-lg rotate-[-6deg] z-20"
          />
          <img
            src="/image4.jpeg"
            alt="Collage 4"
            className="absolute top-[180px] right-[10px] w-[60px] h-[60px] object-cover rounded-full shadow-lg rotate-[-4deg] z-30"
          />
          <div className="absolute top-[20px] right-[0px] text-4xl">🔥</div>
          <div className="absolute bottom-[40px] left-[30px] text-4xl">💜</div>
        </div>
      </div>

      {/* Right Side - Login Card */}
      <div className="flex w-full md:w-1/2 items-center justify-center md:justify-start px-4 md:pl-0 md:-ml-8">
        <div className="flex flex-col items-center w-full max-w-md">
          {/* Smaller Card */}
          <div className="w-full rounded-lg shadow-md p-6 bg-gray-100">
            {/* Header */}
            <div className="text-center space-y-2 mb-4">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-black">
                Darté
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Welcome back to Darté. Continue your journey.
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-gray-700 dark:text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-200 dark:text-black"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className="text-gray-700 dark:text-gray-800">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-200 dark:text-black"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-[#0545a5] to-[#5b1dcd] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all mt-2">
                Log in
              </button>

              <div className="text-center text-sm text-gray-500 my-2">OR</div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full px-4 py-2 border border-gray-300 flex items-center justify-center gap-2 rounded-md hover:bg-gray-200 dark:bg-gray-200 transition-colors">
                <FcGoogle className="w-5 h-5" />
                Log in with Google
              </button>

              <div className="text-center mt-3">
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <div className="text-center mt-4 text-sm">
                <span className="text-gray-600">Don't have an account? </span>
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-4 text-xs text-gray-500 text-center">
            © 2026 Darté
          </div>
        </div>
      </div>
    </div>
  );
}
