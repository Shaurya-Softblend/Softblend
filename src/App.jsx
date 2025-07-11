import { Outlet } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import { useEffect, useState } from "react";

function App() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const checkMobile = () => {
    const width = window.innerWidth;
    if (width < 1120) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
  }, []);

  return (
    // header  right to sidebar

    // <div className="w-full h-screen flex justify-start items-start ">
    //   <Sidebar
    //     isMobileView={isMobileView}
    //     mobileOpen={mobileOpen}
    //     setMobileOpen={setMobileOpen}
    //   />
    //   <div className="flex flex-col w-full h-full overflow-y-auto">
    //     <Navbar
    //       isMobileView={isMobileView}
    //       mobileOpen={mobileOpen}
    //       setMobileOpen={setMobileOpen}
    //     />
    //     <div className="bg-[#253141] text-white w-full h-full px-10 py-1  ">
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>

    // header top
    
    <div className="w-full h-screen flex flex-col justify-start items-start ">
      <Navbar
        isMobileView={isMobileView}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex justify-start items-start w-full h-full ">
        <Sidebar
          isMobileView={isMobileView}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <div className="bg-[#253141] text-white w-full h-full px-10 py-1 overflow-y-auto  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
