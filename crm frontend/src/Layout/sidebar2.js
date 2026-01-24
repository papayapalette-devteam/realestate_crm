import React from 'react';
import { Home, Users, BarChart3, Settings, Grid, MessageSquare } from 'lucide-react';
import Swal from 'sweetalert2';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { param } from 'jquery';


function Sidebar() {
    const navigate = useNavigate();

    const location=useLocation()

    const currentView=location.pathname


  
    const handle_logout = () => {
      localStorage.clear();
      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have been logged out successfully!',
      }).then(() => navigate('/'));
    };
    return (
        <nav className="sidebar">
            {/* Platform Logo */}
            <div className="sidebar-logo">
                <div className="logo-icon">B</div>
            </div>

            <div className="sidebar-menu">
                <a
                    href="#"
                    className={`sidebar-icon ${currentView === '/dashboard' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}
                    title="Dashboard"
                >
                    <i className="fas fa-home"></i>
                </a>
                <a
                    href="#"
                    className={`sidebar-icon ${currentView === 'contacts' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); navigate('/contactdetails'); }}
                    title="Contacts"
                >
                    <i className="fas fa-user-friends"></i>
                </a>
                <a
                    href="#"
                    className={`sidebar-icon ${currentView === 'company' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); navigate('company'); }}
                    title="Company"
                >
                    <i className="fas fa-city"></i>
                </a>

                <a
                    href="#"
                    className={`sidebar-icon ${currentView === 'leads' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); navigate('leads'); }}
                    title="Leads"
                >
                    <i className="fas fa-filter"></i>
                </a>
                <a
                    href="#"
                    className={`sidebar-icon ${currentView === 'deals' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); navigate('deals'); }}
                    title="Deals"
                >
                    <i className="fas fa-handshake"></i>
                </a>
                <a
                    href="#"
                    className={`sidebar-icon ${currentView === 'inventory' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); navigate('inventory'); }}
                    title="Inventory"
                >
                    <i className="fas fa-warehouse"></i>
                </a>
                <a
                    href="#"
                    className={`sidebar-icon ${currentView === 'projects' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); navigate('projects'); }}
                    title="Projects"
                >
                    <i className="fas fa-building"></i>
                </a>
                <a
                    href="#"
                    className={`sidebar-icon ${currentView === 'activities' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); navigate('activities'); }}
                    title="Activities"
                >
                    <i className="fas fa-tasks"></i>
                </a>
                <a
                    href="#"
                    className={`sidebar-icon ${currentView === 'forms' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); navigate('forms'); }}
                    title="Forms"
                >
                    <i className="fas fa-clipboard-list"></i>
                </a>
                <a
                    href="#"
                    className={`sidebar-icon ${currentView === 'communication' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); navigate('communication'); }}
                    title="Communication"
                >
                    <i className="fas fa-comments"></i>
                </a>
                <a
                    href="#"
                    className={`sidebar-icon ${currentView === 'marketing' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); navigate('marketing'); }}
                    title="Marketing"
                >
                    <i className="fas fa-bullhorn"></i>
                </a>
                <a
                    href="#"
                    className={`sidebar-icon ${currentView === 'booking' || currentView === 'account' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); navigate('booking'); }}
                    title="Post Sale"
                >
                    <i className="fas fa-file-invoice-dollar"></i>
                </a>
                <a
                    href="#"
                    className={`sidebar-icon ${currentView === 'reports' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); navigate('reports'); }}
                    title="Reports"
                >
                    <i className="fas fa-chart-line"></i>
                </a>
            </div>

            <div className="sidebar-footer">
                <div
                    className={`user-profile-small ${currentView === 'profile' ? 'active-profile' : ''}`}
                    onClick={() => navigate('profile')}
                    style={{ cursor: 'pointer' }}
                >
                    <img src="https://ui-avatars.com/api/?name=Suraj+Key&background=0D8ABC&color=fff" alt="User" />
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
