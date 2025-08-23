import React from 'react';
import '../css/sidebarsetting.css';
import { FiUser, FiShield, FiSettings, FiDatabase, FiBell, FiMail, FiMap } from 'react-icons/fi';
import { FaWhatsapp } from "react-icons/fa";
import Header1 from './header1';
// import Sidebar1 from './sidebar1';
import { useNavigate } from 'react-router-dom';

function Sidebarsetting() {
    const navigate = useNavigate();

    const settingsOptions = [
        {
            title: 'User Management',
            icon: <FiUser />,
           onClick: () => navigate('/addusers'),
        },
        {
            title: 'Permissions',
            icon: <FiShield />,
            onClick: () => alert('/settings/permissions'),
        },
        {
            title: 'System Settings',
            icon: <FiSettings />,
            onClick: () => alert('Open system settings modal'),
        },
        {
            title: 'Database Backup',
            icon: <FiDatabase />,
            onClick: () => alert('Backup clicked'),
        },
        {
            title: 'Notifications',
            icon: <FiBell />,
            onClick: () => alert('/settings/notifications'),
        },
        {
            title: 'Create Templates',
            icon: <FiMail />,
            onClick: () => navigate('/createtemplets'),
        },
        {
            title: 'Lead Score',
            icon: <FiMap />,
            onClick: () => navigate('/leadscoreseetings'),
        },
        {
            title: 'Whats App Login',
            icon: <FaWhatsapp />,
            onClick: () => navigate('/Whatsapplogin'),
        },
    ];

    return (
        <div>
            <Header1 />
            {/* <Sidebar1 /> */}

            <div className="crm-settings-container">
                <div className="crm-sidebar">
                    <h3>Settings</h3>
                    <ul className="crm-settings-list">
                        {settingsOptions.map((option, index) => (
                            <li key={index} className="crm-setting-item" onClick={option.onClick}>
                                <span className="icon">{option.icon}</span>
                                <span className="title">{option.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* <div className="crm-settings-content"> */}
                    {/* <h2>Select a setting from the sidebar</h2> */}
                    {/* You can later show selected setting content here */}
                {/* </div> */}
            </div>
        </div>
    );
}

export default Sidebarsetting;
