import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar({ isMobileView, mobileOpen, setMobileOpen }) {
  return (
    <div className="w-full h-[70px] flex items-center justify-between bg-[#1F2937] px-8 py-4  ">
      <div className="flex items-center gap-4">
        {isMobileView && (
          <div className="">
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`${
                mobileOpen ? "hidden" : ""
              } bg-[#1F2937] p-2 rounded-md shadow-lg`}
              aria-label="Open sidebar"
            >
              <RxHamburgerMenu size={28} color="white" />
            </button>
          </div>
        )}
        <p className="text-white text-xl font-medium">Overview</p>
      </div>
      <div className="flex items-center gap-4">
        <h4 className="text-white ">Shaurya</h4>
        <div className="w-7 h-7 rounded-full bg-white "></div>
      </div>
    </div>
  );
}

export default Navbar;
