"use client";

import { useState } from "react";
import { LogOut, ChevronDown, CircleUserRound, User } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import ProfileModal from "../Modal/ProfileModal";

export default function ProfileDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  if (!user) return null;

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Trigger */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="btn btn-ghost flex items-center gap-2 normal-case pb-2"
        >
          {user.photo ? (
            <Image
              src={user.photo}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <CircleUserRound className="w-7 h-7" />
          )}

          <span className="hidden sm:block font-medium">{user.name}</span>

          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown (ALWAYS rendered) */}
        <div
          className={`
          absolute right-0 top-full w-64 rounded-lg bg-white border shadow-xl z-50
          transition-all duration-150
          ${
            open
              ? "opacity-100 visible pointer-events-auto"
              : "opacity-0 invisible pointer-events-none"
          }
        `}
        >
          <div className="divide-y">
            {/* User info */}
            <div className="flex items-center gap-3 p-4">
              {user.photo ? (
                <Image
                  src={user.photo}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ) : (
                <CircleUserRound className="w-10 h-10" />
              )}

              <div className="overflow-hidden">
                <p className="font-semibold truncate">{user.name}</p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-2">
              <div
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100"
                // onClick={() => setOpen(false)}
                onClick={() => setOpenProfile(true)}
              >
                <User className="w-5 h-5" />
                <span>Edit Profile</span>
              </div>
            </div>

            {/* Logout */}
            <div className="p-2">
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="flex w-full items-center gap-3 px-4 py-2 rounded-md text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProfileModal open={openProfile} onClose={() => setOpenProfile(false)} />
    </>
  );
}
