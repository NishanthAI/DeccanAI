import React from 'react';
import { useLocation } from '../hooks/useLocation';
import { Location } from '../types/location';
import { MapPin, Star, Trash2 } from 'lucide-react';
import { getWeatherIcon } from '../utils/weatherHelpers';

const FavoriteLocations: React.FC = () => {
  const { 
    favorites, 
    currentLocation, 
    addToFavorites, 
    removeFromFavorites, 
    setCurrentLocation 
  } = useLocation();
  
  const isCurrentInFavorites = favorites.some(fav => 
    fav.id === currentLocation?.id
  );

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Favorite Locations</h3>
        {currentLocation && !isCurrentInFavorites && (
          <button 
            onClick={() => currentLocation && addToFavorites(currentLocation)}
            className="flex items-center text-sm text-blue-500 hover:text-blue-600 transition-colors"
            aria-label="Add current location to favorites"
          >
            <Star className="h-4 w-4 mr-1" />
            <span>Save</span>
          </button>
        )}
      </div>
      
      {favorites.length === 0 ? (
        <div className="text-center py-6 text-slate-500 dark:text-slate-400">
          <Star className="h-12 w-12 mx-auto mb-2 opacity-20" />
          <p>No favorite locations yet</p>
          <p className="text-sm mt-1">Save locations to quickly access their weather</p>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.map((location) => (
            <FavoriteLocationCard 
              key={location.id}
              location={location}
              isActive={location.id === currentLocation?.id}
              onSelect={() => setCurrentLocation(location)}
              onRemove={() => removeFromFavorites(location.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface FavoriteLocationCardProps {
  location: Location;
  isActive: boolean;
  onSelect: () => void;
  onRemove: () => void;
}

const FavoriteLocationCard: React.FC<FavoriteLocationCardProps> = ({
  location,
  isActive,
  onSelect,
  onRemove
}) => {
  // We're using mock data here since we don't have real-time data for favorites
  // In a real app, you would likely fetch weather data for each favorite location
  const tempData = { condition: location.lastCondition || 'Clear' };
  const WeatherIcon = getWeatherIcon(tempData.condition);
  
  return (
    <div 
      className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
        isActive 
          ? 'bg-blue-100 dark:bg-blue-800/30' 
          : 'hover:bg-slate-100 dark:hover:bg-slate-700/30'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
          <WeatherIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
        </div>
        <div>
          <p className="font-medium">{location.name}</p>
          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{location.country}</span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="p-1.5 text-slate-400 hover:text-red-500 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        aria-label="Remove from favorites"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default FavoriteLocations;