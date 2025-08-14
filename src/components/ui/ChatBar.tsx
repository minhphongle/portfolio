'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ChatBarProps {
  onSendMessage?: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onChatBotToggle?: () => void;
}

const ChatBar = ({ 
  onSendMessage, 
  placeholder = "Ask anything about Phong...", 
  disabled = false,
  onChatBotToggle
}: ChatBarProps) => {
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const { getWindowStyles, getTextStyles } = useTheme();
  const windowStyles = getWindowStyles();
  const textStyles = getTextStyles();

  // Dynamic placeholder color based on theme
  const placeholderColor = textStyles.body.includes('255') ? 'rgba(255, 255, 255, 0.7)' : 'rgba(52, 52, 59, 0.5)';

  // Use stable class name to avoid hydration mismatch
  const textareaClass = 'chat-textarea-dynamic';

  // Check if we're on mobile and inject CSS
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      console.log('ChatBar - Mobile detected:', mobile, 'Width:', window.innerWidth);
      
      // Inject CSS for mobile chat bar
      if (mobile) {
        const styleId = 'mobile-chat-bar-fix';
        let styleElement = document.getElementById(styleId) as HTMLStyleElement;
        
        if (!styleElement) {
          styleElement = document.createElement('style');
          styleElement.id = styleId;
          document.head.appendChild(styleElement);
        }
        
        styleElement.innerHTML = `
          #chat-bar-mobile {
            position: fixed !important;
            bottom: 0px !important;
            left: 0px !important;
            right: 0px !important;
            transform: none !important;
            width: 100vw !important;
            max-width: none !important;
            z-index: 1000 !important;
            padding: 10px !important;
            padding-bottom: calc(10px + env(safe-area-inset-bottom)) !important;
            margin: 0 !important;
            box-sizing: border-box !important;
          }
        `;
      }
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Update CSS custom property and inject specific styles for placeholder color
  useEffect(() => {
    document.documentElement.style.setProperty('--chat-placeholder', placeholderColor);
    
    // Also inject specific styles for this textarea
    const styleId = 'dynamic-placeholder-styles';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    styleElement.innerHTML = `
      .${textareaClass}::placeholder {
        color: ${placeholderColor} !important;
        opacity: 0.8;
      }
    `;
  }, [placeholderColor, textStyles.body]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSendMessage) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

    return (
        <div
      id="chat-bar-mobile"
      className="chat-bar-container"
      style={{
        position: 'fixed',
        bottom: isMobile ? '0px' : '20px',
        left: isMobile ? '0px' : '50%', // Full left positioning on mobile
        transform: isMobile ? 'none' : 'translateX(-50%)', // No transform on mobile
        zIndex: 1000,
        width: isMobile ? '100vw' : '90%', // Use viewport width on mobile
        maxWidth: isMobile ? 'none' : '800px',
        padding: isMobile ? '10px' : '0',
        paddingBottom: isMobile ? `calc(10px + env(safe-area-inset-bottom))` : '0',
        margin: '0', // Ensure no margin
        boxSizing: 'border-box' // Include padding in width calculation
      }}
    >
      <form onSubmit={handleSubmit}>
        <div 
          style={{
            background: windowStyles.background,
            backdropFilter: windowStyles.backdropFilter,
            border: windowStyles.border,
            borderRadius: '24px',
            padding: '12px 16px',
            boxShadow: windowStyles.boxShadow,
            display: 'flex',
            alignItems: 'flex-end',
            gap: '12px'
          }}
        >
          {/* Text Input Area */}
          <div style={{ flex: 1, position: 'relative' }}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className={`chat-textarea ${textareaClass}`}
              style={{
                width: '100%',
                minHeight: '24px',
                maxHeight: '120px',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontFamily: 'var(--font-family)',
                fontSize: '16px',
                lineHeight: '1.5',
                color: textStyles.body,
                overflow: 'hidden',
                textShadow: textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 120) + 'px';
              }}
            />
            
          </div>

          {/* ChatBot Toggle Button */}
          {onChatBotToggle && (
            <button
              type="button"
              onClick={onChatBotToggle}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '20px',
                border: 'none',
                background: 'rgba(0, 64, 221, 0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)',
                flexShrink: 0
              }}
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#0040DD"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          )}

          {/* Send Button */}
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '20px',
              border: 'none',
              background: message.trim() && !disabled 
                ? 'var(--text-title)' 
                : 'rgba(33, 96, 167, 0.3)',
              cursor: message.trim() && !disabled ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(10px)',
              flexShrink: 0
            }}
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke={message.trim() && !disabled ? '#FFFFFA' : 'rgba(33, 96, 167, 0.6)'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </button>
        </div>
      </form>

      {/* Typing Indicator (optional) */}
      {disabled && (
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '8px',
            gap: '4px'
          }}
        >
          <div 
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: '14px',
              color: 'var(--text-grey)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>Minh Phong is typing</span>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--text-grey)',
                    animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBar; 