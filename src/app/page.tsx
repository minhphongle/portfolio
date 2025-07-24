'use client';

import { useState } from 'react';
import Image from 'next/image';
import Window from '@/components/ui/Window';
import SpotifyWindow from '@/components/ui/SpotifyWindow';

export default function Home() {
  const [showSpotify, setShowSpotify] = useState(true);
  const [activeWindow, setActiveWindow] = useState<'intro' | 'spotify'>('intro');

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, rgba(255, 255, 250, 0.8), rgba(255, 255, 250, 0.6))',
      backdropFilter: 'blur(20px)',
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
        backdropFilter: 'blur(15px)',
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
        </div>
      </section>


    </div>
  );
}
