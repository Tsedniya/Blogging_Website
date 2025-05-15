import React, { useState } from 'react';
import {
  FiHome,
  FiCalendar,
  FiFileText,
  FiSettings,
  FiMessageSquare,
  FiBell,
  FiLogOut,
} from 'react-icons/fi';

const Sidebar = ({ onMenuClick }) => {
  const [active, setActive] = useState('dashboard');

  const topItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome size={20} /> },
    { id: 'calendar', label: 'Calendar', icon: <FiCalendar size={20} /> },
    { id: 'reports', label: 'Reports', icon: <FiFileText size={20} /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings size={20} /> },
  ];

  const bottomItems = [
    { id: 'messages', label: 'Messages', icon: <FiMessageSquare size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <FiBell size={20} /> },
    { id: 'logout', label: 'Logout', icon: <FiLogOut size={20} /> },
  ];

  const renderMenuItem = (item) => (
    <li
      key={item.id}
      onClick={() => {
        onMenuClick(item.id);
        setActive(item.id);
      }}
      className={`flex items-center gap-4 px-6 py-3 rounded-lg cursor-pointer transition-colors 
        ${active === item.id ? 'bg-blue-800 text-black font-semibold' : 'hover:bg-gray-400 text-gray-300 font-bold'}`}
    >
      {item.icon}
      <span className="text-lg">{item.label}</span>
    </li>
  );

return (
  <aside className="w-72 h-screen  text-black flex flex-col justify-between fixed left-0 top-0 overflow-y-auto shadow-xl border-r border-gray-700">
    {/* Logo Section */}
    <div className="p-6 border-b ">
      <a href="/" className="flex items-center gap-3">
        <img src="/src/imgs/logo.png" alt="Logo" className="w-10 h-10" />
        <span className="text-2xl font-bold text-black">Admin Panel</span>
      </a>
    </div>

    {/* Navigation Section */}
    <nav className="mt-4">
      <ul className="space-y-3">
        {topItems.map(renderMenuItem)}
      </ul>
    </nav>

    {/* Bottom Section */}
    <div className="mt-auto mb-6">
      <ul className="space-y-3">
        {bottomItems.map(renderMenuItem)}
      </ul>
    </div>
  </aside>
);
  ;
};

export default Sidebar;
