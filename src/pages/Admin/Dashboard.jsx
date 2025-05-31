// src/pages/Dashboard.jsx
import {
  FiUsers,
  FiUser,
  FiBook,
  FiTrendingUp,
  FiPieChart,
} from "react-icons/fi";

const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Students */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-500 mb-1">
                Total Students
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                All registered students
              </p>
              <p className="text-3xl font-bold text-gray-900">2,853</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FiUsers className="text-blue-600 text-xl" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <FiTrendingUp className="mr-1" /> +12% from last month
          </p>
        </div>

        {/* Total Teachers */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-500 mb-1">
                Total Teachers
              </h3>
              <p className="text-sm text-gray-400 mb-2">All faculty members</p>
              <p className="text-3xl font-bold text-gray-900">145</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FiUser className="text-purple-600 text-xl" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <FiTrendingUp className="mr-1" /> +3% from last month
          </p>
        </div>

        {/* Active Classes */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-500 mb-1">
                Active Classes
              </h3>
              <p className="text-sm text-gray-400 mb-2">Current semester</p>
              <p className="text-3xl font-bold text-gray-900">87</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FiBook className="text-green-600 text-xl" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <FiTrendingUp className="mr-1" /> +5% from last semester
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Enrollment */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Student Enrollment
            </h3>
            <span className="text-sm text-gray-500">
              Monthly enrollment trends
            </span>
          </div>
          <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
            <p className="text-gray-400">Enrollment chart will appear here</p>
          </div>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Department Distribution
            </h3>
            <span className="text-sm text-gray-500">
              Students by department
            </span>
          </div>
          <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
            <div className="text-center">
              <FiPieChart className="mx-auto text-gray-400 text-4xl mb-2" />
              <p className="text-gray-400">Department distribution chart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
