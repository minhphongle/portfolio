'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  isActive?: boolean;
  onClick?: () => void;
  initialPosition?: { x: number; y: number };
}

const Window = ({ title, children, onClose, isActive = true, onClick, initialPosition }: WindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const { getWindowStyles, getTextStyles } = useTheme();
  
  const windowStyles = getWindowStyles();
  const textStyles = getTextStyles();

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Bring window to front immediately on mouse down
    if (onClick) {
      onClick();
    }
    
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    setIsDragging(true);
  }, [onClick, position.x, position.y]);

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
      className="window-container"
      style={{
        background: windowStyles.background,
        backdropFilter: windowStyles.backdropFilter,
        border: windowStyles.border,
        borderRadius: '12px',
        boxShadow: windowStyles.boxShadow,
        overflow: 'hidden',
        minWidth: '400px',
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'default',
        zIndex: isActive ? 40 : 30,
        transition: 'z-index 0.2s ease'
      }}
    >
      {/* Window Title Bar */}
      <div 
        onMouseDown={handleMouseDown}
        style={{
          background: windowStyles.titleBar.background,
          backdropFilter: 'blur(10px)',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'grab',
          userSelect: 'none',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          borderBottom: windowStyles.titleBar.borderBottom
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div 
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: '13px',
              fontWeight: '500',
              color: textStyles.windowTitle,
              letterSpacing: '-0.01em'
            }}
          >
            {title}
          </div>
          
          {/* Drag Indicator */}
          <div
            style={{
              display: 'flex',
              gap: '2px',
              opacity: 0.6,
              animation: 'dragHint 2s ease-in-out infinite',
              cursor: 'grab',
              position: 'relative'
            }}
            title="Drag to move window"
          >
            <div style={{
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: textStyles.windowTitle,
              animation: 'pulse 1.5s ease-in-out infinite, dragHintDot 2s ease-in-out infinite'
            }} />
            <div style={{
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: textStyles.windowTitle,
              animation: 'pulse 1.5s ease-in-out infinite 0.2s, dragHintDot 2s ease-in-out infinite 0.2s'
            }} />
            <div style={{
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: textStyles.windowTitle,
              animation: 'pulse 1.5s ease-in-out infinite 0.4s, dragHintDot 2s ease-in-out infinite 0.4s'
            }} />
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Minimize Button */}
                      <button
              onClick={() => setIsMinimized(!isMinimized)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: '#FFBD2E',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFB000';
                const span = e.currentTarget.querySelector('span');
                if (span) span.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFBD2E';
                const span = e.currentTarget.querySelector('span');
                if (span) span.style.opacity = '0';
              }}
            >
              <span style={{ 
                fontSize: '8px', 
                fontWeight: '700', 
                color: 'rgba(0, 0, 0, 0.7)',
                fontFamily: 'var(--font-family)',
                opacity: '0',
                transition: 'opacity 0.2s ease'
              }}>
                {isMinimized ? '+' : '−'}
              </span>
            </button>
          
          {/* Close Button */}
          {onClose && (
                           <button
                onClick={onClose}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  background: '#FF5F57',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FF3B30';
                  const span = e.currentTarget.querySelector('span');
                  if (span) span.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FF5F57';
                  const span = e.currentTarget.querySelector('span');
                  if (span) span.style.opacity = '0';
                }}
             >
                <span style={{ 
                  fontSize: '8px', 
                  fontWeight: '700', 
                  color: 'rgba(0, 0, 0, 0.7)',
                  fontFamily: 'var(--font-family)',
                  opacity: '0',
                  transition: 'opacity 0.2s ease'
                }}>
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
          background: 'transparent',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px'
        }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Window; 