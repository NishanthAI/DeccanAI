import React, { useState } from 'react';
import { formatTemperature, getWeatherIcon, formatDate } from '../utils/weatherHelpers';
import { ForecastData, DailyForecast } from '../types/weather';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ForecastProps {
  data?: ForecastData;
}

const ForecastDay: React.FC<{ forecast: DailyForecast; isExpanded: boolean; onToggle: () => void }> = ({ 
  forecast, 
  isExpanded, 
  onToggle 
}) => {
  const WeatherIcon = getWeatherIcon(forecast.condition);
  
  return (
    <div className="card overflow-hidden transition-all duration-300">
      <div 
        className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mr-3">
            <WeatherIcon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          </div>
          <div>
            <p className="font-medium">{formatDate(forecast.date)}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{forecast.condition}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="text-right mr-4">
            <p className="font-medium">{formatTemperature(forecast.maxTemp)}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{formatTemperature(forecast.minTemp)}</p>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-slate-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-400" />
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 bg-slate-50 dark:bg-slate-700/30">
          <div className="flex overflow-x-auto pb-2 space-x-4">
            {forecast.hourly.map((hour) => {
              const HourlyIcon = getWeatherIcon(hour.condition);
              return (
                <div key={hour.time} className="flex flex-col items-center min-w-[60px]">
                  <p className="text-sm">{hour.time}</p>
                  <HourlyIcon className="h-6 w-6 my-2 text-blue-500 dark:text-blue-400" />
                  <p className="font-medium text-sm">{formatTemperature(hour.temp)}</p>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center">
              <span className="text-slate-500 dark:text-slate-400 mr-2">Precip:</span>
              <span>{forecast.precipitation}%</span>
            </div>
            <div className="flex items-center">
              <span className="text-slate-500 dark:text-slate-400 mr-2">Humidity:</span>
              <span>{forecast.humidity}%</span>
            </div>
            <div className="flex items-center">
              <span className="text-slate-500 dark:text-slate-400 mr-2">Wind:</span>
              <span>{forecast.windSpeed} mph</span>
            </div>
            <div className="flex items-center">
              <span className="text-slate-500 dark:text-slate-400 mr-2">UV Index:</span>
              <span>{forecast.uvIndex}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(0); // First day expanded by default
  
  if (!data || !data.daily) return null;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">7-Day Forecast</h3>
      <div className="space-y-3">
        {data.daily.map((day, index) => (
          <ForecastDay 
            key={day.date} 
            forecast={day} 
            isExpanded={expandedDay === index}
            onToggle={() => setExpandedDay(expandedDay === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Forecast;