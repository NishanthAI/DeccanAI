import React, { createContext, useState, useEffect } from 'react';
import { Location } from '../types/location';

interface LocationContextType {
  currentLocation: Location | null;
  favorites: Location[];
  setCurrentLocation: (location: Location) => void;
  addToFavorites: (location: Location) => void;
  removeFromFavorites: (id: string) => void;
}

export const LocationContext = createContext<LocationContextType>({
  currentLocation: null,
  favorites: [],
  setCurrentLocation: () => {},
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

interface LocationProviderProps {
  children: React.ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [favorites, setFavorites] = useState<Location[]>([]);
  
  useEffect(() => {
    // Load favorites from local storage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Set default location
    const defaultLocation: Location = {
      id: 'new-york',
      name: 'New York',
      country: 'US',
      lat: 40.7128,
      lon: -74.0060,
    };
    setCurrentLocation(defaultLocation);
    
    // You could use geolocation here to get user's actual location
    // navigator.geolocation.getCurrentPosition(...)
  }, []);
  
  useEffect(() => {
    // Save favorites to local storage
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);
  
  const addToFavorites = (location: Location) => {
    setFavorites(prev => {
      // If location already exists, don't add it again
      if (prev.some(fav => fav.id === location.id)) {
        return prev;
      }
      
      // Add location with lastCondition if available from currentLocation
      const locationWithWeather = {
        ...location,
        lastCondition: location.lastCondition || 'Clear',
      };
      
      return [...prev, locationWithWeather];
    });
  };
  
  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(location => location.id !== id));
  };
  
  const setCurrent = (location: Location) => {
    setCurrentLocation({
      ...location,
      lastCondition: currentLocation?.lastCondition || 'Clear',
    });
  };
  
  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        favorites,
        setCurrentLocation: setCurrent,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};