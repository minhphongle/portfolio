'use client';

import { useState } from 'react';
import Image from 'next/image';
import Window from '@/components/ui/Window';
import SpotifyWindow from '@/components/ui/SpotifyWindow';
import ProjectsWindow from '@/components/ui/ProjectsWindow';
import CaseStudyWindow from '@/components/ui/CaseStudyWindow';

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
  const [showSpotify, setShowSpotify] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [activeWindow, setActiveWindow] = useState<'intro' | 'spotify' | 'projects' | 'casestudy'>('intro');

  // Projects data (same as in ProjectsWindow)
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

  const handleProjectClick = (project: Project) => {
    setSelectedCaseStudy(project);
    setActiveWindow('casestudy');
  };

  const handleCloseCaseStudy = () => {
    setSelectedCaseStudy(null);
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
      backgroundImage: 'url(/images/bg.jpg)',
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
      <section style={{ 
        background: 'rgba(255, 255, 250, 0.1)',
        paddingLeft: '200px', 
        paddingRight: '200px', 
        height: '100vh' 
      }}>
                <div className="flex justify-center items-center" style={{ height: '100%' }}>
          <Window 
            title="about-minh-phong.exe"
            isActive={activeWindow === 'intro'}
            onClick={() => setActiveWindow('intro')}
          >
            {/* Horizontal autolayout with 60px gap - centered */}
            <div className="flex items-center" style={{ gap: '60px' }}>
              {/* Left Content - 320px width with 24px gaps */}
              <div className="flex flex-col" style={{ width: '320px', maxWidth: '320px', gap: '24px' }}>
                {/* Title Section - Equal gaps between all lines */}
                <div className="flex flex-col" style={{ gap: '8px' }}>
                  <div 
                    style={{ 
                      color: 'var(--text-title)',
                      fontFamily: 'var(--font-family)',
                      fontSize: '32px',
                      lineHeight: '40px',
                      fontWeight: 'normal'
                    }}
                  >
                    hi, i'm <span 
                      style={{ 
                        fontFamily: 'var(--second-family)',
                        fontSize: '32px',
                        lineHeight: '40px',
                        fontStyle: 'italic'
                      }}
                    >
                      Minh Phong
                    </span>
                  </div>
                  <div 
                    style={{ 
                      color: 'var(--text-title)',
                      fontFamily: 'var(--font-family)',
                      fontSize: '32px',
                      lineHeight: '40px',
                      fontWeight: 'normal'
                    }}
                  >
                    a Product Analyst
                  </div>
                  <div 
                    style={{ 
                      color: 'var(--text-title)',
                      fontFamily: 'var(--font-family)',
                      fontSize: '32px',
                      lineHeight: '40px',
                      fontWeight: 'normal'
                    }}
                  >
                    based in Singapore
                  </div>
                </div>
                
                {/* Job Seeking Text - Montserrat Bold */}
                <div 
                  style={{ 
                    color: 'var(--text-body)',
                    fontFamily: 'var(--font-family)',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    fontWeight: 'bold'
                  }}
                >
                  Seeking full-time new grad opportunities in Product, Data, Strategy & Ops
                </div>
                
                {/* Description Paragraph 1 - no margin */}
                <div className="font-normal" style={{ color: 'var(--text-body)', fontSize: '13px', lineHeight: '1.4' }}>
                  In my final semester as an ASEAN Scholar studying Information Systems @ NUS, 
                  driven by a passion for HCI and building meaningful products. I chose this path to 
                  learn about both tech and users.
                </div>
                
                {/* Description Paragraph 2 - no margin */}
                <div className="font-normal" style={{ color: 'var(--text-body)', fontSize: '13px', lineHeight: '1.4' }}>
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
          
          {/* Spotify Window */}
          {showSpotify && (
            <SpotifyWindow 
              playlistId="6w9nkHE6jGkM9Zx7t0kcRr"
              onClose={() => setShowSpotify(false)}
              isActive={activeWindow === 'spotify'}
              onClick={() => setActiveWindow('spotify')}
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
      </section>


    </div>
  );
}
