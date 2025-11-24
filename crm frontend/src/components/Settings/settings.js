import React from "react";
import { FiUser, FiShield, FiSettings, FiDatabase, FiBell, FiMail, FiMap } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MainLayout from "./main_layout";

const Crmsettings = () => {
  const navigate = useNavigate();

  const settingsOptions = [
    {
      title: "User Management",
      icon: <FiUser className="w-6 h-6 text-blue-600" />,
      description: "Manage users, roles, and access.",
      onClick: () => navigate("/addusers"),
    },
    {
      title: "Permissions",
      icon: <FiShield className="w-6 h-6 text-purple-600" />,
      description: "Control what users can see and do.",
      onClick: () => alert("Permissions settings coming soon"),
    },
    {
      title: "System Settings",
      icon: <FiSettings className="w-6 h-6 text-indigo-600" />,
      description: "Configure system-wide options.",
      onClick: () => alert("System settings coming soon"),
    },
    {
      title: "Database Backup",
      icon: <FiDatabase className="w-6 h-6 text-emerald-600" />,
      description: "Manage and schedule backups.",
      onClick: () => alert("Backup clicked"),
    },
    {
      title: "Notifications",
      icon: <FiBell className="w-6 h-6 text-yellow-600" />,
      description: "Setup alerts and notifications.",
      onClick: () => alert("Notification settings coming soon"),
    },
    {
      title: "Create Templates",
      icon: <FiMail className="w-6 h-6 text-pink-600" />,
      description: "Customize automated emails.",
      onClick: () => navigate("/createtemplets"),
    },
    {
      title: "Lead Score",
      icon: <FiMap className="w-6 h-6 text-cyan-600" />,
      description: "Create Lead Score Criteria.",
      onClick: () => navigate("/leadscoreseetings"),
    },
    {
      title: "WhatsApp Login",
      icon: <FaWhatsapp className="w-6 h-6 text-green-600" />,
      description: "Login to your WhatsApp account.",
      onClick: () => navigate("/Whatsapplogin"),
    },
  ];

  return (
    <MainLayout>
     <div className="px-6 py-10">
  {/* Header */}
 <h1 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-5">
  <span className="text-blue-600 text-2xl">⚙️</span>
  Settings
</h1>


  {/* Settings Grid */}
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {settingsOptions.map((option, index) => (
      <div
        key={index}
        onClick={option.onClick}
        className="
          group cursor-pointer rounded-xl 
          border border-gray-200 
          bg-gradient-to-br from-white to-gray-50 
          p-4 shadow-sm 
          transition-all duration-200
          hover:shadow-lg hover:-translate-y-1 hover:border-blue-300
        "
      >
        <div className="flex items-center gap-2 mb-2">
          {/* Icon */}
          <div
            className="
              p-2.5 rounded-lg 
              bg-blue-50 text-blue-600
              group-hover:bg-blue-100 
              transition-colors
            "
          >
            {option.icon}
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-700">
            {option.title}
          </h3>
        </div>

        {/* Description (smaller + lighter) */}
        <p className="text-sm text-gray-500 leading-snug">
          {option.description}
        </p>
      </div>
    ))}
  </div>
</div>

    </MainLayout>
  );
};

export default Crmsettings;
