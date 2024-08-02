import React, { useState } from "react";
import EmployeeData from "../EmployeeData/EmployeeData";
import logo from "../Images/officeLogo.jpg";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white text-red-600 flex items-center p-4">
          <img src={logo} alt="Company Logo" className="w-12 h-12" />
          <button
            className="ml-auto bg-red-600 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>
        </header>

        <EmployeeData />
      </div>
    </>
  );
};

export default Layout;
