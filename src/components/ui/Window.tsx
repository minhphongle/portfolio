'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  isActive?: boolean;
  onClick?: () => void;
}

const Window = ({ title, children, onClose, isActive = true, onClick }: WindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
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

  // Add global mouse event listeners
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
        background: 'rgba(255, 255, 250, 0.5)',
        backdropFilter: 'blur(25px)',
        border: '1px solid rgba(33, 96, 167, 0.2)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(33, 96, 167, 0.15)',
        overflow: 'hidden',
        minWidth: '400px',
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'default',
        zIndex: isActive ? 1000 : 100,
        transition: 'z-index 0.2s ease'
      }}
    >
      {/* Window Title Bar */}
      <div 
        onMouseDown={handleMouseDown}
        style={{
          background: 'rgba(33, 96, 167, 0.6)',
          backdropFilter: 'blur(15px)',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(33, 96, 167, 0.3)',
          cursor: 'grab',
          userSelect: 'none'
        }}
      >
        <div 
          style={{
            fontFamily: 'var(--font-family)',
            fontSize: '14px',
            fontWeight: '600',
            color: 'var(--bg)'
          }}
        >
          {title}
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
      
      {/* Window Content */}
      {!isMinimized && (
        <div style={{ 
          padding: '24px',
          background: 'rgba(255, 255, 250, 0.05)',
          backdropFilter: 'blur(10px)'
        }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Window; 