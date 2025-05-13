import React, { useState } from 'react';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  const [activeContent, setActiveContent] = useState("dashboard");

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-gray-800">Dashboard</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white border border-gray-300 shadow-lg rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Total Students</h3>
                <p className="text-4xl font-extrabold text-blue-600 mb-1">2,853</p>
                <p className="text-md text-gray-500">+12% from last month</p>
              </div>
              <div className="bg-white border border-gray-300 shadow-lg rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Total Teachers</h3>
                <p className="text-4xl font-extrabold text-green-600 mb-1">145</p>
                <p className="text-md text-gray-500">+3% from last month</p>
              </div>
              <div className="bg-white border border-gray-300 shadow-lg rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Active Classes</h3>
                <p className="text-4xl font-extrabold text-purple-600 mb-1">87</p>
                <p className="text-md text-gray-500">+5% from last semester</p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="bg-white border border-gray-300 shadow-xl rounded-2xl p-20 w-full max-w-3xl text-center flex flex-col justify-center items-center">
                <h3 className="text-6xl font-extrabold text-gray-800 mb-6">Reports</h3>
                <p className="text-9xl font-bold text-blue-600 mb-4">87</p>
                <p className="text-3xl text-gray-500">+5% from last semester</p>
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
      
      <main className="pl-[300px] pr-8 pt-8 w-full bg-gray-100 min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminLayout;
