import React, { useState } from 'react';
import { Menu, X, LayoutDashboard, Building2, User, LogOut } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboardclient',
      icon: LayoutDashboard,
      tooltip: "Vue d'ensemble"
    },
    {
      title: 'Appartements',
      path: '/dashboard',
      icon: Building2,
      tooltip: 'Gestion des appartements'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
    setShowLogoutDialog(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 bg-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed lg:relative top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-64 lg:w-full`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Menu Items */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 group-hover:bg-blue-100">
                  <item.icon className="text-blue-600" size={20} />
                </div>
                <span className="text-gray-700 group-hover:text-blue-600 font-medium">
                  {item.title}
                </span>
              </a>
            ))}
          </nav>

          {/* Account Section */}
          <div className="border-t pt-4 space-y-2">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Account Pages
            </h3>
            
            <a
              href="/profile"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 group-hover:bg-blue-100">
                <User className="text-blue-600" size={20} />
              </div>
              <span className="text-gray-700 group-hover:text-blue-600 font-medium">
                Profile
              </span>
            </a>

            <button
              onClick={() => setShowLogoutDialog(true)}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group w-full"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 group-hover:bg-blue-100">
                <LogOut className="text-blue-600" size={20} />
              </div>
              <span className="text-gray-700 group-hover:text-blue-600 font-medium">
                Déconnexion
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Logout Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium mb-4">
              Confirmation de déconnexion
            </h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir vous déconnecter ?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;