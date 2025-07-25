'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface SpotifyWindowProps {
  playlistId?: string;
  onClose?: () => void;
  isActive?: boolean;
  onClick?: () => void;
}

const SpotifyWindow = ({ playlistId = "6w9nkHE6jGkM9Zx7t0kcRr", onClose, isActive = true, onClick }: SpotifyWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Bring window to front immediately on mouse down
    if (onClick) {
      onClick();
    }
    
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  }, [onClick]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div 
      ref={windowRef}
      onClick={onClick}
      style={{
        background: 'radial-gradient(ellipse at top left, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%)',
        backdropFilter: 'blur(42px)',
        border: '3.5px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        width: isMinimized ? '280px' : '400px',
        height: isMinimized ? 'auto' : '390px',
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'default',
        transition: 'width 0.3s ease, height 0.3s ease, z-index 0.2s ease',
        zIndex: isActive ? 1000 : 100,
        backgroundClip: 'padding-box'
      }}
    >
      {/* Window Title Bar */}
      <div 
        onMouseDown={handleMouseDown}
        style={{
          background: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(15px)',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'grab',
          userSelect: 'none',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <div 
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: '14px',
              fontWeight: '600',
              color: 'white'
            }}
          >
            spotify-vibes.exe
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Minimize Button */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#FFD700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
              {isMinimized ? '+' : '−'}
            </span>
          </button>
          
          {/* Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: '#FF5F5F',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#fff' }}>
                ×
              </span>
            </button>
          )}
        </div>
      </div>
      
      {/* Spotify Content */}
      {!isMinimized && (
        <div style={{ 
          height: '100%',
          background: 'transparent',
          backdropFilter: 'blur(10px)',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px'
        }}>
          <iframe
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0&autoplay=1&show_cover_art=true`}
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{
              borderRadius: '0'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SpotifyWindow; 