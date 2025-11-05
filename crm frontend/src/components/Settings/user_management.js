import React, { useState } from "react";
import MainLayout from "./main_layout";
import UserList from "./user_list";
import Role from "./role";
// import UserHierarchy from "./UserHierarchy";


const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("userList");

  const tabs = [
    { id: "userList", label: "User List" },
    { id: "userHierarchy", label: "User Hierarchy" },
    { id: "roles", label: "Roles" },
  ];

  return (
    <MainLayout>
      <div className="mt-6 bg-gray-100 min-h-screen p-0">
        <div className="bg-white p-3  flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">User Management</h3>
        </div>

        {/* Tabs */}
        <div className="bg-white flex justify-start items-center px-1 py-2 border-b border-gray-200 mt-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative mx-4 pb-2 text-sm font-medium transition-colors duration-200 
                ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conditional Render of Components */}
        <div>
          {activeTab === "userList" && <UserList />}
          {/* {activeTab === "userHierarchy" && <UserHierarchy />} */}
          {activeTab === "roles" && <Role />}
        </div>
      </div>
    </MainLayout>
  );
};

export default UserManagement;
