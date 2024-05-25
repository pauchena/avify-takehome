import React from "react";
import SideBar from "../../components/SideBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="flex">
        <SideBar />
        <div className="flex flex-1 items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
