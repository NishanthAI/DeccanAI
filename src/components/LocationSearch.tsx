import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from '../hooks/useLocation';
import { Search, MapPin, Loader } from 'lucide-react';
import { searchLocations } from '../services/weatherService';
import { Location } from '../types/location';

const LocationSearch: React.FC = () => {
  const { setCurrentLocation, currentLocation } = useLocation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length >= 2) {
        setIsSearching(true);
        try {
          const locations = await searchLocations(query);
          setResults(locations);
          setIsDropdownOpen(true);
        } catch (error) {
          console.error('Error searching locations:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setResults([]);
        setIsDropdownOpen(false);
      }
    }, 500);
    
    return () => clearTimeout(searchTimeout);
  }, [query]);
  
  const handleLocationSelect = (location: Location) => {
    setCurrentLocation(location);
    setQuery('');
    setIsDropdownOpen(false);
  };
  
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd use the coordinates to fetch location data
          // For now, we'll just create a mock location
          const currentLocation: Location = {
            id: 'current',
            name: 'Current Location',
            country: '',
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setCurrentLocation(currentLocation);
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    }
  };

  return (
    <div className="card p-4" ref={searchRef}>
      <div className="relative">
        <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden">
          <div className="pl-3 text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search location..."
            className="w-full py-2 px-3 focus:outline-none bg-transparent"
          />
          {isSearching && (
            <div className="pr-3">
              <Loader className="h-4 w-4 text-blue-500 animate-spin" />
            </div>
          )}
        </div>
        
        {isDropdownOpen && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {results.map((location) => (
              <div
                key={location.id}
                className="flex items-center p-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                onClick={() => handleLocationSelect(location)}
              >
                <MapPin className="h-4 w-4 text-slate-400 mr-2" />
                <div>
                  <p className="font-medium">{location.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{location.country}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <button
        onClick={handleUseCurrentLocation}
        className="flex items-center justify-center w-full mt-3 py-2 text-sm text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
      >
        <MapPin className="h-4 w-4 mr-1" />
        <span>Use current location</span>
      </button>
    </div>
  );
};

export default LocationSearch;