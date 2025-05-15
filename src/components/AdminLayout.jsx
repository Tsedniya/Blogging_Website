import React, { useState } from 'react';
import Sidebar from './sidebar';
import BlogReport from '../features/blog/BlogReport';
const AdminLayout = () => {
  const [activeContent, setActiveContent] = useState('dashboard');

  const renderContent = () => {
    switch (activeContent) {
      case 'dashboard':
        return (
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-10 text-3xl font-bold text-gray-800">
              Dashboard
            </h2>

            <div className="grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-8 text-center bg-white border border-gray-300 shadow-lg rounded-xl">
                <h3 className="mb-2 text-xl font-bold text-gray-800">
                  Total Students
                </h3>
                <p className="mb-1 text-4xl font-extrabold text-blue-600">
                  2,853
                </p>
                <p className="text-gray-500 text-md">+12% from last month</p>
              </div>
              <div className="p-8 text-center bg-white border border-gray-300 shadow-lg rounded-xl">
                <h3 className="mb-2 text-xl font-bold text-gray-800">
                  Total Teachers
                </h3>
                <p className="mb-1 text-4xl font-extrabold text-green-600">
                  145
                </p>
                <p className="text-gray-500 text-md">+3% from last month</p>
              </div>
              <div className="p-8 text-center bg-white border border-gray-300 shadow-lg rounded-xl">
                <h3 className="mb-2 text-xl font-bold text-gray-800">
                  Active Classes
                </h3>
                <p className="mb-1 text-4xl font-extrabold text-purple-600">
                  87
                </p>
                <p className="text-gray-500 text-md">+5% from last semester</p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex flex-col items-center justify-center w-full max-w-3xl p-20 text-center bg-white border border-gray-300 shadow-xl rounded-2xl">
                <h3 className="mb-6 text-6xl font-extrabold text-gray-800">
                  Reports
                </h3>
                <p className="mb-4 font-bold text-blue-600 text-9xl">87</p>
                <p className="text-3xl text-gray-500">+5% from last semester</p>
              </div>
            </div>
          </div>
        );
      case 'calendar':
        return <h2 className="text-2xl font-bold">Students Page</h2>;
      case 'reports':
        return (
          <div>
            <h2 className="text-2xl font-bold">Reports</h2>
            <BlogReport />
          </div>
        );
      case 'teachers':
        return <h2 className="text-2xl font-bold">Teachers Page</h2>;
      case 'classes':
        return <h2 className="text-2xl font-bold">Classes Page</h2>;
      case 'settings':
        return <h2 className="text-2xl font-bold">Settings Page</h2>;
      case 'notifications':
        return <h2 className="text-2xl font-bold">Notifications Page</h2>;
      case 'logout':
        return (
          <h2 className="text-2xl font-bold">You have been logged out.</h2>
        );
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
