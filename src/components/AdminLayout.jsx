import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import api from "../common/api/connect"; // Your API utility

const AdminLayout = () => {
  const [activeContent, setActiveContent] = useState("dashboard");
  const [users, setUsers] = useState([]);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReports: 0,
    totalBlogs: 0,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching users...");
        const response = await api.get("/users");
        console.log("Users fetched successfully:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, [activeContent]);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/dashboard-stats");
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return (
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-10 text-3xl font-bold text-gray-800">
              Dashboard
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white border border-gray-300 shadow-lg rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Total User
                </h3>
                <p className="text-4xl font-extrabold text-blue-600 mb-1">
                  {stats.totalUsers}
                </p>
              </div>
              <div className="bg-white border border-gray-300 shadow-lg rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Total Blog
                </h3>
                <p className="text-4xl font-extrabold text-green-600 mb-1">
                  {stats.totalBlogs}
                </p>
              </div>
              <div className="bg-white border border-gray-300 shadow-lg rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Total Reports
                </h3>
                <p className="text-4xl font-extrabold text-purple-600 mb-1">
                  {stats.totalReports}
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                All Users
              </h2>
              <div className="bg-white border border-gray-300 shadow-lg rounded-xl p-4 overflow-y-auto max-h-[500px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-4 border-b font-medium text-gray-600">
                        ID
                      </th>
                      <th className="p-4 border-b font-medium text-gray-600">
                        Name
                      </th>
                      <th className="p-4 border-b font-medium text-gray-600">
                        Email
                      </th>
                      <th className="p-4 border-b font-medium text-gray-600">
                        Registered At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="p-4 border-b text-gray-800">
                          {user.id}
                        </td>
                        <td className="p-4 border-b text-gray-800">
                          {user.name}
                        </td>
                        <td className="p-4 border-b text-gray-800">
                          {user.email}
                        </td>
                        <td className="p-4 border-b text-gray-800">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "calendar":
        return <h2 className="text-2xl font-bold">Students Page</h2>;
      case "reports":
        return (
          <div>
            <h2 className="text-2xl font-bold">Reports</h2>
            <BlogReport />
          </div>
        );
      case "teachers":
        return <h2 className="text-2xl font-bold">Teachers Page</h2>;
      case "classes":
        return <h2 className="text-2xl font-bold">Classes Page</h2>;
      case "settings":
        return <h2 className="text-2xl font-bold">Settings Page</h2>;
      case "notifications":
        return <h2 className="text-2xl font-bold">Notifications Page</h2>;
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
