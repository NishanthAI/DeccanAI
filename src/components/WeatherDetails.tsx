import React from 'react';
import { CurrentWeatherData } from '../types/weather';
import { 
  Droplets, 
  Wind, 
  Sunrise, 
  Sunset, 
  Eye, 
  Thermometer, 
  Gauge, 
  CloudRain
} from 'lucide-react';

interface WeatherDetailsProps {
  data?: CurrentWeatherData;
}

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold mb-4">Weather Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <DetailItem 
          icon={<Thermometer className="h-5 w-5 text-blue-500 dark:text-blue-400" />}
          label="Feels Like"
          value={`${data.feelsLike}°`}
        />
        <DetailItem 
          icon={<Droplets className="h-5 w-5 text-blue-500 dark:text-blue-400" />}
          label="Humidity"
          value={`${data.humidity}%`}
        />
        <DetailItem 
          icon={<Wind className="h-5 w-5 text-blue-500 dark:text-blue-400" />}
          label="Wind"
          value={`${data.windSpeed} mph`}
        />
        <DetailItem 
          icon={<CloudRain className="h-5 w-5 text-blue-500 dark:text-blue-400" />}
          label="Precipitation"
          value={`${data.precipitation}%`}
        />
        <DetailItem 
          icon={<Gauge className="h-5 w-5 text-blue-500 dark:text-blue-400" />}
          label="Pressure"
          value={`${data.pressure} hPa`}
        />
        <DetailItem 
          icon={<Eye className="h-5 w-5 text-blue-500 dark:text-blue-400" />}
          label="Visibility"
          value={`${data.visibility} mi`}
        />
        <DetailItem 
          icon={<Sunrise className="h-5 w-5 text-blue-500 dark:text-blue-400" />}
          label="Sunrise"
          value={data.sunrise}
        />
        <DetailItem 
          icon={<Sunset className="h-5 w-5 text-blue-500 dark:text-blue-400" />}
          label="Sunset"
          value={data.sunset}
        />
      </div>
      
      {data.airQuality && (
        <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
          <p className="text-sm font-medium mb-1">Air Quality</p>
          <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${getAirQualityColor(data.airQuality.index)}`}
              style={{ width: `${Math.min(data.airQuality.index * 10, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">Good</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Unhealthy</span>
          </div>
          <p className="text-sm mt-2">{getAirQualityDescription(data.airQuality.index)}</p>
        </div>
      )}
    </div>
  );
};

const getAirQualityColor = (index: number): string => {
  if (index <= 3) return 'bg-green-500';
  if (index <= 6) return 'bg-yellow-500';
  if (index <= 9) return 'bg-orange-500';
  return 'bg-red-500';
};

const getAirQualityDescription = (index: number): string => {
  if (index <= 3) return 'Good - Ideal for outdoor activities';
  if (index <= 6) return 'Moderate - Fine for most individuals';
  if (index <= 9) return 'Unhealthy for sensitive groups';
  return 'Unhealthy - Reduce outdoor activities';
};

export default WeatherDetails;