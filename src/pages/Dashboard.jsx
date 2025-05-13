import React from 'react';
import { FiHome, FiUsers, FiBook, FiSettings, FiBell, FiLogOut } from 'react-icons/fi';

const Sidebar = ({ onMenuClick }) => {
  const mainMenuItems = [
    { id: "dashboard", icon: <FiHome size={24} />, label: "Dashboard" },
    { id: "students", icon: <FiUsers size={24} />, label: "Students" },
    { id: "teachers", icon: <FiUsers size={24} />, label: "Teachers" },
    { id: "classes", icon: <FiBook size={24} />, label: "Classes" },
    { id: "settings", icon: <FiSettings size={24} />, label: "Settings" },
    { id: "notifications", icon: <FiBell size={24} />, label: "Notifications" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-80 h-screen bg-gray-900 text-white flex flex-col overflow-y-auto border-r border-gray-700">
        {/* Logo Section */}
        <div className="p-6">
          <div className="flex items-center gap-4">
            <img src="/src/imgs/logo.png" alt="Logo" className="w-16 h-16" />
            <span className="text-3xl font-bold">Admin Panel</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 py-4">
          <nav>
            <ul className="space-y-2 px-4">
              {mainMenuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onMenuClick(item.id)}
                    className="w-full p-4 hover:bg-gray-700 rounded-lg flex items-center gap-4 text-left transition-colors duration-200"
                  >
                    <span>{item.icon}</span>
                    <span className="text-xl">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4">
          <button
            onClick={() => onMenuClick("logout")}
            className="w-full p-4 hover:bg-gray-700 rounded-lg flex items-center gap-4 text-left transition-colors duration-200"
          >
            <FiLogOut size={24} />
            <span className="text-xl">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-80 p-8 w-full bg-gray-100">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-8">
            <h3 className="text-xl font-bold">Total Students</h3>
            <p className="text-4xl font-bold">2,853</p>
            <p className="text-base text-gray-500">+12% from last month</p>
          </div>
          <div className="bg-white shadow rounded-lg p-8">
            <h3 className="text-xl font-bold">Total Teachers</h3>
            <p className="text-4xl font-bold">145</p>
            <p className="text-base text-gray-500">+3% from last month</p>
          </div>
          <div className="bg-white shadow rounded-lg p-8">
            <h3 className="text-xl font-bold">Active Classes</h3>
            <p className="text-4xl font-bold">87</p>
            <p className="text-base text-gray-500">+5% from last semester</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
