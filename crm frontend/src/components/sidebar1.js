import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import {
  mdiNetworkStrength4,
  mdiPhone,
  mdiAccountBox,
  mdiCurrencyUsd,
  mdiCalendarCheck,
  mdiApplication,
  mdiHome,
  mdiHandshakeOutline,
  mdiDomain,
  mdiOfficeBuilding,
} from '@mdi/js';
import '../css/mystyle.css';

function Sidebar1() {
  const [inventoryOpen, setInventoryOpen] = useState(false);

  return (
    <div>
      <aside className="sidebar">
        <div className="sidebar__brand">
          <Link to="/dashboard">
            <img
              src="./WhatsApp Image 2024-11-13 at 09.36.23_ba950cdb.jpg"
              alt="User"
              className="sidebar__avatar"
            />
          </Link>
        </div>
        <nav className="sidebar__nav">
          <ul>
            <li>
              <Link to="/dashboard" className="sidebar__link">
                <Icon path={mdiHome} size={1.2} className="sidebar__icon" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/contactdetails" className="sidebar__link">
                <Icon path={mdiAccountBox} size={1.2} className="sidebar__icon" />
                <span>Contacts</span>
              </Link>
            </li>
            <li>
              <Link to="/leaddetails" className="sidebar__link">
                <Icon path={mdiCurrencyUsd} size={1.2} className="sidebar__icon" />
                <span>Leads</span>
              </Link>
            </li>

            {/* Inventory with attractive submenu */}
            <li className={`sidebar__dropdown${inventoryOpen ? ' open' : ''}`}>
              <button
                className="sidebar__link sidebar__dropdown-toggle"
                onClick={() => setInventoryOpen((prev) => !prev)}
                aria-expanded={inventoryOpen}
                aria-controls="inventory-submenu"
                type="button"
              >
                <Icon path={mdiApplication} size={1.2} className="sidebar__icon" />
                <span>Inventory</span>
                <span className="sidebar__chevron">{inventoryOpen ? '▲' : '▼'}</span>
              </button>
              <ul
                id="inventory-submenu"
                className="sidebar__submenu"
                style={{ display: inventoryOpen ? 'block' : 'none' }}
              >
                <li>
                  <Link to="/alldeals" className="sidebar__sublink">
                    <Icon path={mdiHandshakeOutline} size={1.2} className="sidebar__icon" />
                    Deals
                  </Link>
                </li>
                <li>
                  <Link to="/allunits" className="sidebar__sublink">
                    <Icon path={mdiDomain} size={1.2} className="sidebar__icon" />
                    Units
                  </Link>
                </li>
                <li>
                  <Link to="/allprojects" className="sidebar__sublink">
                    <Icon path={mdiOfficeBuilding} size={1.2} className="sidebar__icon" />
                    Project
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/tasks" className="sidebar__link">
                <Icon path={mdiCalendarCheck} size={1.2} className="sidebar__icon" />
                <span>Tasks</span>
              </Link>
            </li>
            <li>
              <Link to="/bookingdetailsdata" className="sidebar__link">
                <Icon path={mdiCalendarCheck} size={1.2} className="sidebar__icon" />
                <span>Post Sales</span>
              </Link>
            </li>
            <li>
              <Link to="/marketing" className="sidebar__link">
                <Icon path={mdiCalendarCheck} size={1.2} className="sidebar__icon" />
                <span>Marketing</span>
              </Link>
            </li>
            <li>
              <Link className="sidebar__link">
                <Icon path={mdiPhone} size={1.2} className="sidebar__icon" />
                <span>Communication</span>
              </Link>
            </li>
            <li>
              <Link className="sidebar__link">
                <Icon path={mdiNetworkStrength4} size={1.2} className="sidebar__icon" />
                <span>Report</span>
              </Link>
            </li>
            <li>
              <Link to="/crmsettings" className="sidebar__link">
                <span className="sidebar__icon dw dw-settings"></span>
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link className="sidebar__link">
                <span className="sidebar__icon dw dw-diagram"></span>
                <span>LogOut</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="mobile-menu-overlay"></div>
    </div>
  );
}

export default Sidebar1;
