"use client";

import { Activity, DollarSign, Package, Users } from "lucide-react";

const DashboardPage = () => {
  const stats = [
    { name: "Total Users", value: "1,234", change: "+12%", icon: Users },
    { name: "Revenue", value: "$12,345", change: "+8%", icon: DollarSign },
    { name: "Active Projects", value: "23", change: "+2%", icon: Activity },
    { name: "Completed Tasks", value: "456", change: "+15%", icon: Package },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Activity
            </h3>
            <div className="mt-4">
              {/* Add your activity content here */}
              <p className="text-gray-500">No recent activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
