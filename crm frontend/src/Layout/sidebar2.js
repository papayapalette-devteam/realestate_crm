import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import Swal from 'sweetalert2';
import {
  mdiChartBoxOutline,
  mdiChatProcessingOutline,
  mdiAccountBox,
  mdiCurrencyUsd,
  mdiCalendarCheck,
  mdiWarehouse,
  mdiHome,
  mdiHandshakeOutline,
  mdiDomain,
  mdiOfficeBuilding,
  mdiHeadset,
  mdiBullhorn,
  mdiCogOutline,
  mdiLogoutVariant,
  mdiRulerSquare,
  mdiMenu,
  mdiClose
} from '@mdi/js';

function Sidebar1({ sidebarOpen, setSidebarOpen, collapsed, setCollapsed }) {
  const [inventoryOpen, setInventoryOpen] = useState(false);
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handle_logout = () => {
    localStorage.clear();
    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'You have been logged out successfully!',
    }).then(() => navigate('/'));
  };

  return (
    <>
      {/* MOBILE HAMBURGER */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-14 left-4 z-[60] md:hidden p-2 bg-slate-900 text-white rounded shadow"
        >
          <Icon path={mdiMenu} size={1} />
        </button>
      )}

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-screen
          ${collapsed ? 'w-20' : 'w-64'}
          bg-[#0086b3] text-white
          z-50
          transform transition-all duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col
          overflow-auto
          
        `}
      >
        {/* HEADER */}
        <div className="h-16 flex items-center justify-between px-3 border-b border-white/20">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img
              src="./WhatsApp Image 2024-11-13 at 09.36.23_ba950cdb.jpg"
              className="h-10 w-10 rounded-full object-cover"
              alt="logo"
            />
            {!collapsed && (
              <span className="font-semibold whitespace-nowrap">
                CRM Panel
              </span>
            )}
          </Link>

          {/* DESKTOP COLLAPSE */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex text-white hover:bg-black/20 p-1 rounded"
          >
            {collapsed ? '»' : '«'}
          </button>

          {/* MOBILE CLOSE */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white"
          >
            <Icon path={mdiClose} size={1} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1  p-2 space-y-1">
          <SidebarLink collapsed={collapsed} to="/dashboard" icon={mdiHome} label="Dashboard" />
          <SidebarLink collapsed={collapsed} to="/contactdetails" icon={mdiAccountBox} label="Contacts" />
          <SidebarLink collapsed={collapsed} to="/leaddetails" icon={mdiCurrencyUsd} label="Leads" />

          {/* INVENTORY */}
          <button
            onClick={() => !collapsed && setInventoryOpen(!inventoryOpen)}
            className={`
              flex items-center w-full py-2 rounded hover:bg-black/20
              ${collapsed ? 'justify-center px-0' : 'justify-between px-3'}
            `}
          >
            <div className={`flex items-center ${collapsed ? '' : 'gap-3'}`}>
              <Icon path={mdiWarehouse} size={1} />
              {!collapsed && <span>Inventory</span>}
            </div>
            {!collapsed && <span>{inventoryOpen ? '▲' : '▼'}</span>}
          </button>

          {!collapsed && inventoryOpen && (
            <div className="ml-8 space-y-1">
              <SubLink to="/alldeals" icon={mdiHandshakeOutline} label="Deals" />
              <SubLink to="/allunits" icon={mdiDomain} label="Units" />
              <SubLink to="/allsizes" icon={mdiRulerSquare} label="Sizes" />
              <SubLink to="/allprojects" icon={mdiOfficeBuilding} label="Project" />
            </div>
          )}

          <SidebarLink collapsed={collapsed} to="/tasks" icon={mdiCalendarCheck} label="Tasks" />
          <SidebarLink collapsed={collapsed} to="/bookingdetailsdata" icon={mdiHeadset} label="Post Sales" />
          <SidebarLink collapsed={collapsed} to="/marketing" icon={mdiBullhorn} label="Marketing" />
          <SidebarLink collapsed={collapsed} icon={mdiChatProcessingOutline} label="Communication" />
          <SidebarLink collapsed={collapsed} icon={mdiChartBoxOutline} label="Report" />
          <SidebarLink collapsed={collapsed} to="/crmsettings" icon={mdiCogOutline} label="Settings" />

          {/* LOGOUT */}
          <button
            onClick={handle_logout}
            className={`
              flex items-center w-full py-2 mt-4 rounded hover:bg-red-600
              ${collapsed ? 'justify-center px-0' : 'gap-3 px-3'}
            `}
          >
            <Icon path={mdiLogoutVariant} size={1} />
            {!collapsed && <span>Logout</span>}
          </button>
        </nav>
      </aside>
    </>
  );
}

/* ---------- LINK COMPONENTS ---------- */

const SidebarLink = ({ to, icon, label, collapsed }) => (
  <Link
    to={to || '#'}
    className={`
      flex items-center py-2 rounded hover:bg-black/20
      ${collapsed ? 'justify-center px-0' : 'gap-3 px-3'}
    `}
  >
    <Icon path={icon} size={1} />
    {!collapsed && <span>{label}</span>}
  </Link>
);

const SubLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-3 py-1 rounded hover:bg-black/20 text-sm"
  >
    <Icon path={icon} size={0.9} />
    <span>{label}</span>
  </Link>
);

export default Sidebar1;
