'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import Window from '@/components/ui/Window';
import SpotifyWindow from '@/components/ui/SpotifyWindow';
import ChatBar from '@/components/ui/ChatBar';
import ChatBot from '@/components/ui/ChatBot';
import ProjectsWindow from '@/components/ui/ProjectsWindow';
import CaseStudyWindow from '@/components/ui/CaseStudyWindow';
import ExperienceWindow from '@/components/ui/ExperienceWindow';
import Navigation from '@/components/layout/Navigation';
import BGMPlayer from '@/components/ui/BGMPlayer';
import LeftSidebar from '@/components/ui/LeftSidebar';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  background: string;
  content: string;
}

export default function Home() {
  const [showSpotify, setShowSpotify] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [activeWindow, setActiveWindow] = useState<'intro' | 'spotify' | 'projects' | 'casestudy' | 'experience'>('intro');
  const [chatMessage, setChatMessage] = useState('');
  const [showChatBot, setShowChatBot] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { getTextStyles } = useTheme();
  const textStyles = getTextStyles();

  // Check if we're on mobile and set initial state
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Set initial window state based on device type
      if (mobile) {
        // Mobile: Show About by default
        setShowAbout(true);
        setShowSpotify(false);
        setActiveWindow('intro');
      } else {
        // Desktop: Show both About and Spotify by default
        setShowAbout(true);
        setShowSpotify(true);
        setActiveWindow('intro');
      }
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleSendMessage = (message: string) => {
    setChatMessage(message);
    // Open chatbot when user sends a message
    setShowChatBot(true);
    console.log('Message sent:', message);
  };

  const handleChatBotToggle = () => {
    setShowChatBot(!showChatBot);
  };

  const handleWindowToggle = (windowType: string) => {
    if (isMobile) {
      // Mobile: Only allow one window open at a time
      setShowAbout(windowType === 'about');
      setShowSpotify(windowType === 'playlist');
      setShowProjects(windowType === 'projects');
      setShowExperience(windowType === 'experience');
      
      switch (windowType) {
        case 'about':
          setActiveWindow('intro');
          break;
        case 'playlist':
          setActiveWindow('spotify');
          break;
        case 'projects':
          setActiveWindow('projects');
          break;
        case 'experience':
          setActiveWindow('experience');
          break;
        default:
          break;
      }
    } else {
      // Desktop: Toggle windows individually (can have multiple open)
      switch (windowType) {
        case 'about':
          setShowAbout(!showAbout);
          if (!showAbout) setActiveWindow('intro');
          break;
        case 'playlist':
          setShowSpotify(!showSpotify);
          if (!showSpotify) setActiveWindow('spotify');
          break;
        case 'projects':
          setShowProjects(!showProjects);
          if (!showProjects) setActiveWindow('projects');
          break;
        case 'experience':
          setShowExperience(!showExperience);
          if (!showExperience) setActiveWindow('experience');
          break;
        default:
          break;
      }
    }
  };

  // Projects data (same as in ProjectsWindow)
  const projects: Project[] = [
    {
      id: '1',
      title: 'PSA International',
      description: 'Systems Analyst - Logistics Enhancement',
      image: '/images/case1.png',
      tags: ['Angular', 'Spring Boot', 'CI/CD'],
      background: 'As part of my product management interview preparation, I explored TikTok’s LIVE Money Platform to better understand their payout ecosystem; particularly from the lens of user trust and operational friction. While I was not explicitly asked to prepare a case, I proactively mapped out pain points, analyzed user flows, and identified key breakdowns in payout visibility, onboarding, and issue resolution. This exercise not only deepened my understanding of TikTok’s creator monetization pipeline but also helped me craft solutions that could reduce failure rates, improve transparency, and enhance user experience through AI-driven tools.',
      content: 'I redesigned TikTok LIVE\'s Creator Wallet experience using AI-powered solutions to reduce friction and improve creator trust. The project focused on transforming static help systems into intelligent, context-aware assistance.\n\n[IMAGE:/images/Untitled-1.svg]\n\n'
    },
    {
      id: '2',
      title: 'Shopee',
      description: 'Product Operations - Search Optimization',
      image: '/images/case2.png',
      tags: ['Product Operations', 'Search', 'Analytics'],
      background: 'In my Product Operations role at Shopee, I drove analytics projects focused on search optimization across multiple markets. The challenge was to improve search relevancy and conversion rates while managing complex product roadmaps.',
      content: 'I led multiple analytics projects that directly impacted search performance and user experience across Shopee\'s platform.\n\nKey achievements:\n• Drove product roadmaps for 4 analytics projects enhancing search optimization\n• Achieved a 5% increase in conversion rates through search improvements\n• Conducted detailed analysis using precision and recall metrics to identify patterns\n• Improved search relevancy by 15% across 8 Southeast Asian markets\n• Wrote automation scripts for Product Operations Team, increasing efficiency by 30%\n• Collaborated with cross-functional teams to implement data-driven product decisions\n\nThe search optimization initiatives significantly enhanced user experience and contributed to measurable business growth across multiple markets.'
    },
    {
      id: '3',
      title: 'SPH Media',
      description: 'Data Product Analyst - Cloud Migration',
      image: '/images/case3.png',
      tags: ['Tableau', 'Cloud Migration', 'Data Governance'],
      background: 'As a Data Product Analyst at SPH Media, I led a comprehensive migration project from on-premise to cloud analytics infrastructure. The challenge was to modernize the data platform while ensuring business continuity and cost optimization.',
      content: 'I spearheaded the end-to-end migration of SPH Media\'s analytics infrastructure to the cloud, transforming how the organization handles data and reporting.\n\nKey achievements:\n• Led complete migration of 1 Tableau Server to Tableau Cloud infrastructure\n• Achieved $12,000 USD monthly cost savings while improving platform scalability\n• Successfully migrated over 100 dashboards to cloud environment\n• Empowered 300+ users with enhanced self-service analytics capabilities\n• Implemented comprehensive governance protocols and access controls\n• Managed compliance across 2 Tableau Servers and 2 Tableau Cloud sites\n\nThe migration project significantly improved platform performance, reduced operational costs, and enabled better data democratization across the organization.'
    },
    {
      id: '4',
      title: 'United Visual Researchers (Paris)',
      description: 'Business Intelligence Engineer - RPA & Analytics',
      image: '/images/case4.png',
      tags: ['BI', 'RPA', 'Full-Stack'],
      background: 'As a Business Intelligence Engineer at United Visual Researchers in Paris, I revolutionized the company\'s data strategy through full-stack development and automation. The challenge was to transform unstructured data into actionable insights while achieving significant cost savings.',
      content: 'I designed and implemented comprehensive data solutions that transformed how the company handles business intelligence and regulatory reporting.\n\nKey achievements:\n• Revamped entire data strategy with full-stack reporting system for unstructured data\n• Achieved €2,000 monthly cost savings through automated data processing\n• Collaborated directly with CEO and CMO on requirements gathering\n• Created ad-hoc reports for government tax credit reclaiming, recovering €10,000+\n• Designed and implemented RPA solutions using Docker and n8n\n• Built analytics dashboards for C-suite executive decision-making\n• Reduced reporting time by 30% through automation and optimization\n\nThe comprehensive BI transformation enabled data-driven decision making at the executive level while delivering substantial cost savings and operational efficiency improvements.'
    },
    {
      id: '5',
      title: 'University Research',
      description: 'HCI & User Behavior Study',
      image: '/images/case1.png',
      tags: ['Research', 'HCI', 'Academic'],
      background: 'As part of my Information Systems studies at NUS, I conducted research on human-computer interaction patterns in mobile applications, focusing on how design elements influence user behavior and decision-making.',
      content: 'The research involved designing and conducting controlled experiments to measure the impact of UI/UX design choices on user engagement and task completion rates.\n\nResearch methodology:\n• Designed experimental frameworks for A/B testing\n• Recruited and managed 200+ research participants\n• Used eye-tracking and behavioral analytics tools\n• Applied statistical analysis to validate findings\n• Published findings in academic conferences\n\nThe research contributed to understanding of mobile interface design principles and was recognized at the NUS School of Computing Research Showcase.'
    },
    {
      id: '6',
      title: 'Personal Project',
      description: 'Portfolio Website',
      image: '/images/case2.png',
      tags: ['Web Dev', 'Design', 'Personal'],
      background: 'Created this interactive portfolio website to showcase my work and technical skills. The challenge was to design a unique, memorable experience that reflects my personality while maintaining professional credibility.',
      content: 'Designed and developed a Poolsuite.net-inspired glassmorphism portfolio with Apple-like aesthetics. The project involved both design and technical implementation challenges.\n\nTechnical features:\n• React/Next.js with TypeScript\n• Responsive design with mobile-first approach\n• Glassmorphism UI with light/dark themes\n• Draggable window components\n• Spotify integration and background music\n• AI chatbot for interactive resume queries\n\nThe portfolio demonstrates both technical skills and design sensibility, creating an engaging way for potential employers to learn about my background and experience.'
    }
  ];

  const handleProjectClick = (project: Project) => {
    setSelectedCaseStudy(project);
    setActiveWindow('casestudy');
    
    // On mobile, close other windows when opening case study
    if (isMobile) {
      setShowAbout(false);
      setShowSpotify(false);
      setShowProjects(false);
      setShowExperience(false);
    }
  };

  const handleCloseCaseStudy = () => {
    setSelectedCaseStudy(null);
    
    // On mobile, reopen the projects window when closing case study
    if (isMobile) {
      setShowProjects(true);
      setActiveWindow('projects');
    }
  };

  const handlePreviousCaseStudy = () => {
    if (!selectedCaseStudy) return;
    const currentIndex = projects.findIndex(p => p.id === selectedCaseStudy.id);
    if (currentIndex > 0) {
      setSelectedCaseStudy(projects[currentIndex - 1]);
    }
  };

  const handleNextCaseStudy = () => {
    if (!selectedCaseStudy) return;
    const currentIndex = projects.findIndex(p => p.id === selectedCaseStudy.id);
    if (currentIndex < projects.length - 1) {
      setSelectedCaseStudy(projects[currentIndex + 1]);
    }
  };

  const getCurrentCaseStudyIndex = () => {
    if (!selectedCaseStudy) return -1;
    return projects.findIndex(p => p.id === selectedCaseStudy.id);
  };

  const hasPrevious = getCurrentCaseStudyIndex() > 0;
  const hasNext = getCurrentCaseStudyIndex() < projects.length - 1;

  return (
    <div style={{ 
      backgroundImage: 'url(/images/bg.gif)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      color: 'var(--text-body)', 
      height: '100vh', 
      width: '100vw',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      {/* Hero Section */}
      <section 
        className="hero-section"
        style={{ 
          background: 'transparent',
          paddingLeft: '200px', 
          paddingRight: '200px', 
          height: '100vh' 
        }}
      >
        {isMobile ? (
          /* Mobile: Stack windows vertically */
          <div className="mobile-window-stack">
            {showAbout && (
              <div className="mobile-window">
                <Window 
                  title="About Minh Phong"
                  isActive={activeWindow === 'intro'}
                  onClick={() => setActiveWindow('intro')}
                  onClose={() => setShowAbout(false)}
                >
                  {/* Mobile-optimized layout */}
                  <div className="flex flex-col items-center" style={{ gap: '20px' }}>
                    {/* Image first on mobile */}
                    <div className="flex-shrink-0">
                      <Image
                        src="/images/my-photo.png"
                        alt="Minh Phong"
                        width={200}
                        height={312}
                        className="object-cover"
                        style={{ borderRadius: '16px' }}
                        priority
                      />
                    </div>
                    
                    {/* Content below image */}
                    <div className="flex flex-col" style={{ gap: '16px', textAlign: 'center' }}>
                      {/* Title Section */}
                      <div className="flex flex-col" style={{ gap: '4px' }}>
                        <div 
                          style={{ 
                            color: textStyles.title,
                            fontFamily: 'var(--font-family)',
                            fontSize: 'clamp(20px, 5vw, 24px)',
                            lineHeight: '1.2',
                            fontWeight: '600',
                            letterSpacing: '-0.02em',
                            textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                          }}
                        >
                          hi, i'm <span 
                            style={{ 
                              fontFamily: 'var(--font-family)',
                              fontWeight: '700',
                              color: textStyles.title.includes('255') ? 'rgba(100, 150, 255, 0.9)' : '#0040DD',
                              textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                            }}
                          >
                            Minh Phong
                          </span>
                        </div>
                        <div 
                          style={{ 
                            color: textStyles.title,
                            fontFamily: 'var(--font-family)',
                            fontSize: 'clamp(20px, 5vw, 24px)',
                            lineHeight: '1.2',
                            fontWeight: '600',
                            letterSpacing: '-0.02em',
                            textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                          }}
                        >
                          a Product Analyst based in Singapore
                        </div>
                      </div>
                      
                      {/* Job Seeking Text */}
                      <div 
                        style={{ 
                          color: textStyles.body,
                          fontFamily: 'var(--font-family)',
                          fontSize: 'clamp(12px, 3.5vw, 14px)',
                          lineHeight: '1.4',
                          fontWeight: '600',
                          letterSpacing: '-0.01em',
                          textShadow: textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                        }}
                      >
                        Seeking full-time new grad opportunities in Product, Data, Strategy & Ops
                      </div>
                      
                      {/* Description */}
                      <div style={{ 
                        color: textStyles.body, 
                        fontSize: 'clamp(11px, 3vw, 13px)', 
                        lineHeight: '1.4', 
                        fontWeight: '400', 
                        letterSpacing: '-0.01em',
                        textShadow: textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none',
                        textAlign: 'left'
                      }}>
                        In my final semester as an ASEAN Scholar studying Information Systems @ NUS, 
                        driven by a passion for HCI and building meaningful products. I chose this path to 
                        learn about both tech and users.
                        <br/><br/>
                        Previously interned @ PSA International, Shopee, and SPH Media. Also completed a 
                        startup internship in Paris under the NUS Overseas Colleges (NOC) program :)
                      </div>
                    </div>
                  </div>
                </Window>
              </div>
            )}
            
            {/* Spotify Window */}
            {showSpotify && (
              <div className="mobile-window">
                <SpotifyWindow 
                  playlistId="6w9nkHE6jGkM9Zx7t0kcRr"
                  onClose={() => setShowSpotify(false)}
                  isActive={activeWindow === 'spotify'}
                  onClick={() => setActiveWindow('spotify')}
                />
              </div>
            )}

            {/* Experience Window */}
            {showExperience && (
              <div className="mobile-window">
                <ExperienceWindow 
                  onClose={() => setShowExperience(false)}
                  isActive={activeWindow === 'experience'}
                  onClick={() => setActiveWindow('experience')}
                />
              </div>
            )}
            
            {/* Projects Window */}
            {showProjects && (
              <div className="mobile-window">
                <ProjectsWindow 
                  onClose={() => setShowProjects(false)}
                  isActive={activeWindow === 'projects'}
                  onClick={() => setActiveWindow('projects')}
                  onProjectClick={handleProjectClick}
                />
              </div>
            )}
            
            {/* Case Study Window */}
            {selectedCaseStudy && (
              <div className="mobile-window">
                <CaseStudyWindow 
                  caseStudy={selectedCaseStudy}
                  onClose={handleCloseCaseStudy}
                  isActive={activeWindow === 'casestudy'}
                  onClick={() => setActiveWindow('casestudy')}
                  onPrevious={handlePreviousCaseStudy}
                  onNext={handleNextCaseStudy}
                  hasPrevious={hasPrevious}
                  hasNext={hasNext}
                />
              </div>
            )}
          </div>
        ) : (
          /* Desktop: Positioned windows layout */
          <div style={{ height: '100%', position: 'relative' }}>
            {showAbout && (
                <Window 
                  title="About Minh Phong"
                  isActive={activeWindow === 'intro'}
                  onClick={() => setActiveWindow('intro')}
                  onClose={() => setShowAbout(false)}
                  initialPosition={{ x: 0, y: 180 }}
                >
                {/* Horizontal autolayout with 60px gap - centered */}
                <div className="flex items-center" style={{ gap: '60px' }}>
                  {/* Left Content - 320px width with 24px gaps */}
                  <div className="flex flex-col" style={{ width: '320px', maxWidth: '320px', gap: '24px' }}>
              {/* Title Section - Equal gaps between all lines */}
              <div className="flex flex-col" style={{ gap: '8px' }}>
                <div 
                  style={{ 
                          color: textStyles.title,
                          fontFamily: 'var(--font-family)',
                          fontSize: '32px',
                          lineHeight: '40px',
                          fontWeight: '600',
                          letterSpacing: '-0.02em',
                          textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                  }}
                >
                  hi, i'm <span 
                    style={{ 
                            fontFamily: 'var(--font-family)',
                            fontSize: '32px',
                            lineHeight: '40px',
                            fontWeight: '700',
                            letterSpacing: '-0.02em',
                            color: textStyles.title.includes('255') ? 'rgba(100, 150, 255, 0.9)' : '#0040DD',
                            textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                    }}
                  >
                    Minh Phong
                  </span>
                </div>
                <div 
                  style={{ 
                          color: textStyles.title,
                          fontFamily: 'var(--font-family)',
                          fontSize: '32px',
                          lineHeight: '40px',
                          fontWeight: '600',
                          letterSpacing: '-0.02em',
                          textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                        }}
                      >
                        a Product Analyst
                </div>
                <div 
                  style={{ 
                          color: textStyles.title,
                          fontFamily: 'var(--font-family)',
                          fontSize: '32px',
                          lineHeight: '40px',
                          fontWeight: '600',
                          letterSpacing: '-0.02em',
                          textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                  }}
                >
                  based in Singapore
                </div>
              </div>
              
                    {/* Job Seeking Text */}
              <div 
                style={{ 
                        color: textStyles.body,
                        fontFamily: 'var(--font-family)',
                        fontSize: '14px',
                        lineHeight: '1.4',
                        fontWeight: '600',
                        letterSpacing: '-0.01em',
                        textShadow: textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                }}
              >
                Seeking full-time new grad opportunities in Product, Data, Strategy & Ops
              </div>
              
                    {/* Description Paragraph 1 */}
                    <div style={{ 
                      color: textStyles.body, 
                      fontSize: '13px', 
                      lineHeight: '1.4', 
                      fontWeight: '400', 
                      letterSpacing: '-0.01em',
                      textShadow: textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                    }}>
                In my final semester as an ASEAN Scholar studying Information Systems @ NUS, 
                driven by a passion for HCI and building meaningful products. I chose this path to 
                learn about both tech and users.
              </div>
              
                    {/* Description Paragraph 2 */}
                    <div style={{ 
                      color: textStyles.body, 
                      fontSize: '13px', 
                      lineHeight: '1.4', 
                      fontWeight: '400', 
                      letterSpacing: '-0.01em',
                      textShadow: textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                    }}>
                Previously interned @ PSA International, Shopee, and SPH Media. Also completed a 
                startup internship in Paris under the NUS Overseas Colleges (NOC) program :)
              </div>
            </div>

                  {/* Right Image - 250x390 with 16px rounded corners */}
            <div className="flex-shrink-0">
              <Image
                src="/images/my-photo.png"
                alt="Minh Phong"
                      width={250}
                      height={390}
                className="object-cover"
                      style={{ borderRadius: '16px' }}
                priority
              />
                  </div>
                </div>
              </Window>
            )}
            
            {/* Spotify Window */}
            {showSpotify && (
              <SpotifyWindow 
                playlistId="6w9nkHE6jGkM9Zx7t0kcRr"
                onClose={() => setShowSpotify(false)}
                isActive={activeWindow === 'spotify'}
                onClick={() => setActiveWindow('spotify')}
              />
            )}

            {/* Experience Window */}
            {showExperience && (
              <ExperienceWindow 
                onClose={() => setShowExperience(false)}
                isActive={activeWindow === 'experience'}
                onClick={() => setActiveWindow('experience')}
              />
            )}
            
            {/* Projects Window */}
            {showProjects && (
              <ProjectsWindow 
                onClose={() => setShowProjects(false)}
                isActive={activeWindow === 'projects'}
                onClick={() => setActiveWindow('projects')}
                onProjectClick={handleProjectClick}
              />
            )}
            
            {/* Case Study Window */}
            {selectedCaseStudy && (
              <CaseStudyWindow 
                caseStudy={selectedCaseStudy}
                onClose={handleCloseCaseStudy}
                isActive={activeWindow === 'casestudy'}
                onClick={() => setActiveWindow('casestudy')}
                onPrevious={handlePreviousCaseStudy}
                onNext={handleNextCaseStudy}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
              />
            )}
          </div>
        )}
      </section>

      {/* Left Sidebar - Desktop Only */}
      <LeftSidebar />

      {/* Navigation */}
      <Navigation 
        onWindowToggle={handleWindowToggle}
        openWindows={{
          about: showAbout,
          experience: showExperience,
          projects: showProjects,
          playlist: showSpotify
        }}
      />

      {/* Background Music Player */}
      <BGMPlayer src="/bgm.mp3" autoPlay={true} />

      {/* Chat Bar */}
      <ChatBar 
        onSendMessage={handleSendMessage}
        placeholder="Ask anything about Minh Phong..."
        onChatBotToggle={handleChatBotToggle}
      />

      {/* ChatBot */}
      <ChatBot 
        isVisible={showChatBot}
        onClose={() => setShowChatBot(false)}
        initialMessage={chatMessage}
      />

    </div>
  );
}
