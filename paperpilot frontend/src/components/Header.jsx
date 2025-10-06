import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, Settings, Mail, Upload, Search, FileText, Download, Menu, X, HelpCircle } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navigationItems = [
    {
      name: 'Upload Research',
      path: '/upload',
      icon: <Upload className="w-4 h-4" />,
      action: () => navigate('/upload')
    },
    {
      name: 'Search Papers',
      path: '/paper/search',
      icon: <Search className="w-4 h-4" />,
      action: () => navigate('/paper/search')
    },
    {
      name: 'How It Works',
      path: '/home',
      icon: <HelpCircle className="w-4 h-4" />,
      action: () => {
        // Navigate to home first, then scroll to how it works section
        navigate('/home');
        setTimeout(() => {
          const howItWorksSection = document.getElementById('how-it-works');
          if (howItWorksSection) {
            howItWorksSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  ];

  return (
    <div>
      {/* Main Header */}
      <header className="bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={() => navigate('/home')}
              className="text-2xl font-bold hover:opacity-80 transition"
            >
              PaperPilot
            </button>

            {/* Desktop Navigation */}
            {isAuthenticated && (
              <nav className="hidden md:flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={item.action}
                             className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                               isActiveRoute(item.path)
                                 ? 'bg-white text-[#002C79]'
                                 : 'text-white hover:bg-white hover:text-[#002C79]'
                             }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                ))}
              </nav>
            )}

            {/* Auth Section */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  {/* Profile Button */}
                  <button 
                    onClick={() => navigate('/home')}
                           className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-white hover:bg-white hover:text-[#002C79] transition-all duration-200 hover:scale-105"
                    title="Profile"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline font-medium">
                      {user?.name || user?.email?.split('@')[0] || 'Profile'}
                    </span>
                  </button>

                  {/* Logout Button */}
                  <button 
                    onClick={handleLogout}
                           className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-white border-opacity-30 hover:bg-white hover:text-[#002C79] transition-all duration-200 hover:scale-105"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline font-medium">Logout</span>
                  </button>

                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                           className="md:hidden p-2 rounded-lg hover:bg-white hover:text-[#002C79] transition-all duration-200"
                  >
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </>
              ) : (
                /* Login/Signup Buttons */
                <div className="flex gap-4">
                  <button 
                    onClick={() => navigate('/login')}
                    className="px-6 py-2 text-lg rounded-xl border font-medium bg-white text-black hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => navigate('/signup')}
                    className="px-6 py-2 text-lg rounded-xl border bg-white text-black hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isAuthenticated && isMobileMenuOpen && (
          <div className="md:hidden bg-[#175ACD] border-t border-white border-opacity-20">
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    item.action();
                    setIsMobileMenuOpen(false);
                  }}
                           className={`flex items-center gap-3 w-full px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                             isActiveRoute(item.path)
                               ? 'bg-white text-[#002C79]'
                               : 'text-white hover:bg-white hover:text-[#002C79]'
                           }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header