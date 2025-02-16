import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router";
import { FaUserAlt } from "react-icons/fa";
import { GrSupport } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="py-5 text-sm">
      <div className="bg-zinc-800 rounded-2xl px-5 py-3 flex justify-between items-center space-x-3">
        <div className="flex items-center space-x-10">
          <Link to="/">
            <img className="w-12" src="/logo1.png" alt="پونز" />
          </Link>
          <div className="flex items-center space-x-0.5 hover:bg-zinc-700 px-3 py-2 rounded-lg transition-all cursor-pointer">
            <IoLocationSharp size="20px" />
            <p>اصفهان</p>
          </div>
          <div className="relative bg-zinc-700 rounded-xl w-[400px]">
            <label htmlFor="Search" className="sr-only">
              جستجو...
            </label>
            <input
              type="text"
              id="Search"
              placeholder="جستجو..."
              className="w-full rounded-md border-zinc-200 py-2.5 ps-3 pe-10 shadow-xs sm:text-sm outline-0"
            />
            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button
                type="button"
                className="text-zinc-100 hover:text-zinc-400 transition-all"
              >
                <span className="sr-only"> جستجو...</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-1 hover:bg-zinc-700 px-3 py-2 rounded-lg transition-all cursor-pointer">
            <FaUserAlt />
            <p>حساب کاربری</p>
          </div>
          <div className="flex items-center space-x-1 hover:bg-zinc-700 px-3 py-2 rounded-lg transition-all cursor-pointer">
            <GrSupport />
            <p>پشتیبانی</p>
          </div>
          <div className="flex items-center space-x-1 bg-red-600 px-3 py-2 rounded-lg transition-all cursor-pointer text-red-950 font-bold">
            <FaPlus size="18px" />
            <p>ثبت آگهی</p>
          </div>
        </div>
      </div>
    </div>
  );
}
