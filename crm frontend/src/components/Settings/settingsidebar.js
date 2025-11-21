import React, { useState } from "react";
import {
  FiGrid,
  FiUser,
  FiShield,
  FiSettings,
  FiDatabase,
  FiBell,
  FiMail,
  FiMap,
  FiChevronDown,
  FiChevronUp,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Header1 from "../header1";
import { useNavigate } from "react-router-dom";
import MainLayout from "./main_layout";

function Sidebarsetting({isSidebarOpen, setIsSidebarOpen}) {
  const navigate = useNavigate();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isConfigurationMenuOpen, setisConfigurationMenuOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleConfigurationMenu = () => setisConfigurationMenuOpen(!isConfigurationMenuOpen);

  return (
    <div className="flex flex-col min-h-full ">
      <Header1 />

      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md shadow-md"
      >
        {isSidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      <div className="flex flex-1 mt-10">
        {/* Sidebar */}
        <aside
          className={`bg-[#0086b3] text-white min-h-screen p-4 flex flex-col transition-all duration-300 ease-in-out 
            ${isSidebarOpen ? "w-62" : "w-20"} 
            fixed lg:static top-0 left-0 z-40`}
        >
            <div className="flex justify-center">
                
          <h3
            className={`font-semibold text-xl mb-0 transition-all duration-200 text-white ${
              !isSidebarOpen && "hidden"
            }`}
          >
            Settings
             </h3>
            <button
            onClick={toggleSidebar}
            className="hidden lg:flex items-center justify-center relative -right-3 top-1/2 -translate-y-1/2 w-8 h-8"
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            title={isSidebarOpen ? "Collapse" : "Expand"}
          >
            <span className="text-sm leading-none select-none">
              {isSidebarOpen ? "«" : "»"}
            </span>
          </button>
      
          </div>
               {/* Collapse handle (always visible on lg; hidden on mobile because hamburger exists) */}
   


          <ul className="space-y-2 mt-4">
   
               <li
              className="flex items-center justify-between hover:bg-gray-700 p-2 rounded-md cursor-pointer"
              onClick={()=>navigate('/dashboard')}
            >
              <div className="flex items-center space-x-3">
                <FiGrid size={20} />
                {isSidebarOpen && <span>Admin Dashboard</span>}
              </div>
       
            </li>

            {/* User Management */}
            <li
              className="flex items-center justify-between hover:bg-gray-700 p-2 rounded-md cursor-pointer"
              onClick={toggleUserMenu}
            >
              <div className="flex items-center space-x-3">
                <FiUser size={20} />
                {isSidebarOpen && <span>User Management</span>}
              </div>
              {isSidebarOpen &&
                (isUserMenuOpen ? <FiChevronUp /> : <FiChevronDown />)}
            </li>

            {/* Submenu */}
            {isUserMenuOpen && (
              <ul
                className={`ml-8 mt-1 space-y-1 border-l border-gray-700 pl-3 ${
                  !isSidebarOpen && "hidden"
                }`}
              >
                <li
                  onClick={() => navigate("/addusers")}
                  className="text-gray-300 hover:text-blue-400 cursor-pointer text-sm"
                >
                  Users
                </li>
                <li
                  onClick={() => navigate("/viewusers")}
                  className="text-gray-300 hover:text-blue-400 cursor-pointer text-sm"
                >
                  Notifications
                </li>
                <li
                  onClick={() => navigate("/roles")}
                  className="text-gray-300 hover:text-blue-400 cursor-pointer text-sm"
                >
                  Sales Goals
                </li>
              </ul>
            )}

                        {/* Configuration Management */}
            <li
              className="flex items-center justify-between hover:bg-gray-700 p-2 rounded-md cursor-pointer"
              onClick={toggleConfigurationMenu}
            >
              <div className="flex items-center space-x-3">
                <FiSettings size={20} />
                {isSidebarOpen && <span>Configuration</span>}
              </div>
              {isSidebarOpen &&
                (isConfigurationMenuOpen ? <FiChevronUp /> : <FiChevronDown />)}
            </li>

            {/* Submenu */}
            {isConfigurationMenuOpen && (
              <ul
                className={`ml-8 mt-1 space-y-1 border-l border-gray-700 pl-3 ${
                  !isSidebarOpen && "hidden"
                }`}
              >
                <li
                  onClick={() => navigate("/configuration-form-title")}
                  className="text-gray-300 hover:text-blue-400 cursor-pointer text-sm"
                >
                  FormTitle
                </li>
                <li
                  onClick={() => navigate("/viewusers")}
                  className="text-gray-300 hover:text-blue-400 cursor-pointer text-sm"
                >
                  Notifications
                </li>
                <li
                  onClick={() => navigate("/roles")}
                  className="text-gray-300 hover:text-blue-400 cursor-pointer text-sm"
                >
                  Sales Goals
                </li>
              </ul>
            )}



            {/* Other Menu Items */}
            {[
              { icon: <FiShield />, title: "Permissions", action: () => alert("Permissions") },
              
              { icon: <FiDatabase />, title: "Database Backup", action: () => alert("Backup") },
              { icon: <FiBell />, title: "Notifications", action: () => alert("Notifications") },
              { icon: <FiMail />, title: "Create Templates", action: () => navigate("/createtemplets") },
              { icon: <FiMap />, title: "Lead Score", action: () => navigate("/leadscoreseetings") },
              { icon: <FaWhatsapp />, title: "WhatsApp Login", action: () => navigate("/Whatsapplogin") },
            ].map((item, index) => (
              <li
                key={index}
                onClick={item.action}
                className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer transition-all"
              >
                <span className="text-lg">{item.icon}</span>
                {isSidebarOpen && <span>{item.title}</span>}
              </li>
            ))}
          </ul>
        </aside>

      </div>
    </div>
  );
}

export default Sidebarsetting;
