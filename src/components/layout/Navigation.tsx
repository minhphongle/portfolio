'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface NavigationProps {
  onWindowToggle: (windowType: string) => void;
  openWindows?: {
    about: boolean;
    experience: boolean;
    projects: boolean;
    playlist: boolean;
  };
}

const Navigation = ({ onWindowToggle, openWindows }: NavigationProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const burgerButtonRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        burgerButtonRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !burgerButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);
  
  const navItems = [
    { id: 'about', label: 'About Me', icon: 'user' },
    { id: 'experience', label: 'Experience', icon: 'briefcase' },
    { id: 'projects', label: 'Case Study', icon: 'folder' },
    { id: 'resume', label: 'Download Resume', icon: 'download' },
    { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
    { id: 'playlist', label: 'My Playlist', icon: 'music' },
    { id: 'theme', label: `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`, icon: theme === 'light' ? 'moon' : 'sun' }
  ];

  const getIcon = (iconName: string) => {
    const iconProps = {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const
    };

    switch (iconName) {
      case 'user':
        return (
          <svg {...iconProps}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
      case 'briefcase':
        return (
          <svg {...iconProps}>
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        );
      case 'folder':
        return (
          <svg {...iconProps}>
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        );
      case 'download':
        return (
          <svg {...iconProps}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg {...iconProps}>
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        );
      case 'music':
        return (
          <svg {...iconProps}>
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        );
      case 'moon':
        return (
          <svg {...iconProps}>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        );
      case 'sun':
        return (
          <svg {...iconProps}>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleItemClick = (itemId: string) => {
    // Close mobile menu when item is clicked
    setIsMobileMenuOpen(false);
    
    switch (itemId) {
      case 'linkedin':
        window.open('https://www.linkedin.com/in/leminhphong/', '_blank');
        break;
      case 'resume':
        // Create a download link for resume
        const link = document.createElement('a');
        link.href = '/resume/LeMinhPhong_Resume.pdf';
        link.download = 'LeMinhPhong_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      case 'about':
      case 'experience':
      case 'projects':
      case 'playlist':
        onWindowToggle(itemId);
        break;
      case 'theme':
        toggleTheme();
        break;
      default:
        break;
    }
  };

      return (
    <>
      {/* Desktop Navigation */}
      <nav
        className="navigation desktop-nav"
        style={{
          position: 'fixed',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 50
        }}
      >
        <div
          className="flex flex-col"
          style={{
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '0.5px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
            padding: '8px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(255, 255, 255, 0.1) inset'
          }}
        >
          {navItems.map((item) => (
            <div key={item.id} style={{ position: 'relative' }}>
              <button
                onClick={() => handleItemClick(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="nav-item"
                style={{
                  borderRadius: '12px',
                  padding: '12px',
                  width: '48px',
                  height: '48px',
                  fontFamily: 'var(--font-family)',
                  color: (openWindows && openWindows[item.id as keyof typeof openWindows]) ? 'var(--text-body)' : 'var(--text-grey)',
                  backgroundColor: (openWindows && openWindows[item.id as keyof typeof openWindows]) ? 'rgba(0, 64, 221, 0.1)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                {getIcon(item.icon)}
              </button>
              
              {/* Desktop Tooltip */}
              {hoveredItem === item.id && (
                <div
                  style={{
                    position: 'absolute',
                    right: '60px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-family)',
                    whiteSpace: 'nowrap',
                    zIndex: 1000,
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  {item.label}
                  {/* Arrow pointing to button */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '-4px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '0',
                      height: '0',
                      borderTop: '4px solid transparent',
                      borderBottom: '4px solid transparent',
                      borderLeft: '4px solid rgba(0, 0, 0, 0.8)'
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="mobile-nav">
        {/* Burger Button */}
        <button
          ref={burgerButtonRef}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="burger-button"
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1001,
            width: '56px',
            height: '56px',
            borderRadius: '28px',
            border: 'none',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(255, 255, 255, 0.1) inset',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
        >
          <div
            style={{
              width: '24px',
              height: '18px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <span
              style={{
                width: '100%',
                height: '2px',
                background: 'var(--text-body)',
                borderRadius: '1px',
                transform: isMobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none',
                transition: 'all 0.3s ease'
              }}
            />
            <span
              style={{
                width: '100%',
                height: '2px',
                background: 'var(--text-body)',
                borderRadius: '1px',
                opacity: isMobileMenuOpen ? 0 : 1,
                transition: 'all 0.3s ease'
              }}
            />
            <span
              style={{
                width: '100%',
                height: '2px',
                background: 'var(--text-body)',
                borderRadius: '1px',
                transform: isMobileMenuOpen ? 'rotate(-45deg) translate(8px, -8px)' : 'none',
                transition: 'all 0.3s ease'
              }}
            />
          </div>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="mobile-menu"
                         style={{
               position: 'fixed',
               top: '90px',
               left: '20px',
               zIndex: 1000,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '0.5px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(255, 255, 255, 0.1) inset',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              minWidth: '200px'
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: (openWindows && openWindows[item.id as keyof typeof openWindows]) ? 'rgba(0, 64, 221, 0.1)' : 'transparent',
                  color: (openWindows && openWindows[item.id as keyof typeof openWindows]) ? 'var(--text-body)' : 'var(--text-grey)',
                  fontFamily: 'var(--font-family)',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = (openWindows && openWindows[item.id as keyof typeof openWindows]) ? 'rgba(0, 64, 221, 0.1)' : 'transparent';
                }}
              >
                <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {getIcon(item.icon)}
                </div>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation; 