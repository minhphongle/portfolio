'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface BGMPlayerProps {
  src: string;
  autoPlay?: boolean;
}

const BGMPlayer = ({ src, autoPlay = true }: BGMPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // Default to 30% volume
  const [isVisible, setIsVisible] = useState(true);
  const [canAutoplay, setCanAutoplay] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { getWindowStyles, getTextStyles } = useTheme();
  
  const windowStyles = getWindowStyles();
  const textStyles = getTextStyles();

  // Detect user interaction to enable autoplay
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteracted(true);
      const audio = audioRef.current;
      if (audio && autoPlay && !isPlaying) {
        tryAutoplay();
      }
    };

    // Listen for any user interaction
    const events = ['click', 'touchstart', 'keydown', 'mousedown', 'scroll', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
      window.addEventListener(event, handleUserInteraction, { once: true });
    });

    // Also try on window focus and visibility change
    const handleFocus = () => {
      if (autoPlay && !isPlaying) {
        tryAutoplay();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
        window.removeEventListener(event, handleUserInteraction);
      });
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, [autoPlay, isPlaying]);

  // Try to autoplay immediately and handle volume changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      
      // Try immediate autoplay on mount
      if (autoPlay && !hasUserInteracted) {
        tryAutoplay();
      }
    }
  }, [autoPlay, volume, hasUserInteracted]);

  const tryAutoplay = async () => {
    const audio = audioRef.current;
    if (audio) {
      try {
        // Test if autoplay is allowed
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          setCanAutoplay(true);
        }
      } catch {
        // Autoplay blocked, will play on user interaction
        setIsPlaying(false);
        setCanAutoplay(false);
        console.log('Autoplay blocked, waiting for user interaction');
      }
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1002,
          width: '48px',
          height: '48px',
          borderRadius: '24px',
          border: 'none',
          background: windowStyles.background,
          backdropFilter: windowStyles.backdropFilter,
          boxShadow: windowStyles.boxShadow,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={textStyles.windowTitle}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      </button>
    );
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      <div
        className="bgm-player"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1002,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: windowStyles.background,
          backdropFilter: windowStyles.backdropFilter,
          border: windowStyles.border,
          borderRadius: '24px',
          padding: '12px 16px',
          boxShadow: windowStyles.boxShadow,
          transition: 'all 0.3s ease'
        }}
      >
                 {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '16px',
            border: 'none',
            background: !isPlaying && !canAutoplay 
              ? (textStyles.title.includes('255') ? 'rgba(100, 150, 255, 0.3)' : 'rgba(0, 64, 221, 0.2)')
              : (textStyles.title.includes('255') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'),
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            animation: !isPlaying && !canAutoplay ? 'pulse 2s ease-in-out infinite' : 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = !isPlaying && !canAutoplay
              ? (textStyles.title.includes('255') ? 'rgba(100, 150, 255, 0.4)' : 'rgba(0, 64, 221, 0.3)')
              : (textStyles.title.includes('255') ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)');
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = !isPlaying && !canAutoplay 
              ? (textStyles.title.includes('255') ? 'rgba(100, 150, 255, 0.3)' : 'rgba(0, 64, 221, 0.2)')
              : (textStyles.title.includes('255') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)');
          }}
        >
          {isPlaying ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={textStyles.windowTitle}
              stroke="none"
            >
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={textStyles.windowTitle}
              stroke="none"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>

        {/* Volume Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={textStyles.windowTitle}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            {volume > 0.5 && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
            {volume > 0.2 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
          </svg>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            style={{
              width: '80px',
              height: '4px',
              borderRadius: '2px',
              background: textStyles.title.includes('255') ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
              outline: 'none',
              cursor: 'pointer',
              appearance: 'none',
              WebkitAppearance: 'none'
            }}
            className="volume-slider"
          />
        </div>

        {/* Aesthetic Bar with Copyright */}
        <div style={{
          height: '20px',
          width: '1px',
          background: textStyles.title.includes('255') ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
          margin: '0 4px'
        }} />
        
        <div style={{
          fontSize: '10px',
          fontFamily: 'var(--font-family)',
          color: textStyles.windowTitle,
          opacity: 0.7,
          whiteSpace: 'nowrap',
          letterSpacing: '-0.01em'
        }}>
          Thanks for visiting my portfolio © 2025 Le Minh Phong
        </div>

        {/* Minimize Button */}
        <button
          onClick={toggleVisibility}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '12px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: textStyles.windowTitle,
            fontSize: '12px',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = textStyles.title.includes('255') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          −
        </button>
      </div>

      {/* Custom CSS for volume slider and animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }
        
        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${textStyles.title.includes('255') ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.7)'};
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .volume-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${textStyles.title.includes('255') ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.7)'};
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .volume-slider::-webkit-slider-track {
          background: ${textStyles.title.includes('255') ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
          border-radius: 2px;
          height: 4px;
        }
        
        .volume-slider::-moz-range-track {
          background: ${textStyles.title.includes('255') ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
          border-radius: 2px;
          height: 4px;
          border: none;
        }
      `}</style>
    </>
  );
};

export default BGMPlayer; 