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
      background: 'Our team joined a hackathon organized by Product Women, Coffee Meets Bagel, and *SCAPE in celebration of International Women’s Day. The theme centered on trust and safety in dating apps, and we were challenged to design solutions that empower women by fostering safer, more respectful online dating experiences.',
      content: 'As the sole Product Analyst in a cross-functional team with a Product Manager and Product Designer, I led the data-driven discovery phase. I scraped and analyzed user-generated content from popular Singaporean forums like Reddit and HardwareZone. Through sentiment analysis and keyword clustering, we uncovered that:87.2% of complaints were about ghosting, 35.9% mentioned inappropriate messages, 23.1% experienced both issues simultaneously. \n\n These insights shaped our problem framing and solution design which can be observed below.\n\n[PDF:/images/VibeCheck - CMB Hack.pdf].'
    },
    {
      id: '4',
      title: 'PetPal - Pet Service Appointment',
      description: 'PetPal is designed to connect pet owners with essential services including pet sitting, walking, vet care, grooming, and training. The app simplifies finding and booking trusted caregivers.',
      image: '/images/case4.png',
      tags: ['User Research', 'Mental Model Mapping', 'Prototyping'],
      background: 'PetPal was created as part of an Interaction Design course project, where we were challenged to design a user-centric digital solution for a real-world need. As a passionate pet lover, I wanted to address the everyday struggles pet owners face when trying to find reliable care and services for their furry friends.',
      content: 'PetPal is a mobile app that connects pet owners with trusted providers for pet sitting, walking, grooming, training, and veterinary care. The app streamlines the process of discovering, booking, and reviewing pet service providers; ensuring peace of mind for owners and better care for pets.\n[IMAGE:/images/1.svg] \n[IMAGE:/images/2.svg] \n[IMAGE:/images/3.svg] \n[IMAGE:/images/4.svg] \n[IMAGE:/images/5.svg] \n[IMAGE:/images/6.svg] \n[IMAGE:/images/7.svg] \n[IMAGE:/images/8.svg] \n[IMAGE:/images/9.svg] \n[IMAGE:/images/10.svg] \n[IMAGE:/images/11.svg] \n[IMAGE:/images/12.svg] \n[IMAGE:/images/13.svg] \n[IMAGE:/images/14.svg] \n[IMAGE:/images/15.svg] \n[IMAGE:/images/16.svg] \n[IMAGE:/images/17.svg] \n[IMAGE:/images/18.svg] \n[IMAGE:/images/19.svg] \n[IMAGE:/images/20.svg] \n[IMAGE:/images/21.svg] \n[IMAGE:/images/22.svg] \n[IMAGE:/images/23.svg] \n[IMAGE:/images/24.svg] \n[IMAGE:/images/25.svg] \n[IMAGE:/images/26.svg] \n[IMAGE:/images/27.svg] \n[IMAGE:/images/28.svg] \n[IMAGE:/images/29.svg] \n[IMAGE:/images/30.svg] \n[IMAGE:/images/31.svg] \n[IMAGE:/images/32.svg] \n[IMAGE:/images/33.svg] \n[IMAGE:/images/34.svg] \n[IMAGE:/images/35.svg] \n[IMAGE:/images/36.svg] \n[IMAGE:/images/37.svg] \n[IMAGE:/images/38.svg] \n[IMAGE:/images/39.svg] \n[IMAGE:/images/40.svg] \n[IMAGE:/images/41.svg] \n[IMAGE:/images/42.svg] \n[IMAGE:/images/43.svg] \n[IMAGE:/images/44.svg] \n[IMAGE:/images/45.svg]'
    },
    {
      id: '5',
      title: 'Shopback NearYou',
      description: 'Redesigning Shopback experience to gain foot traffic from local merchants.',
      image: '/images/shopback.svg',
      tags: ['Research', 'Revamp', 'Product Strategy'],
      background: 'This project was developed as part of the ShopBack x NTU Product Hackathon, where participants were challenged to improve the offline-to-online experience for ShopBack users and drive more foot traffic to local merchants. As part of a 5-member team, I explored how ShopBack’s vast ecosystem could better support neighborhood stores and enhance discovery and redemption of in-store vouchers.',
      content: 'We conducted user interviews and competitor analysis, revealing that users found it difficult to discover nearby deals and merchants lacked visibility. Our solution was ShopBack NearYou, a redesigned homepage and location-based discovery feature that surfaces nearby stores and auto-redeemable vouchers. This promotes spontaneous visits and better merchant exposure. You can view the full pitch deck below. \n\n[PDF:/images/ShopBack Product Hackathon Pitch Deck.pdf]'
    },
    {
      id: '6',
      title: 'Policy Simulation App for Ride-hailing Industry',
      description: 'Built an SAP-powered tool to simulate gig labor policies across ASEAN; analyzed CPF, insurance, and tax impacts; aligned with UN SDGs and regional stakeholder needs.',
      image: '/images/un.svg',
      tags: ['Product Analysis', 'Design', 'Policy Research'],
      background: 'This project was created during a regional policy innovation initiative focused on the future of gig work. Our team aimed to address regulatory challenges in the ride-hailing sector by designing a tool that enables policymakers to visualize the impact of different labor policies across ASEAN countries, with a special focus on Singapore and Vietnam.',
      content: 'We built a Policy Simulation App powered by SAP technologies to model the effects of introducing CPF contributions, accident insurance, and tax schemes for platform workers. The tool integrated real-world data and supported scenario testing, helping stakeholders assess trade-offs across economic, social, and regulatory dimensions. The framework was designed to align with UN Sustainable Development Goals and regional development goals. You can view the slides and materials below. \n\n[PDF:/images/UN.pdf]'
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
