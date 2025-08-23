// 

import {React} from 'react';
// import '../css/crmsettings.css'
import { FiUser, FiShield, FiSettings, FiDatabase, FiBell, FiMail, FiMap } from 'react-icons/fi';
import { FaWhatsapp } from "react-icons/fa";
import Header1 from './header1';
// import Sidebar1 from './sidebar1';
import { useNavigate } from 'react-router-dom';
import Sidebarsetting from './settingsidebar';


function Crmsettings() {

    const navigate=useNavigate()

    const settingsOptions = [
    {
      title: 'User Management',
      icon: <FiUser />,
      description: 'Manage users, roles, and access.',
      onClick: () => navigate('/addusers'),
    },
    {
      title: 'Permissions',
      icon: <FiShield />,
      description: 'Control what users can see and do.',
      onClick: () => alert('/settings/permissions'),
    },
    {
      title: 'System Settings',
      icon: <FiSettings />,
      description: 'Configure system-wide options.',
      onClick: () => alert('Open system settings modal'),
    },
    {
      title: 'Database Backup',
      icon: <FiDatabase />,
      description: 'Manage and schedule backups.',
      onClick: () => alert('Backup clicked'),
    },
    {
      title: 'Notifications',
      icon: <FiBell />,
      description: 'Setup alerts and notifications.',
      onClick: () => alert('/settings/notifications'),
    },
    {
      title: 'Create Templates',
      icon: <FiMail />,
      description: 'Customize automated emails.',
      onClick: () => navigate('/createtemplets'),
    },
    {
        title: 'Lead Score',
        icon: <FiMap />,
        description: 'Create Lead Score Criteria...',
        onClick: () => navigate('/leadscoreseetings'),
      },

      {
        title: 'Whats App Login',
        icon: <FaWhatsapp />,
        description: 'Login Your Whats App Account...',
        onClick: () => navigate('/Whatsapplogin'),
      },
  ];

  const tileColors = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)"
  ];
  
 



  return (
  <div>
    <Header1/>
    {/* <Sidebar1/> */}
  <Sidebarsetting/>
    {/* <h4 style={{marginLeft:"70px",marginTop:"60px"}}>Settings</h4> */}
    {/* <div className="dashboard-container" style={{margin:"50px"}}>
      <div className="card-grid">
        {settingsOptions.map((option, index) => (
          <div className="setting-card" key={index} onClick={option.onClick}   style={{ background: tileColors[index % tileColors.length] }}>
            <div className="card-icon">{option.icon}</div>
            <h3 className="card-title">{option.title}</h3>
            <p className="card-description">{option.description}</p>
          </div>
        ))}
      </div>
      
    </div> */}
    </div>
  );
}

export default Crmsettings;
