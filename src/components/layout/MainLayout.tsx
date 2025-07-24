'use client';

import React from 'react';
import Navigation from './Navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <nav className="container mx-auto px-6 lg:px-8 py-6">
          <Navigation />
        </nav>
      </header>

      <main className="pt-24">
        {children}
      </main>
    </div>
  );
};

export default MainLayout; 