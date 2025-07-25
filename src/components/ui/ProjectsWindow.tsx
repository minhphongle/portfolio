'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface ProjectsWindowProps {
  onClose?: () => void;
  isActive?: boolean;
  onClick?: () => void;
  onProjectClick?: (project: Project) => void;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  background: string;
  content: string;
}

const ProjectsWindow = ({ onClose, isActive = true, onClick, onProjectClick }: ProjectsWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 200, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Sample project data
  const projects: Project[] = [
    {
      id: '1',
      title: 'Case Study 1',
      description: 'Product Analytics Dashboard',
      image: '/images/case1.png',
      tags: ['Analytics', 'Dashboard', 'UX'],
      background: 'This project was initiated to address the growing need for comprehensive product analytics in our SaaS platform. The existing reporting system was fragmented and difficult to navigate, leading to poor data-driven decision making across product teams.',
      content: 'The solution involved designing and implementing a unified analytics dashboard that consolidated key metrics from multiple data sources. We focused on creating intuitive visualizations that would enable product managers to quickly identify trends and opportunities.\n\nKey features included:\n• Real-time data visualization\n• Customizable dashboard layouts\n• Advanced filtering and segmentation\n• Automated report generation\n• Mobile-responsive design\n\nThe result was a 40% improvement in decision-making speed and increased user engagement with analytics tools.'
    },
    {
      id: '2',
      title: 'Case Study 2',
      description: 'E-commerce Platform',
      image: '/images/case2.png',
      tags: ['E-commerce', 'Strategy', 'Data'],
      background: 'A mid-sized retail company approached us to redesign their e-commerce platform. Their existing solution had a high bounce rate and low conversion rates, particularly on mobile devices. Customer feedback indicated frustration with the checkout process and product discovery.',
      content: 'We conducted extensive user research and competitive analysis to understand the pain points in the customer journey. The redesign focused on streamlining the user experience and optimizing for mobile-first interactions.\n\nKey improvements included:\n• Simplified navigation structure\n• One-page checkout process\n• Enhanced search and filtering\n• Personalized product recommendations\n• Improved page load speeds\n\nPost-launch metrics showed a 65% increase in conversion rates and a 45% reduction in cart abandonment.'
    },
    {
      id: '3',
      title: 'Case Study 3',
      description: 'Mobile App Design',
      image: '/images/case3.png',
      tags: ['Mobile', 'UI/UX', 'Product'],
      background: 'A fitness startup needed a comprehensive mobile app to complement their wearable device. The app needed to sync with multiple fitness trackers, provide personalized workout plans, and create a social community around fitness goals.',
      content: 'The design process involved extensive user interviews with fitness enthusiasts and collaboration with fitness experts to ensure accuracy and engagement. We prioritized ease of use while maintaining comprehensive functionality.\n\nCore features developed:\n• Multi-device synchronization\n• AI-powered workout recommendations\n• Social features and challenges\n• Progress tracking and analytics\n• Nutrition logging and guidance\n\nThe app launched with over 10,000 downloads in the first month and maintained a 4.8-star rating on app stores.'
    },
    {
      id: '4',
      title: 'Case Study 4',
      description: 'Data Visualization',
      image: '/images/case4.png',
      tags: ['Data Viz', 'Analytics', 'Strategy'],
      background: 'A financial services company required an advanced data visualization platform to help their analysts identify market trends and risks. The existing tools were outdated and couldn\'t handle the volume and complexity of modern financial data.',
      content: 'We developed a sophisticated visualization platform that could process large datasets in real-time and present complex financial information in an intuitive format. The solution needed to meet strict regulatory requirements while remaining user-friendly.\n\nTechnical achievements:\n• Real-time data processing\n• Interactive charting libraries\n• Customizable dashboard components\n• Advanced statistical analysis tools\n• Compliance-ready reporting features\n\nThe platform reduced analysis time by 60% and improved accuracy in risk assessment by 35%.'
    }
  ];

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
    <div 
      ref={windowRef}
      onClick={onClick}
      style={{
        background: 'radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 100%)',
        backdropFilter: 'blur(42px)',
        border: '3.5px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        width: isMinimized ? '320px' : '600px',
        height: isMinimized ? 'auto' : '480px',
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
          projects.exe
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
      
      {/* Projects Content */}
      {!isMinimized && (
        <div style={{ 
          padding: '24px',
          background: 'transparent',
          backdropFilter: 'blur(10px)',
          height: 'calc(100% - 60px)',
          overflow: 'hidden',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            height: '100%'
          }}>
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onProjectClick && onProjectClick(project)}
                style={{
                  background: 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                }}
              >
                {/* Project Image */}
                <div style={{
                  width: '100%',
                  height: '120px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '12px',
                  position: 'relative'
                }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{
                      objectFit: 'cover'
                    }}
                  />
                </div>
                
                {/* Project Info */}
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-family)',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'var(--text-title)',
                    margin: '0 0 8px 0',
                    lineHeight: '1.2'
                  }}>
                    {project.title}
                  </h3>
                  
                  <p style={{
                    fontFamily: 'var(--font-family)',
                    fontSize: '13px',
                    color: 'var(--text-body)',
                    margin: '0 0 12px 0',
                    lineHeight: '1.4'
                  }}>
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div style={{
                    display: 'flex',
                    gap: '6px',
                    flexWrap: 'wrap'
                  }}>
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          background: 'rgba(33, 96, 167, 0.2)',
                          color: 'var(--text-title)',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '10px',
                          fontFamily: 'var(--font-family)',
                          fontWeight: '500'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsWindow;
