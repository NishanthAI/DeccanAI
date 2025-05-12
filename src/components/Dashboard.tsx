import React from 'react';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import WeatherTrends from './WeatherTrends';
import FavoriteLocations from './FavoriteLocations';
import WeatherDetails from './WeatherDetails';
import LocationSearch from './LocationSearch';
import { useWeather } from '../hooks/useWeather';
import { useLocation } from '../hooks/useLocation';
import { Loader, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentLocation } = useLocation();
  const { weatherData, isLoading, error } = useWeather(currentLocation);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader className="h-12 w-12 text-blue-500 animate-spin mb-4" />
        <p className="text-lg text-slate-600 dark:text-slate-300">Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-lg text-slate-600 dark:text-slate-300">Failed to load weather data.</p>
        <button className="btn-primary mt-4">Try Again</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-3/4">
              <CurrentWeather data={weatherData?.current} />
            </div>
            <div className="w-full md:w-1/4">
              <LocationSearch />
            </div>
          </div>
          <div className="mb-6">
            <Forecast data={weatherData?.forecast} />
          </div>
          <div className="mb-6">
            <WeatherTrends data={weatherData?.history} />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="mb-6">
            <FavoriteLocations />
          </div>
          <div>
            <WeatherDetails data={weatherData?.current} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;