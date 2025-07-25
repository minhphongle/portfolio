'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface CaseStudyWindowProps {
  caseStudy: CaseStudy;
  onClose?: () => void;
  isActive?: boolean;
  onClick?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  background: string;
  content: string;
}

const CaseStudyWindow = ({ 
  caseStudy, 
  onClose, 
  isActive = true, 
  onClick, 
  onPrevious, 
  onNext, 
  hasPrevious = false, 
  hasNext = false 
}: CaseStudyWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 300, y: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Debug logging
  console.log('CaseStudyWindow props:', {
    caseStudyId: caseStudy.id,
    hasPrevious,
    hasNext,
    isMinimized
  });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
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
    <>
      <div 
        ref={windowRef}
        onClick={onClick}
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 100%)',
          backdropFilter: 'blur(42px)',
          border: '3.5px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          overflow: 'visible', // Changed from 'hidden' to 'visible'
          width: isMinimized ? '320px' : '700px',
          height: isMinimized ? 'auto' : '600px',
          position: 'absolute',
          left: position.x,
          top: position.y,
          cursor: isDragging ? 'grabbing' : 'default',
          zIndex: isActive ? 1000 : 100,
          transition: 'z-index 0.2s ease',
          backgroundClip: 'padding-box'
        }}
      >
      {/* Window Title Bar */}
      <div 
        onMouseDown={handleMouseDown}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
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
        <div 
          style={{
            fontFamily: 'var(--font-family)',
            fontSize: '14px',
            fontWeight: '600',
            color: 'rgba(0, 0, 0, 0.8)'
          }}
        >
          {caseStudy.title}.md
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
          background: 'transparent',
          backdropFilter: 'blur(10px)',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
          height: 'calc(100% - 60px)',
          overflow: 'auto'
        }}>
          {/* Case Study Header */}
          <div style={{
            marginBottom: '24px'
          }}>
            {/* Hero Image */}
            <div style={{
              width: '100%',
              height: '200px',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '20px',
              position: 'relative'
            }}>
              <Image
                src={caseStudy.image}
                alt={caseStudy.title}
                fill
                style={{
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Title and Tags */}
            <h1 style={{
              fontFamily: 'var(--font-family)',
              fontSize: '28px',
              fontWeight: '700',
              color: 'var(--text-title)',
              margin: '0 0 12px 0',
              lineHeight: '1.2'
            }}>
              {caseStudy.title}
            </h1>

            <p style={{
              fontFamily: 'var(--font-family)',
              fontSize: '16px',
              color: 'var(--text-body)',
              margin: '0 0 16px 0',
              lineHeight: '1.5'
            }}>
              {caseStudy.description}
            </p>

            {/* Tags */}
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '24px'
            }}>
              {caseStudy.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    background: 'rgba(33, 96, 167, 0.2)',
                    color: 'var(--text-title)',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-family)',
                    fontWeight: '500'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Background Section */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontFamily: 'var(--font-family)',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--text-title)',
              margin: '0 0 16px 0',
              lineHeight: '1.3'
            }}>
              Background
            </h2>
            <p style={{
              fontFamily: 'var(--font-family)',
              fontSize: '14px',
              color: 'var(--text-body)',
              margin: '0',
              lineHeight: '1.6'
            }}>
              {caseStudy.background}
            </p>
          </div>

          {/* Content Section */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-family)',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--text-title)',
              margin: '0 0 16px 0',
              lineHeight: '1.3'
            }}>
              Content
            </h2>
            <div style={{
              fontFamily: 'var(--font-family)',
              fontSize: '14px',
              color: 'var(--text-body)',
              lineHeight: '1.6',
              whiteSpace: 'pre-line'
            }}>
              {caseStudy.content}
            </div>
          </div>
        </div>
      )}
      </div>
      
      {/* Navigation Windows - Outside main window */}
      {!isMinimized && (
        <>
          {/* Previous Button Window */}
          {hasPrevious && (
            <div
              onClick={onPrevious}
              style={{
                position: 'absolute',
                left: position.x - 80,
                top: position.y + 300,
                transform: 'translateY(-50%)',
                width: '60px',
                height: '60px',
                background: 'radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 100%)',
                backdropFilter: 'blur(42px)',
                border: '3.5px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                backgroundClip: 'padding-box',
                zIndex: isActive ? 1001 : 101
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.background = 'radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.3) 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.background = 'radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 100%)';
              }}
            >
              <span style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'rgba(0, 0, 0, 0.8)',
                lineHeight: '1'
              }}>
                ‹
              </span>
            </div>
          )}

          {/* Next Button Window */}
          {hasNext && (
            <div
              onClick={onNext}
              style={{
                position: 'absolute',
                left: position.x + 700 + 20,
                top: position.y + 300,
                transform: 'translateY(-50%)',
                width: '60px',
                height: '60px',
                background: 'radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 100%)',
                backdropFilter: 'blur(42px)',
                border: '3.5px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                backgroundClip: 'padding-box',
                zIndex: isActive ? 1001 : 101
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.background = 'radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.3) 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.background = 'radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 100%)';
              }}
            >
              <span style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'rgba(0, 0, 0, 0.8)',
                lineHeight: '1'
              }}>
                ›
              </span>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CaseStudyWindow;
