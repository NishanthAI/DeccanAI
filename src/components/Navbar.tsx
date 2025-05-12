import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { useLocation } from '../hooks/useLocation';
import { Cloud, SunMoon, Menu, X, MapPin } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentLocation } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Cloud className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-semibold">WeatherView</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {currentLocation && (
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{currentLocation.name}, {currentLocation.country}</span>
              </div>
            )}
            
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <SunMoon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-slate-600 dark:text-slate-300" />
              ) : (
                <Menu className="h-6 w-6 text-slate-600 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800 shadow-md">
          <div className="px-4 py-3 space-y-3">
            {currentLocation && (
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{currentLocation.name}, {currentLocation.country}</span>
              </div>
            )}
            
            <button 
              onClick={toggleTheme} 
              className="flex items-center w-full p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <SunMoon className="h-5 w-5 mr-2 text-slate-600 dark:text-slate-300" />
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;