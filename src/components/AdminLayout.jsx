import React, { useState } from 'react';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  const [activeContent, setActiveContent] = useState("dashboard");

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-bold">Total Students</h3>
                <p className="text-2xl font-bold">2,853</p>
                <p className="text-sm text-gray-500">+12% from last month</p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-bold">Total Teachers</h3>
                <p className="text-2xl font-bold">145</p>
                <p className="text-sm text-gray-500">+3% from last month</p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-bold">Active Classes</h3>
                <p className="text-2xl font-bold">87</p>
                <p className="text-sm text-gray-500">+5% from last semester</p>
              </div>
            </div>
          </div>
        );
      case "students":
        return <h2 className="text-2xl font-bold">Students Page</h2>;
      case "teachers":
        return <h2 className="text-2xl font-bold">Teachers Page</h2>;
      case "classes":
        return <h2 className="text-2xl font-bold">Classes Page</h2>;
      case "settings":
        return <h2 className="text-2xl font-bold">Settings Page</h2>;
      case "notifications":
        return <h2 className="text-2xl font-bold">Notifications Page</h2>;
      case "logout":
        return <h2 className="text-2xl font-bold">You have been logged out.</h2>;
      default:
        return <h2 className="text-2xl font-bold">Dashboard</h2>;
    }
  };

  return (
    <div className="flex">
      <Sidebar onMenuClick={setActiveContent} />
      <main className="ml-72 p-8 w-full bg-gray-100 min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminLayout;
