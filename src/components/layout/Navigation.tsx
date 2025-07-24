'use client';

import { useState } from 'react';

const Navigation = () => {
  const [activeTab, setActiveTab] = useState('Home');
  
  const navItems = ['Home', 'Projects', 'About'];

  return (
    <nav 
      style={{ 
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50
      }}
    >
      <div 
        className="flex" 
        style={{ 
          gap: '16px',
          background: 'rgba(255, 255, 250, 0.5)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(33, 96, 167, 0.2)',
          borderRadius: '50px',
          padding: '12px',
          boxShadow: '0 8px 32px rgba(33, 96, 167, 0.15)'
        }}
      >
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className="nav-item"
            style={{
              borderRadius: '12px',
              padding: '12px 24px',
              width: '97px',
              height: '48px',
              fontFamily: 'var(--font-family)',
              fontStyle: 'italic',
              fontWeight: activeTab === item ? '700' : '400',
              fontSize: '17px',
              lineHeight: '141%',
              color: activeTab === item ? 'var(--text-body)' : 'var(--text-grey)',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation; 