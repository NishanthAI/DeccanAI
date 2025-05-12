import React from 'react';
import { formatTemperature, getWeatherIcon } from '../utils/weatherHelpers';
import { CurrentWeatherData } from '../types/weather';
import { Droplets, Wind } from 'lucide-react';

interface CurrentWeatherProps {
  data?: CurrentWeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  if (!data) return null;

  const WeatherIcon = getWeatherIcon(data.condition);
  
  return (
    <div className="card p-6 overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-1">{data.temperature && formatTemperature(data.temperature)}</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">{data.condition}</p>
          
          <div className="flex items-center text-slate-500 dark:text-slate-400 space-x-4">
            <div className="flex items-center">
              <Droplets className="h-4 w-4 mr-1" />
              <span>{data.humidity}%</span>
            </div>
            <div className="flex items-center">
              <Wind className="h-4 w-4 mr-1" />
              <span>{data.windSpeed} mph</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-4 mb-2">
            <WeatherIcon className="h-16 w-16 text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Updated: {data.lastUpdated}</p>
        </div>
      </div>
      
      {data.alerts && data.alerts.length > 0 && (
        <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/30 border-l-4 border-amber-500 rounded-r-md">
          <p className="text-amber-800 dark:text-amber-200 font-medium">{data.alerts[0].title}</p>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;