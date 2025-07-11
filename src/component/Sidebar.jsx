import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoHomeSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

function Sidebar({ isMobileView, mobileOpen, setMobileOpen }) {
  const [expand, setExpand] = useState(true);

  return (
    <>
      {!isMobileView && (
        <div
          className={`${
            expand ? "w-[17%] items-start" : "w-[5%] items-center "
          } bg-[#1F2937] min-h-[100vh] max-h-screen text-[max(1vw,18px)] flex flex-col gap-12  px-4 sm:px-6 py-6 transition-all duration-300 ease-in-out`}
        >
          <div
            onClick={() => setExpand((prev) => !prev)}
            className={`${expand ? "self-start" : ""} cursor-pointer`}
          >
            <RxHamburgerMenu size={24} color="white" />
          </div>
          <div className="w-full flex flex-col gap-4  ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                [
                  "flex items-center  gap-4 cursor-pointer w-full",
                  expand
                    ? "p-[8px_10px] justify-start "
                    : "p-[5px_5px] justify-center ",
                  isActive
                    ? "bg-[#374151] rounded-lg text-[#4BDE80]"
                    : "text-white",
                ].join(" ")
              }
            >
              <IoHomeSharp size={20} />
              <p className={`${expand ? "block" : "hidden"}`}>Home</p>
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                [
                  "flex items-center gap-4 cursor-pointer w-full",
                  expand
                    ? "p-[8px_10px] justify-start"
                    : "p-[5px_5px] justify-center",
                  isActive
                    ? "bg-[#374151] rounded-lg text-[#4BDE80]"
                    : "text-white",
                ].join(" ")
              }
            >
              <MdDashboard size={20} />
              <p className={`${expand ? "block" : "hidden"}`}>Dashboard</p>
            </NavLink>
          </div>
        </div>
      )}

      {isMobileView && mobileOpen && (
        <div className="bg-[#1F2937] h-full text-[max(1vw,18px)] flex flex-col gap-12 items-start px-4 py-6 transition-all duration-300 ease-in-out absolute top-0 left-0 z-50 ">
          <div
            onClick={() => setMobileOpen((prev) => !prev)}
            className="self-start cursor-pointer"
          >
            <RxHamburgerMenu size={24} color="white" />
          </div>
          <div className="w-full flex flex-col gap-4  ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                [
                  "flex items-center justify-start gap-4 cursor-pointer w-full",
                  expand ? "p-[8px_10px]" : "p-[5px_5px]",
                  isActive
                    ? "bg-[#374151] rounded-lg text-[#4BDE80]"
                    : "text-white",
                ].join(" ")
              }
            >
              <IoHomeSharp size={20} />
              <p className={``}>Home</p>
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                [
                  "flex items-center justify-start gap-4 cursor-pointer w-full",
                  expand ? "p-[8px_10px]" : "p-[5px_5px]",
                  isActive
                    ? "bg-[#374151] rounded-lg text-[#4BDE80]"
                    : "text-white",
                ].join(" ")
              }
            >
              <MdDashboard size={20} />
              <p className={``}>Dashboard</p>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
