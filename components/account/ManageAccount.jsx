"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ManageAccount() {
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState(session?.user?.name || "");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(
    session?.user?.image || "/default-avatar.png"
  );

  // Handle local image preview
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Authentication required
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Please log in to view this page.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium rounded-md transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // -------- HANDLE UPDATE --------
  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);
    if (imageFile) formData.append("image", imageFile);

    try {
      await fetch("/api/account/update", {
        method: "POST",
        body: formData,
      });
      router.refresh();
      alert("Profile updated.");
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  // -------- HANDLE DELETE --------
  const handleDeleteAccount = async () => {
    const confirmDelete = confirm(
      "This action cannot be undone. Are you sure you want to permanently delete your account?"
    );
    if (!confirmDelete) return;

    await fetch("/api/account/delete", { method: "DELETE" });
    router.push("/goodbye");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row ">
      {/* LEFT SIDEBAR */}
      <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-slate-700 px-6 py-8 lg:py-10">
        <div className="lg:fixed lg:w-52">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-6">
            Settings
          </h2>
          <nav className="space-y-1">
            <button className="w-full text-left px-3 py-2 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 text-sm font-medium rounded-md">
              General
            </button>
            <button className="w-full text-left px-3 py-2 text-gray-500 dark:text-slate-500 hover:text-gray-900 dark:hover:text-gray-300 text-sm font-medium transition-colors">
              Notifications
            </button>
            <button className="w-full text-left px-3 py-2 text-gray-500 dark:text-slate-500 hover:text-gray-900 dark:hover:text-gray-300 text-sm font-medium transition-colors">
              Billing
            </button>
          </nav>
        </div>
      </aside>

      {/* RIGHT AREA */}
      <main className="flex-1 px-6 py-8 lg:px-12 lg:py-10 max-w-4xl">
        <div className="mb-10">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            General Settings
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            Manage your account details and profile information.
          </p>
        </div>

        {/* SECTION 1: AVATAR */}
        <section className="mb-10 border-b border-gray-100 dark:border-slate-900 pb-10">
          <div className="flex items-center gap-6">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-gray-200 dark:border-slate-800">
              <Image
                src={preview}
                fill
                style={{ objectFit: "cover" }}
                alt="Profile"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200">
                Profile Photo
              </h3>
              <p className="text-xs text-gray-500 dark:text-slate-500 mb-3">
                Max file size 5MB.
              </p>
              <label className="inline-flex cursor-pointer rounded-md bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-3 py-1.5 text-xs font-semibold text-gray-900 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition">
                Select New Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </section>

        {/* SECTION 2: FORM */}
        <section className="space-y-6 max-w-lg">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
              Display Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border-0 p-2 text-gray-900 dark:text-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-slate-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
              Email Address
            </label>
            <div className="mt-2">
              <input
                type="email"
                value={session.user?.email || ""}
                disabled
                className="block w-full rounded-md border-0 p-2 text-gray-500 dark:text-slate-500 dark:bg-slate-900/50 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-slate-800 bg-gray-50 sm:text-sm sm:leading-6 cursor-not-allowed"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-slate-500">
              Email address cannot be changed.
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
              New Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 p-2 text-gray-900 dark:text-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-slate-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSaveChanges}
              className="rounded-md bg-neutral-900 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all"
            >
              Save Changes
            </button>
          </div>
        </section>

        {/* SECTION 3: DANGER ZONE */}
        <section className="mt-20 pt-10 border-t border-gray-100 dark:border-slate-900">
          <div className="rounded-lg border border-red-100 bg-red-50/30 p-6 dark:border-red-900/30 dark:bg-red-900/10">
            <h3 className="text-sm font-semibold text-red-700 dark:text-red-400">
              Delete Account
            </h3>
            <div className="mt-2 max-w-xl text-sm text-red-600/80 dark:text-red-300/70">
              <p>
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
            </div>
            <div className="mt-5">
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-200 hover:bg-red-50 dark:bg-transparent dark:ring-red-900 dark:hover:bg-red-950/30 transition-colors"
              >
                Delete your account
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
