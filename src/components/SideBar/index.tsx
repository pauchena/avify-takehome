import React from "react";
import { Link } from "react-router-dom";
import { IoBarChartSharp, IoPieChartSharp } from "react-icons/io5";

const SideBar = () => {
  const Menus = [
    { title: "Energy Mix", icon: <IoBarChartSharp />, path: "/" },
    {
      title: "Energy Filter",
      icon: <IoPieChartSharp />,
      path: "/piechart",
    },
  ];

  return (
    <div
      className={`w-72 bg-dark-purple h-screen p-10 relative duration-300 border-r border-gray-400`}
    >
      <div className="inline-flex">
        <img
          className="h-8 w-auto mr-3 rounded-full"
          src={`/avify-logo.png`}
          alt="avify"
        />
        <h1
          className={`text-customColors-lightViolet origin-left font-medium text-2xl duration-300`}
        >
          Avify challenge
        </h1>
      </div>
      <ul>
        {Menus.map((menu, index) => (
          <>
            <Link to={menu.path} className="flex items-center w-full ">
              <li
                key={index}
                className={`text-gray-700 px-8  text-sm flex justify-center items-center gap-x-4 hover:bg-customColors-lightVioletTransparent h-10 w-full rounded-md mt-9`}
              >
                <span className="text-2xl block float-left">{menu.icon}</span>
                <span className={`text-base font-medium flex-1 duration-200`}>
                  {menu.title}
                </span>
              </li>
            </Link>
          </>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
