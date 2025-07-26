'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ExperienceWindowProps {
  onClose?: () => void;
  isActive?: boolean;
  onClick?: () => void;
}

const ExperienceWindow = ({ onClose, isActive = true, onClick }: ExperienceWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 150, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const { getWindowStyles, getTextStyles } = useTheme();
  
  const windowStyles = getWindowStyles();
  const textStyles = getTextStyles();

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

  const experiences = [
    {
      title: 'Systems Analyst',
      company: 'PSA International',
      period: 'May 2025 - Present',
      description: '• Improved logistics apps with 6+ feature enhancements and 15+ bug fixes using Angular, Spring Boot, and Oracle DB; cut downtime/support tickets by 30%\n• Led end-to-end UAT with enterprise clients, achieving 95% first-pass approval and ensuring seamless feature rollout\n• Accelerated release cycles by 40% through optimized CI/CD pipelines with Concourse and proactive monitoring via Tanzu Apps Manager',
      skills: ['Angular', 'Spring Boot', 'Oracle DB', 'CI/CD', 'Concourse', 'Tanzu Apps Manager', 'UAT']
    },
    {
      title: 'Business Intelligence Engineer',
      company: 'United Visual Researchers (Paris)',
      period: 'Aug 2024 - Jan 2025',
      description: '• Revamped data strategy and developed a full-stack reporting system to aggregate and analyze unstructured data, achieving an estimated €2,000 monthly cost savings\n• Liaised with CEO and CMO to gather requirements and create ad-hoc reports for reclaiming tax credit from the government, resulting in the reclaiming of over €10,000 in tax credits\n• Designed and implemented RPA solutions with Docker/n8n and analytics dashboards for C-suite, cutting reporting time by 30%',
      skills: ['Full-Stack Development', 'Data Strategy', 'RPA', 'Docker', 'n8n', 'Analytics Dashboards', 'Unstructured Data']
    },
    {
      title: 'Data Product Analyst',
      company: 'SPH Media',
      period: 'May 2024 - Aug 2024',
      description: '• Led the end-to-end migration of 1 Tableau Server to Tableau Cloud, achieving a $12,000 USD monthly cost saving and improving platform scalability\n• Enhanced user experience by migrating over 100 dashboards to the cloud, empowering 300 users with self-service analytics tools\n• Implemented governance protocols and managed access controls, ensuring compliance across 2 Tableau Servers and 2 Tableau Cloud sites',
      skills: ['Tableau', 'Cloud Migration', 'Data Governance', 'Self-Service Analytics', 'Access Controls', 'Platform Scalability']
    },
    {
      title: 'Product Operations',
      company: 'Shopee',
      period: 'May 2023 - Aug 2023',
      description: '• Drove product roadmaps for 4 analytics projects, enhancing search optimization and achieving a 5% increase in conversion rates\n• Conducted detailed analysis using precision and recall metrics to identify patterns, contributing insights that improved search relevancy by 15% across 8 markets\n• Wrote automation scripts to automate different tasks for Product Operations Team, leading to a 30% increase in efficiency',
      skills: ['Product Roadmaps', 'Search Optimization', 'Precision & Recall Metrics', 'Automation Scripts', 'Conversion Rate Optimization', 'Multi-market Analysis']
    }
  ];

  return (
    <div 
      ref={windowRef}
      onClick={onClick}
      className="experience-window"
      style={{
        background: windowStyles.background,
        backdropFilter: windowStyles.backdropFilter,
        border: windowStyles.border,
        borderRadius: '12px',
        boxShadow: windowStyles.boxShadow,
        overflow: 'hidden',
        width: isMinimized ? '320px' : '500px',
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
          Experience
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
      
      {/* Content */}
      {!isMinimized && (
        <div style={{ 
          padding: '24px',
          background: 'transparent',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px',
          height: 'calc(100% - 48px)',
          overflow: 'auto'
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '24px' 
          }}>
            {experiences.map((exp, index) => (
              <div 
                key={index}
                style={{
                  background: windowStyles.card.background,
                  backdropFilter: 'blur(10px)',
                  border: windowStyles.card.border,
                  borderRadius: '12px',
                  padding: '20px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  marginBottom: '8px'
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-family)',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: textStyles.title,
                    margin: '0 0 4px 0',
                    letterSpacing: '-0.01em',
                    textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                  }}>
                    {exp.title}
                  </h3>
                  <div style={{
                    fontFamily: 'var(--font-family)',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: textStyles.title.includes('255') ? 'rgba(100, 150, 255, 0.9)' : '#0040DD',
                    margin: '0 0 4px 0',
                    textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                  }}>
                    {exp.company}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-family)',
                    fontSize: '12px',
                    color: textStyles.body,
                    margin: 0
                  }}>
                    {exp.period}
                  </div>
                </div>
                
                <p style={{
                  fontFamily: 'var(--font-family)',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  color: textStyles.body,
                  margin: '0 0 12px 0',
                  whiteSpace: 'pre-line',
                  textShadow: textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                }}>
                  {exp.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  {exp.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      style={{
                        background: textStyles.title.includes('255') ? 'rgba(100, 150, 255, 0.2)' : 'rgba(0, 64, 221, 0.1)',
                        color: textStyles.title.includes('255') ? 'rgba(100, 150, 255, 0.9)' : '#0040DD',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontFamily: 'var(--font-family)',
                        fontWeight: '500',
                        border: textStyles.title.includes('255') ? '0.5px solid rgba(100, 150, 255, 0.3)' : '0.5px solid rgba(0, 64, 221, 0.2)',
                        textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceWindow; 