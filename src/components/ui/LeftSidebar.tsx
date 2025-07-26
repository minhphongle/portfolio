'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const LeftSidebar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [moonPhase, setMoonPhase] = useState('');
  const [weather, setWeather] = useState({
    temp: '--',
    condition: 'Loading...',
    location: 'Singapore'
  });
  const { getWindowStyles, getTextStyles } = useTheme();
  
  const windowStyles = getWindowStyles();
  const textStyles = getTextStyles();

  // Update date every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Calculate moon phase
  useEffect(() => {
    const getMoonPhase = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      // Simplified moon phase calculation
      const totalDays = Math.floor((year - 2000) * 365.25) + 
                       Math.floor((month - 1) * 30.44) + day;
      const moonCycle = totalDays % 29.53;
      
      if (moonCycle < 1.84) return '🌑 New Moon';
      if (moonCycle < 5.53) return '🌒 Waxing Crescent';
      if (moonCycle < 9.22) return '🌓 First Quarter';
      if (moonCycle < 12.91) return '🌔 Waxing Gibbous';
      if (moonCycle < 16.61) return '🌕 Full Moon';
      if (moonCycle < 20.30) return '🌖 Waning Gibbous';
      if (moonCycle < 23.99) return '🌗 Last Quarter';
      return '🌘 Waning Crescent';
    };

    setMoonPhase(getMoonPhase(currentDate));
  }, [currentDate]);

  // Fetch weather (mock data for now)
  useEffect(() => {
    // Mock weather data - you can replace this with actual API call
    const mockWeather = () => {
      const conditions = ['☀️ Sunny', '⛅ Partly Cloudy', '🌤️ Mostly Sunny', '🌦️ Light Rain'];
      const temps = [28, 29, 30, 31, 32];
      
      setWeather({
        temp: `${temps[Math.floor(Math.random() * temps.length)]}°C`,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        location: 'Singapore'
      });
    };

    mockWeather();
    // Update weather every 30 minutes
    const weatherTimer = setInterval(mockWeather, 30 * 60 * 1000);
    
    return () => clearInterval(weatherTimer);
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div
      className="left-sidebar"
      style={{
        position: 'fixed',
        left: '20px',
        top: '20px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      {/* Date & Time Card */}
      <div
        style={{
          background: windowStyles.background,
          backdropFilter: windowStyles.backdropFilter,
          border: windowStyles.border,
          borderRadius: '16px',
          padding: '16px',
          boxShadow: windowStyles.boxShadow,
          minWidth: '200px'
        }}
      >
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: textStyles.title,
          marginBottom: '4px',
          fontFamily: 'var(--font-family)',
          textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
        }}>
          {formatTime(currentDate)}
        </div>
        <div style={{
          fontSize: '12px',
          color: textStyles.body,
          fontFamily: 'var(--font-family)',
          lineHeight: '1.4',
          textShadow: textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
        }}>
          {formatDate(currentDate)}
        </div>
      </div>

      {/* Moon Phase Card */}
      <div
        style={{
          background: windowStyles.background,
          backdropFilter: windowStyles.backdropFilter,
          border: windowStyles.border,
          borderRadius: '16px',
          padding: '16px',
          boxShadow: windowStyles.boxShadow,
          minWidth: '200px'
        }}
      >
        <div style={{
          fontSize: '12px',
          color: textStyles.body,
          marginBottom: '8px',
          fontFamily: 'var(--font-family)',
          opacity: 0.8,
          textShadow: textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
        }}>
          MOON PHASE
        </div>
        <div style={{
          fontSize: '14px',
          fontWeight: '500',
          color: textStyles.title,
          fontFamily: 'var(--font-family)',
          textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
        }}>
          {moonPhase}
        </div>
      </div>

      {/* Weather Card */}
      <div
        style={{
          background: windowStyles.background,
          backdropFilter: windowStyles.backdropFilter,
          border: windowStyles.border,
          borderRadius: '16px',
          padding: '16px',
          boxShadow: windowStyles.boxShadow,
          minWidth: '200px'
        }}
      >
        <div style={{
          fontSize: '12px',
          color: textStyles.body,
          marginBottom: '8px',
          fontFamily: 'var(--font-family)',
          opacity: 0.8,
          textShadow: textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
        }}>
          WEATHER · {weather.location.toUpperCase()}
        </div>
        <div style={{
          fontSize: '20px',
          fontWeight: '600',
          color: textStyles.title,
          marginBottom: '4px',
          fontFamily: 'var(--font-family)',
          textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
        }}>
          {weather.temp}
        </div>
        <div style={{
          fontSize: '14px',
          color: textStyles.body,
          fontFamily: 'var(--font-family)',
          textShadow: textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
        }}>
          {weather.condition}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar; 