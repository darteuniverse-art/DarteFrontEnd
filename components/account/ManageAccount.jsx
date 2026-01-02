"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ManageAccount() {
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState(session?.user?.name || "");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);

  if (!session) {
    return (
      <div className="p-10 text-center">
        <p className="text-xl font-semibold text-gray-600">
          You must be logged in to manage your account.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 px-6 py-2 bg-neutral-300 text-gray-800 rounded-lg"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // -------- HANDLE UPDATE --------
  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);
    if (imageFile) formData.append("image", imageFile);

    await fetch("/api/account/update", {
      method: "POST",
      body: formData,
    });

    router.refresh();
    alert("Account updated successfully.");
  };

  // -------- HANDLE DELETE --------
  const handleDeleteAccount = async () => {
    const confirmDelete = confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    await fetch("/api/account/delete", { method: "DELETE" });
    router.push("/goodbye");
  };

  return (
    <div className="min-h-screen bg-[#f5f6f7] flex">

      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <h2 className="text-xs font-semibold text-gray-500 tracking-wider mb-3">
          ACCOUNT SETTINGS
        </h2>

        <div>
          <div className="px-4 py-2 bg-gray-100 rounded-md font-medium text-gray-800">
            Manage Account
          </div>
        </div>
      </aside>

      {/* RIGHT AREA */}
      <main className="flex-1 p-10">

        <h1 className="text-3xl font-semibold text-gray-800">Manage Account</h1>
        <p className="text-gray-500 text-sm mt-1 mb-8">
          Update your profile information.
        </p>

        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-3xl">

          {/* TOP: IMAGE + NAME */}
          <div className="flex items-start gap-8">
            
            {/* PROFILE IMAGE */}
            <div className="flex flex-col items-center">
              <Image
                src={session.user?.image || "/default-avatar.png"}
                width={95}
                height={95}
                alt="Profile"
                className="rounded-full border shadow-sm"
              />

              <label className="mt-3 text-neutral-700 text-sm font-medium cursor-pointer hover:underline">
                Change Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </label>
            </div>

            {/* NAME FIELD */}
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-600">NAME</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md mt-1 px-3 py-2 bg-white
                  focus:border-neutral-500 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

          </div>

          {/* EMAIL (READ ONLY) */}
          <div className="mt-6">
            <label className="text-xs font-semibold text-gray-600">EMAIL (Read-only)</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md mt-1 px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
              value={session.user?.email}
              disabled
            />
          </div>

          {/* PASSWORD */}
          <div className="mt-6">
            <label className="text-xs font-semibold text-gray-600">NEW PASSWORD</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md mt-1 px-3 py-2 bg-white
                focus:border-neutral-500 outline-none"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* BUTTONS SIDE BY SIDE */}
          <div className="mt-10 flex gap-4">

            <button
              onClick={handleSaveChanges}
              className="flex-1 bg-green-500 hover:bg-green-400 text-gray-800 py-3 rounded-lg font-medium transition"
            >
              Save Changes
            </button>

            <button
              onClick={handleDeleteAccount}
              className="flex-1 bg-neutral-200 hover:bg-neutral-300 text-gray-700 py-3 rounded-lg font-medium transition"
            >
              Delete Account
            </button>

          </div>

        </div>
      </main>
    </div>
  );
}
