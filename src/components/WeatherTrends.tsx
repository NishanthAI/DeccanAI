import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { HistoricalData } from '../types/weather';
import { useTheme } from '../hooks/useTheme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeatherTrendsProps {
  data?: HistoricalData;
}

type MetricType = 'temperature' | 'precipitation' | 'wind';

const WeatherTrends: React.FC<WeatherTrendsProps> = ({ data }) => {
  const [activeMetric, setActiveMetric] = useState<MetricType>('temperature');
  const { theme } = useTheme();
  
  if (!data) return null;

  const isDark = theme === 'dark';
  
  const textColor = isDark ? '#e2e8f0' : '#334155';
  const gridColor = isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.2)';
  
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDark ? '#e2e8f0' : '#334155',
        bodyColor: isDark ? '#e2e8f0' : '#334155',
        borderColor: isDark ? '#475569' : '#e2e8f0',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
        },
      },
      y: {
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
        },
      },
    },
  };
  
  const getChartData = () => {
    const labels = data.days.map(day => day.date);
    
    if (activeMetric === 'temperature') {
      return {
        labels,
        datasets: [
          {
            label: 'Max Temperature',
            data: data.days.map(day => day.maxTemp),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            tension: 0.2,
          },
          {
            label: 'Min Temperature',
            data: data.days.map(day => day.minTemp),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            tension: 0.2,
          },
        ],
      };
    }
    
    if (activeMetric === 'precipitation') {
      return {
        labels,
        datasets: [
          {
            label: 'Precipitation',
            data: data.days.map(day => day.precipitation),
            borderColor: '#0ea5e9',
            backgroundColor: 'rgba(14, 165, 233, 0.2)',
            tension: 0.2,
          },
        ],
      };
    }
    
    // Wind
    return {
      labels,
      datasets: [
        {
          label: 'Wind Speed',
          data: data.days.map(day => day.windSpeed),
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          tension: 0.2,
        },
      ],
    };
  };

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Weather Trends</h3>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeMetric === 'temperature' 
                ? 'bg-blue-500 text-white' 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
            onClick={() => setActiveMetric('temperature')}
          >
            Temperature
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeMetric === 'precipitation' 
                ? 'bg-blue-500 text-white' 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
            onClick={() => setActiveMetric('precipitation')}
          >
            Precipitation
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeMetric === 'wind' 
                ? 'bg-blue-500 text-white' 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
            onClick={() => setActiveMetric('wind')}
          >
            Wind
          </button>
        </div>
      </div>
      
      <div className="h-[300px]">
        <Line options={chartOptions} data={getChartData()} />
      </div>
    </div>
  );
};

export default WeatherTrends;