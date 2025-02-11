import React from "react";
import { X, Menu } from "lucide-react";

interface NavbarProps {
  setLoginModalOpen: (open: boolean) => void;
  setRegisterModalOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Navbar = ({
  setLoginModalOpen,
  setRegisterModalOpen,
  isMobileMenuOpen,
  setMobileMenuOpen,
}: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl sm:text-2xl font-bold text-indigo-600">
              Logo
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setLoginModalOpen(true)}
              className="px-3 py-2 sm:px-4 text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => setRegisterModalOpen(true)}
              className="px-3 py-2 sm:px-4 text-sm sm:text-base bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Register
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
