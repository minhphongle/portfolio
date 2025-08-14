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
  const [caseStudyPriority, setCaseStudyPriority] = useState(false); // Track if case study should have top priority
  const [chatMessage, setChatMessage] = useState('');
  const [showChatBot, setShowChatBot] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDragHint, setShowDragHint] = useState(false);
  const { getTextStyles } = useTheme();
  const textStyles = getTextStyles();

  // Helper function to set active window and reset case study priority if needed
  const setActiveWindowAndResetPriority = (window: 'intro' | 'spotify' | 'projects' | 'casestudy' | 'experience') => {
    setActiveWindow(window);
    if (window !== 'casestudy') {
      setCaseStudyPriority(false);
    }
  };

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

  // Show drag hint when first window opens on desktop
  useEffect(() => {
    if (!isMobile && (showAbout || showSpotify || showProjects || showExperience)) {
      const hasSeenHint = localStorage.getItem('hasSeenDragHint');
      if (!hasSeenHint) {
        setShowDragHint(true);
        localStorage.setItem('hasSeenDragHint', 'true');
        
        // Hide hint after 8 seconds
        setTimeout(() => {
          setShowDragHint(false);
        }, 8000);
      }
    }
  }, [isMobile, showAbout, showSpotify, showProjects, showExperience]);

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
      image: '/images/UN.svg',
      tags: ['Product Analysis', 'Design', 'Policy Research'],
      background: 'This project was created during a regional policy innovation initiative focused on the future of gig work. Our team aimed to address regulatory challenges in the ride-hailing sector by designing a tool that enables policymakers to visualize the impact of different labor policies across ASEAN countries, with a special focus on Singapore and Vietnam.',
      content: 'We built a Policy Simulation App powered by SAP technologies to model the effects of introducing CPF contributions, accident insurance, and tax schemes for platform workers. The tool integrated real-world data and supported scenario testing, helping stakeholders assess trade-offs across economic, social, and regulatory dimensions. The framework was designed to align with UN Sustainable Development Goals and regional development goals. You can view the slides and materials below. \n\n[PDF:/images/UN.pdf]'
    }
  ];

  const handleProjectClick = (project: Project) => {
    setSelectedCaseStudy(project);
    setActiveWindow('casestudy');
    setCaseStudyPriority(true); // Set high priority when opened from project
    
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
    setCaseStudyPriority(false); // Reset priority when closed
    
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
    <div       style={{ 
        backgroundImage: 'url(/images/bg.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed', // Use scroll on mobile for better performance
        color: 'var(--text-body)', 
        minHeight: '100vh', 
        width: '100vw',
              overflow: isMobile ? 'hidden' : 'auto', // Prevent scrolling on mobile
      position: 'relative',
      paddingBottom: isMobile ? '0px' : '200px', // No bottom padding on mobile
        top: 0,
        left: 0
      }}>
      {/* Hero Section */}
      <section 
        className="hero-section"
        style={{ 
          background: 'transparent',
          paddingLeft: isMobile ? '20px' : '200px', 
          paddingRight: isMobile ? '20px' : '200px', 
          height: isMobile ? '100vh' : 'auto',
          minHeight: isMobile ? 'unset' : '100vh',
          overflow: isMobile ? 'hidden' : 'visible'
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
                  <div className="flex flex-col items-center" style={{ gap: '20px', width: '100%', maxWidth: '100%', margin: '0', padding: '0' }}>
                    {/* Image first on mobile - centered */}
                    <div className="flex-shrink-0" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <Image
                        src="/images/my-photo.png"
                        alt="Minh Phong"
                        width={180}
                        height={280}
                        className="object-cover"
                        style={{ borderRadius: '16px' }}
                        priority
                      />
                    </div>
                    
                    {/* Content below image */}
                    <div className="flex flex-col" style={{ gap: '16px', textAlign: 'center', width: '100%', alignItems: 'center' }}>
                      {/* Title Section */}
                      <div className="flex flex-col" style={{ gap: '4px', textAlign: 'center', width: '100%' }}>
                        <div 
                          style={{ 
                            color: textStyles.title,
                            fontFamily: 'var(--font-family)',
                            fontSize: 'clamp(18px, 4.5vw, 22px)',
                            lineHeight: '1.2',
                            fontWeight: '600',
                            letterSpacing: '-0.02em',
                            textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none',
                            textAlign: 'center'
                          }}
                        >
                          hi, i am <span 
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
                            fontSize: 'clamp(18px, 4.5vw, 22px)',
                            lineHeight: '1.2',
                            fontWeight: '600',
                            letterSpacing: '-0.02em',
                            textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none',
                            textAlign: 'center'
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
                          fontSize: 'clamp(12px, 3.2vw, 14px)',
                          lineHeight: '1.4',
                          fontWeight: '600',
                          letterSpacing: '-0.01em',
                          textShadow: textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none',
                          textAlign: 'center',
                          width: '100%'
                        }}
                      >
                        Seeking full-time new grad opportunities in Product, Data, Strategy & Ops
                      </div>
                      
                      {/* Description */}
                      <div style={{ 
                        color: textStyles.body, 
                        fontSize: 'clamp(11px, 2.8vw, 13px)', 
                        lineHeight: '1.5', 
                        fontWeight: '400', 
                        letterSpacing: '-0.01em',
                        textShadow: textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none',
                        textAlign: 'center',
                        width: '100%',
                        maxWidth: '100%',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        hyphens: 'auto'
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
                  hasTopPriority={caseStudyPriority}
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
                  initialPosition={{ x: 100, y: 180 }}
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
                  hi, i am <span 
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
                onClick={() => setActiveWindowAndResetPriority('spotify')}
              />
            )}

            {/* Experience Window */}
            {showExperience && (
              <ExperienceWindow 
                onClose={() => setShowExperience(false)}
                isActive={activeWindow === 'experience'}
                onClick={() => setActiveWindowAndResetPriority('experience')}
              />
            )}
            
            {/* Projects Window */}
            {showProjects && (
              <ProjectsWindow 
                onClose={() => setShowProjects(false)}
                isActive={activeWindow === 'projects'}
                onClick={() => setActiveWindowAndResetPriority('projects')}
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
                hasTopPriority={caseStudyPriority}
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
        placeholder="Ask anything about Phong..."
        onChatBotToggle={handleChatBotToggle}
      />

      {/* ChatBot */}
      <ChatBot 
        isVisible={showChatBot}
        onClose={() => setShowChatBot(false)}
        initialMessage={chatMessage}
      />

      {/* Drag Hint Notification */}
      {showDragHint && !isMobile && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '0.5px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
            padding: '12px 20px',
            color: 'white',
            fontSize: '14px',
            fontFamily: 'var(--font-family)',
            fontWeight: '500',
            zIndex: 1002,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            animation: 'dragHintFadeIn 0.5s ease-out',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            whiteSpace: 'nowrap'
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '2px',
              opacity: 0.8
            }}
          >
            <div style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: 'white',
              animation: 'pulse 1.5s ease-in-out infinite'
            }} />
            <div style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: 'white',
              animation: 'pulse 1.5s ease-in-out infinite 0.2s'
            }} />
            <div style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: 'white',
              animation: 'pulse 1.5s ease-in-out infinite 0.4s'
            }} />
          </div>
          <span>You can drag windows around to rearrange them!</span>
          <button
            onClick={() => setShowDragHint(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px',
              padding: '4px 8px'
            }}
          >
            Got it
          </button>
        </div>
      )}

    </div>
  );
}
