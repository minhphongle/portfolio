'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '../../context/ThemeContext';

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
  const { getWindowStyles, getTextStyles } = useTheme();
  
  const windowStyles = getWindowStyles();
  const textStyles = getTextStyles();

  // Projects data
  const projects: Project[] = [
    {
      id: '1',
      title: 'Reimaging TikTok LIVE’s Creator Wallet Experience',
      description: 'An AI-powered solution to reduce payout friction and improve trust. From static FAQs to a system-aware chatbot and smart wallet onboarding. ',
      image: '/images/case1.png',
      tags: ['Product Analysis', 'Protyping', 'Design Thinking'],
              background: 'TikTok LIVE creators face significant friction when managing payouts and understanding wallet features. Many creators struggle with unclear processes, delayed support responses, and complex navigation that impacts their earning experience and platform trust.',
        content: 'I redesigned TikTok LIVE\'s Creator Wallet experience using AI-powered solutions to reduce friction and improve creator trust. The project focused on transforming static help systems into intelligent, context-aware assistance.\n\n[IMAGE:/images/Untitled-86.svg]\n[IMAGE:/images/Untitled-87.svg]\n[IMAGE:/images/Untitled-88.svg]\n[IMAGE:/images/Untitled-89.svg]\n[IMAGE:/images/Untitled-90.svg]\n[IMAGE:/images/Untitled-91.svg]\n[IMAGE:/images/Untitled-92.svg]\n[IMAGE:/images/Untitled-93.svg]\n[IMAGE:/images/Untitled-94.svg]\n[IMAGE:/images/Untitled-95.svg]\n[IMAGE:/images/Untitled-96.svg]\n[IMAGE:/images/Untitled-97.svg]\n[IMAGE:/images/Untitled-98.svg]\n[IMAGE:/images/Untitled-99.svg]'
    },
    {
      id: '2',
      title: 'EcoWardrobe - Sustainable Clothing Choices',
      description: 'Imagine this: you snap a pic of your clothes, and EcoWardrobe, powered by Google Vision AI and Gemini, instantly tells you what it is, the fabric it\'s made of, its estimated CO2 impact, and sustainability score.',
      image: '/images/case2.png',
      tags: ['Market Research', 'Prototyping', 'Frontend Coding'],
      background: 'This project was built during a hackathon, where I led the end-to-end development of EcoWardrobe, an AI-powered tool designed to promote conscious fashion. By combining Google Vision AI and Gemini, the app allows users to snap a photo of their clothing and instantly receive insights like fabric type, estimated CO₂ impact, and a sustainability score. I conducted rapid market research to validate user interest in sustainable fashion, built interactive prototypes, and implemented the frontend interface to create a seamless user experience that bridges technology and sustainability.',
      content: '<iframe width="560" height="315" src="https://www.youtube.com/embed/StvnCUFa-QY?si=fqkntCiwGOAHlgH0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
    },
    {
      id: '3',
      title: 'VibeCheck - AI Dating Coach',
      description: 'VibeCheck is an AI-powered co-pilot that helps users communicate boundaries and disinterest more respectfully; reducing ghosting and improving trust in the app.',
      image: '/images/case3.png',
      tags: ['Data Analysis', 'Product Strategy', 'Social Listening'],
      background: 'During my time at SPH Media, I worked on digital transformation initiatives to enhance reader engagement and optimize content distribution across multiple digital platforms.',
      content: 'I analyzed reader behavior data to understand content preferences and consumption patterns. The project involved developing strategies to increase digital subscription rates and improve content personalization.\n\nKey contributions:\n• Analyzed digital readership data across 5 publication brands\n• Developed content recommendation algorithms\n• Created automated reporting for editorial teams\n• Designed user segmentation for targeted marketing\n• Collaborated with editorial and tech teams\n\nThe digital strategy improvements led to a 25% increase in average session duration and improved content engagement metrics across all digital platforms.'
    },
    {
      id: '4',
      title: 'PetPal - Pet Service Appointment',
      description: 'PetPal is designed to connect pet owners with essential services including pet sitting, walking, vet care, grooming, and training. The app simplifies finding and booking trusted caregivers.',
      image: '/images/case4.png',
      tags: ['User Research', 'Mental Model Mapping', 'Prototyping'],
      background: 'Through the NUS Overseas Colleges program in Paris, I joined an early-stage SaaS startup focused on workflow automation for small businesses. The challenge was to validate product-market fit and drive user acquisition in the competitive European market.',
      content: 'I led product research and user experience initiatives while working in a cross-cultural environment. The role involved everything from user interviews to feature prioritization and go-to-market strategy.\n\nKey accomplishments:\n• Conducted 50+ user interviews across France and Germany\n• Designed product roadmap based on user feedback\n• Implemented user analytics and feedback systems\n• Collaborated with French and German development teams\n• Presented to potential investors and partners\n\nThe product improvements I contributed to resulted in a 40% increase in user retention and successful seed funding of €500K.'
    },
    {
      id: '5',
      title: 'Shopback NearMe',
      description: 'Redesigning Shopback experience to gain foot traffic from local merchants.',
      image: '/images/case1.png',
      tags: ['Research', 'Revamp', 'Product Strategy'],
      background: 'As part of my Information Systems studies at NUS, I conducted research on human-computer interaction patterns in mobile applications, focusing on how design elements influence user behavior and decision-making.',
      content: 'The research involved designing and conducting controlled experiments to measure the impact of UI/UX design choices on user engagement and task completion rates.\n\nResearch methodology:\n• Designed experimental frameworks for A/B testing\n• Recruited and managed 200+ research participants\n• Used eye-tracking and behavioral analytics tools\n• Applied statistical analysis to validate findings\n• Published findings in academic conferences\n\nThe research contributed to understanding of mobile interface design principles and was recognized at the NUS School of Computing Research Showcase.'
    },
    {
      id: '6',
      title: 'Policy Simulation App for Ride-hailing Industry',
      description: 'Built an SAP-powered tool to simulate gig labor policies across ASEAN; analyzed CPF, insurance, and tax impacts; aligned with UN SDGs and regional stakeholder needs.',
      image: '/images/case2.png',
      tags: ['Product Analysis', 'Design', 'Policy Research'],
      background: 'Created this interactive portfolio website to showcase my work and technical skills. The challenge was to design a unique, memorable experience that reflects my personality while maintaining professional credibility.',
      content: 'Designed and developed a Poolsuite.net-inspired glassmorphism portfolio with Apple-like aesthetics. The project involved both design and technical implementation challenges.\n\nTechnical features:\n• React/Next.js with TypeScript\n• Responsive design with mobile-first approach\n• Glassmorphism UI with light/dark themes\n• Draggable window components\n• Spotify integration and background music\n• AI chatbot for interactive resume queries\n\nThe portfolio demonstrates both technical skills and design sensibility, creating an engaging way for potential employers to learn about my background and experience.'
    }
  ];

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
    <div 
      ref={windowRef}
      onClick={onClick}
      className="projects-window"
      style={{
        background: windowStyles.background,
        backdropFilter: windowStyles.backdropFilter,
        border: windowStyles.border,
        borderRadius: '12px',
        boxShadow: windowStyles.boxShadow,
        overflow: 'hidden',
        width: isMinimized ? '320px' : '600px',
        height: isMinimized ? 'auto' : '480px',
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
          Projects
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
      
      {/* Projects Content */}
      {!isMinimized && (
        <div style={{ 
          padding: '24px',
          background: 'transparent',
          height: 'calc(100% - 60px)',
          overflow: 'auto',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            minHeight: 'max-content'
          }}>
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onProjectClick && onProjectClick(project)}
                style={{
                  background: windowStyles.card.background,
                  backdropFilter: 'blur(20px)',
                  borderRadius: '8px',
                  border: windowStyles.card.border,
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.background = windowStyles.card.hoverBackground;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = windowStyles.card.background;
                }}
              >
                {/* Project Image */}
                <div style={{
                  width: '100%',
                  aspectRatio: '1.17',
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
                    color: textStyles.title,
                    margin: '0 0 8px 0',
                    lineHeight: '1.2',
                    textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                  }}>
                    {project.title}
                  </h3>
                  
                  <p style={{
                    fontFamily: 'var(--font-family)',
                    fontSize: '13px',
                    color: textStyles.body,
                    margin: '0 0 12px 0',
                    lineHeight: '1.4',
                    textShadow: textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
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
                          background: textStyles.title.includes('255') ? 'rgba(100, 150, 255, 0.2)' : 'rgba(33, 96, 167, 0.2)',
                          color: textStyles.title.includes('255') ? 'rgba(100, 150, 255, 0.9)' : 'var(--text-title)',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '10px',
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsWindow;
