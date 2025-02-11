"use client";

import { Bell, Home, LogOut, Menu, Settings, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStore from "~/store/auth.store";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const router = useRouter();

  const token = useAuthStore((state) => !!state.token);

  const { resetState } = useAuthStore();

  const handleLogout = async () => {
    // await AuthService.logout();
    // localStorage.clear();
    resetState();
    router.replace("/");
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  useEffect(() => {
    if (!token) {
      router.replace("/");
    }
  }, [token]);

  return (
    token && (
      <div className="min-h-screen bg-gray-100">
        {/* Sidebar for desktop */}
        <div className="hidden md:fixed md:flex md:flex-col md:inset-y-0 md:w-64">
          <div className="flex flex-col flex-grow bg-white pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-2xl font-bold text-indigo-600">Logo</span>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <item.icon className="mr-3 h-6 w-6" />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile sidebar */}
        <div
          className={`md:hidden fixed inset-0 z-40 ${
            isSidebarOpen ? "" : "hidden"
          }`}
        >
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white">
            <div className="flex items-center justify-between h-16 px-4">
              <span className="text-2xl font-bold text-indigo-600">Logo</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <item.icon className="mr-4 h-6 w-6" />
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-64 flex flex-col flex-1">
          {/* Top navigation */}
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <Menu size={24} />
            </button>

            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1" />
              <div className="ml-4 flex items-center md:ml-6 space-x-4">
                {/* Notifications */}
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                  <Bell size={20} />
                </button>

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User size={20} className="text-indigo-600" />
                    </div>
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1">
            <div className="py-6">{children}</div>
          </main>
        </div>
      </div>
    )
  );
};

export default DashboardLayout;
