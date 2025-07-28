'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '../../context/ThemeContext';

// Function to parse content with embedded images, iframes, and PDFs
const parseContent = (content: string) => {
  // First, extract any iframe content and replace with placeholders
  const iframeRegex = /<iframe[^>]*>.*?<\/iframe>/gi;
  const iframes: string[] = [];
  let processedContent = content.replace(iframeRegex, (match) => {
    iframes.push(match);
    return `[IFRAME:${iframes.length - 1}]`;
  });
  
  // Split content by image markers, iframe markers, and PDF markers
  const parts = processedContent.split(/(\[(?:IMAGE|IFRAME|PDF):[^\]]+\])/g);
  
  return parts.map((part, index) => {
    // Check if this part is an image marker
    const imageMatch = part.match(/\[IMAGE:([^\]]+)\]/);
    if (imageMatch) {
      const imagePath = imageMatch[1];
      return {
        type: 'image',
        content: imagePath,
        key: `image-${index}`
      };
    }
    
    // Check if this part is a PDF marker
    const pdfMatch = part.match(/\[PDF:([^\]]+)\]/);
    if (pdfMatch) {
      const pdfPath = pdfMatch[1];
      return {
        type: 'pdf',
        content: pdfPath,
        key: `pdf-${index}`
      };
    }
    
    // Check if this part is an iframe marker
    const iframeMatch = part.match(/\[IFRAME:(\d+)\]/);
    if (iframeMatch) {
      const iframeIndex = parseInt(iframeMatch[1]);
      return {
        type: 'iframe',
        content: iframes[iframeIndex],
        key: `iframe-${index}`
      };
    } else {
      // Regular text content
      return {
        type: 'text',
        content: part,
        key: `text-${index}`
      };
    }
  }).filter(item => item.content.trim() !== ''); // Remove empty parts
};

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
  const { getWindowStyles, getTextStyles } = useTheme();
  
  const windowStyles = getWindowStyles();
  const textStyles = getTextStyles();

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
        className="case-study-window"
        style={{
          background: windowStyles.background,
          backdropFilter: windowStyles.backdropFilter,
          border: windowStyles.border,
          borderRadius: '12px',
          boxShadow: windowStyles.boxShadow,
          overflow: 'hidden',
          width: isMinimized ? '320px' : '700px',
          height: isMinimized ? 'auto' : '600px',
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
        <div 
          style={{
            fontFamily: 'var(--font-family)',
            fontSize: '13px',
            fontWeight: '500',
            color: textStyles.windowTitle,
            letterSpacing: '-0.01em'
          }}
        >
          {caseStudy.title}
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
          borderBottomRightRadius: '12px',
          height: 'calc(100% - 60px)',
          overflow: 'auto',
          boxSizing: 'border-box',
          width: '100%'
        }}>
          {/* Case Study Header */}
          <div style={{
            marginBottom: '24px'
          }}>
            {/* Title and Tags */}
            <h1 style={{
              fontFamily: 'var(--font-family)',
              fontSize: '28px',
              fontWeight: '700',
              color: textStyles.title,
              margin: '0 0 12px 0',
              lineHeight: '1.2',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              maxWidth: '100%',
              textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
            }}>
              {caseStudy.title}
            </h1>

            <p style={{
              fontFamily: 'var(--font-family)',
              fontSize: '16px',
              color: textStyles.body,
              margin: '0 0 16px 0',
              lineHeight: '1.5',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              maxWidth: '100%',
              textShadow: textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
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
                    background: textStyles.title.includes('255') ? 'rgba(100, 150, 255, 0.2)' : 'rgba(33, 96, 167, 0.2)',
                    color: textStyles.title.includes('255') ? 'rgba(100, 150, 255, 0.9)' : 'var(--text-title)',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-family)',
                    fontWeight: '500',
                    border: textStyles.title.includes('255') ? '0.5px solid rgba(100, 150, 255, 0.3)' : 'none',
                    textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
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
              color: textStyles.title,
              margin: '0 0 16px 0',
              lineHeight: '1.3',
              textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
            }}>
              Background
            </h2>
            <p style={{
              fontFamily: 'var(--font-family)',
              fontSize: '14px',
              color: textStyles.body,
              margin: '0',
              lineHeight: '1.6',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              maxWidth: '100%',
              textShadow: textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
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
              color: textStyles.title,
              margin: '0 0 16px 0',
              lineHeight: '1.3',
              textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
            }}>
              Content
            </h2>
            <div style={{
              fontFamily: 'var(--font-family)',
              fontSize: '14px',
              color: textStyles.body,
              lineHeight: '1.6',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              maxWidth: '100%',
              textShadow: textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
            }}>
              {parseContent(caseStudy.content).map((item) => {
                if (item.type === 'image') {
                  return (
                    <div
                      key={item.key}
                      style={{
                        margin: '20px 0',
                        borderRadius: '0px',
                        overflow: 'hidden',
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '1.778'
                      }}
                    >
                      <Image
                        src={item.content}
                        alt="Case study image"
                        fill
                        quality={100}
                        priority={false}
                        style={{
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  );
                } else if (item.type === 'pdf') {
                  return (
                    <div
                      key={item.key}
                      style={{
                        margin: '20px 0',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        position: 'relative',
                        width: '100%',
                        height: '600px',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <iframe
                        src={item.content}
                        title="PDF Document"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          border: 'none'
                        }}
                      />
                    </div>
                  );
                } else if (item.type === 'iframe') {
                  // Extract iframe attributes and create a responsive iframe
                  const tempDiv = document.createElement('div');
                  tempDiv.innerHTML = item.content;
                  const iframe = tempDiv.querySelector('iframe');
                  
                  if (iframe) {
                    // Extract src and other important attributes
                    const src = iframe.getAttribute('src') || '';
                    const title = iframe.getAttribute('title') || 'Embedded content';
                    
                    return (
                      <div
                        key={item.key}
                        style={{
                          margin: '20px 0',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '1.778'
                        }}
                      >
                        <iframe
                          src={src}
                          title={title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: 'none'
                          }}
                        />
                      </div>
                    );
                  } else {
                    // Fallback: render as HTML if no iframe found
                    return (
                      <div
                        key={item.key}
                        style={{
                          margin: '20px 0',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '1.778'
                        }}
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    );
                  }
                  return null;
                } else {
                  return (
                    <div
                      key={item.key}
                      style={{
                        whiteSpace: 'pre-line',
                        marginBottom: item.content.trim().endsWith('\n\n') ? '0' : '16px'
                      }}
                    >
                      {item.content}
                    </div>
                  );
                }
              })}
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
