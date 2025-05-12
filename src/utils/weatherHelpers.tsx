import React from 'react';
import { 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudFog, 
  CloudLightning, 
  Sun, 
  CloudSun, 
  Wind, 
  Thermometer 
} from 'lucide-react';

export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°F`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('shower')) {
    return CloudRain;
  }
  
  if (conditionLower.includes('snow') || conditionLower.includes('sleet') || conditionLower.includes('hail')) {
    return CloudSnow;
  }
  
  if (conditionLower.includes('fog') || conditionLower.includes('mist') || conditionLower.includes('haze')) {
    return CloudFog;
  }
  
  if (conditionLower.includes('thunder') || conditionLower.includes('lightning')) {
    return CloudLightning;
  }
  
  if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    return Sun;
  }
  
  if (conditionLower.includes('partly cloudy') || conditionLower.includes('mostly sunny')) {
    return CloudSun;
  }
  
  if (conditionLower.includes('windy') || conditionLower.includes('breezy')) {
    return Wind;
  }
  
  if (conditionLower.includes('hot')) {
    return Thermometer;
  }
  
  // Default to cloud for any other condition
  return Cloud;
};