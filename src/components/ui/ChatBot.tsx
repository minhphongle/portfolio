'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  isVisible: boolean;
  onClose: () => void;
  initialMessage?: string;
}

const ChatBot = ({ isVisible, onClose, initialMessage }: ChatBotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hi! I\'m Minh Phong\'s assistant. Ask me anything about him! Try /help for available commands.',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { getWindowStyles, getTextStyles } = useTheme();
  
  const windowStyles = getWindowStyles();
  const textStyles = getTextStyles();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle initial message from chat bar
  useEffect(() => {
    if (initialMessage && isVisible) {
      handleUserMessage(initialMessage);
    }
  }, [initialMessage, isVisible]);

  // Predefined responses based on resume/profile
  const botResponses: { [key: string]: string } = {
    '/help': `Available commands:
/start - Start conversation
/experience - Work experience
/education - Educational background
/skills - Technical skills
/projects - Recent projects
/contact - Contact information
/location - Current location
/about - About me`,
    
    '/start': 'Hello! I\'m here to help you learn more about Minh Phong. What would you like to know?',
    
    '/experience': `Minh Phong's work experience:
• PSA International - Product Analyst Intern
• Shopee - Data Analytics Intern  
• SPH Media - Business Intelligence Intern
• Startup experience in Paris through NUS Overseas Colleges (NOC)`,
    
    '/education': `Education:
• National University of Singapore (NUS)
• Information Systems Major
• ASEAN Scholar
• Currently in final semester`,
    
    '/skills': `Technical Skills:
• Product Analytics & Data Analysis
• Business Intelligence
• HCI (Human-Computer Interaction)
• Product Strategy & Operations
• Data Visualization`,
    
    '/projects': `Recent Projects:
• Product Analytics Dashboard
• E-commerce Platform Optimization
• Mobile App UX Design
• Data Visualization Platform`,
    
    '/contact': `Contact Information:
• Email: Available upon request
• LinkedIn: Connect through portfolio
• Location: Singapore`,
    
    '/location': 'Minh Phong is currently based in Singapore 🇸🇬',
    
    '/about': `About Minh Phong:
Final year Information Systems student at NUS, passionate about HCI and building meaningful products. ASEAN Scholar with international experience through internships in Singapore and Paris. Seeking full-time opportunities in Product, Data, Strategy & Operations.`
  };

  const handleUserMessage = (userInput: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    setTimeout(() => {
      let botResponse = '';
      const input = userInput.toLowerCase().trim();

      // Check for exact command matches
      if (botResponses[input]) {
        botResponse = botResponses[input];
      }
      // Check for keyword matches
      else if (input.includes('experience') || input.includes('work') || input.includes('job')) {
        botResponse = botResponses['/experience'];
      }
      else if (input.includes('education') || input.includes('study') || input.includes('university') || input.includes('nus')) {
        botResponse = botResponses['/education'];
      }
      else if (input.includes('skill') || input.includes('technical') || input.includes('technology')) {
        botResponse = botResponses['/skills'];
      }
      else if (input.includes('project') || input.includes('portfolio') || input.includes('work')) {
        botResponse = botResponses['/projects'];
      }
      else if (input.includes('contact') || input.includes('email') || input.includes('reach')) {
        botResponse = botResponses['/contact'];
      }
      else if (input.includes('location') || input.includes('where') || input.includes('singapore')) {
        botResponse = botResponses['/location'];
      }
      else if (input.includes('about') || input.includes('who') || input.includes('tell me')) {
        botResponse = botResponses['/about'];
      }
      else {
        botResponse = `I'm not sure about that. Try asking about my experience, education, skills, projects, or use /help for available commands.`;
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 500 + Math.random() * 1000); // Simulate typing delay
  };

  if (!isVisible) return null;

  return (
    <div
      className="chatbot-dialog"
      style={{
        position: 'fixed',
        bottom: '90px',
        right: '200px',
        width: '320px',
        height: '420px',
        background: windowStyles.background,
        backdropFilter: windowStyles.backdropFilter,
        border: windowStyles.border,
        borderRadius: '16px',
        boxShadow: windowStyles.boxShadow,
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div
        style={{
          background: windowStyles.titleBar.background,
          backdropFilter: 'blur(10px)',
          padding: '16px',
          borderBottom: windowStyles.titleBar.borderBottom,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Avatar Placeholder */}
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: textStyles.title.includes('255') ? 'linear-gradient(135deg, rgba(100, 150, 255, 0.8), rgba(120, 170, 255, 0.6))' : 'linear-gradient(135deg, #0040DD, #4A90E2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            MP
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-family)',
                fontSize: '14px',
                fontWeight: '600',
                color: textStyles.windowTitle,
                letterSpacing: '-0.01em'
              }}
            >
              Minh Phong's Assistant
            </div>
            <div
              style={{
                fontSize: '12px',
                color: textStyles.body,
                fontFamily: 'var(--font-family)'
              }}
            >
              Online
            </div>
          </div>
        </div>
        
        <button
          onClick={onClose}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: 'none',
            background: textStyles.title.includes('255') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: textStyles.body
          }}
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-start',
              gap: '8px'
            }}
          >
            {message.type === 'bot' && (
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0040DD, #4A90E2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '600',
                  flexShrink: 0
                }}
              >
                MP
              </div>
            )}
            
                          <div
                style={{
                  maxWidth: '220px',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  background: message.type === 'user' 
                    ? (textStyles.title.includes('255') ? 'rgba(100, 150, 255, 0.25)' : 'rgba(0, 64, 221, 0.25)')
                    : windowStyles.card.background,
                  backdropFilter: 'blur(15px)',
                  border: windowStyles.card.border,
                  fontSize: '14px',
                  lineHeight: '1.4',
                  color: message.type === 'user' 
                    ? 'rgba(255, 255, 255, 0.95)' 
                    : textStyles.body,
                  fontFamily: 'var(--font-family)',
                  whiteSpace: 'pre-wrap',
                  textShadow: message.type === 'user' 
                    ? '0 1px 2px rgba(0, 0, 0, 0.2)' 
                    : (textStyles.body.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : '0 1px 2px rgba(255, 255, 255, 0.3)')
                }}
              >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Commands */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: windowStyles.titleBar.borderBottom,
          background: textStyles.title.includes('255') ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.05)'
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '8px'
          }}
        >
          {['/experience', '/education', '/skills', '/projects'].map((command) => (
            <button
              key={command}
              onClick={() => handleUserMessage(command)}
              style={{
                padding: '4px 8px',
                borderRadius: '12px',
                border: 'none',
                background: textStyles.title.includes('255') ? 'rgba(100, 150, 255, 0.2)' : 'rgba(0, 64, 221, 0.1)',
                color: textStyles.title.includes('255') ? 'rgba(100, 150, 255, 0.9)' : '#0040DD',
                fontSize: '11px',
                fontFamily: 'var(--font-family)',
                cursor: 'pointer',
                fontWeight: '500',
                textShadow: textStyles.title.includes('255') ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
              }}
            >
              {command.replace('/', '')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBot; 