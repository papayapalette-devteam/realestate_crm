// SidebarSectionWithLoader.js

import React from "react";

function SidebarWidgetLoader({ loading, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {children}
      {loading && (
        <span style={{ marginLeft: 8 }}>
          <div
            style={{
              width: 20,
              height: 20,
              border: "3px solid #1976d2",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }}
          />
          <style>
            {`@keyframes spin { 0% {transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}
          </style>
        </span>
      )}
    </div>
  );
}

export default SidebarWidgetLoader;
// Usage example: in the sidebar
// <SidebarWidgetLoader loading={true}>Recent Contacts</SidebarWidgetLoader>
