'use client';

import React, { useState } from 'react';
import Navigation from './Navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [openWindows, setOpenWindows] = useState({
    about: false,
    experience: false,
    projects: false,
    playlist: false,
  });

  const handleWindowToggle = (windowType: string) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowType]: !prev[windowType as keyof typeof prev]
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <nav className="container mx-auto px-6 lg:px-8 py-6">
          <Navigation 
            onWindowToggle={handleWindowToggle}
            openWindows={openWindows}
          />
        </nav>
      </header>

      <main className="pt-24">
        {children}
      </main>
    </div>
  );
};

export default MainLayout; 