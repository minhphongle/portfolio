'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  getWindowStyles: () => WindowStyles;
  getTextStyles: () => TextStyles;
}

interface WindowStyles {
  background: string;
  backdropFilter: string;
  border: string;
  boxShadow: string;
  titleBar: {
    background: string;
    borderBottom: string;
  };
  card: {
    background: string;
    border: string;
    hoverBackground: string;
  };
}

interface TextStyles {
  title: string;
  body: string;
  windowTitle: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const getWindowStyles = (): WindowStyles => {
    if (theme === 'dark') {
      return {
        background: 'rgba(31, 31, 31, 0.85)',
        backdropFilter: 'blur(42px)',
        border: '0.5px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 0.5px rgba(255, 255, 255, 0.05) inset',
        titleBar: {
          background: 'rgba(255, 255, 255, 0.08)',
          borderBottom: '0.5px solid rgba(255, 255, 255, 0.1)'
        },
        card: {
          background: 'rgba(255, 255, 255, 0.08)',
          border: '0.5px solid rgba(255, 255, 255, 0.15)',
          hoverBackground: 'rgba(255, 255, 255, 0.12)'
        }
      };
    }
    
    // Light mode
    return {
      background: 'rgba(255, 255, 255, 0.3)',
      backdropFilter: 'blur(20px)',
      border: '0.5px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(255, 255, 255, 0.1) inset',
      titleBar: {
        background: 'rgba(255, 255, 255, 0.25)',
        borderBottom: '0.5px solid rgba(0, 0, 0, 0.05)'
      },
      card: {
        background: 'rgba(255, 255, 255, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        hoverBackground: 'rgba(255, 255, 255, 0.4)'
      }
    };
  };

  const getTextStyles = (): TextStyles => {
    if (theme === 'dark') {
      return {
        title: 'rgba(255, 255, 255, 0.95)',
        body: 'rgba(255, 255, 255, 0.8)',
        windowTitle: 'rgba(255, 255, 255, 0.9)'
      };
    }
    
    // Light mode
    return {
      title: 'var(--text-title)',
      body: 'var(--text-body)',
      windowTitle: 'rgba(0, 0, 0, 0.85)'
    };
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, getWindowStyles, getTextStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 