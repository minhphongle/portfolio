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
      content: 'Hi! I\'m Minh Phong\'s assistant. Ask me about his experience, education, or about him! Try /help for available commands.',
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
/experience - Work experience details
/education - Educational background
/about - About Minh Phong`,
    
    '/experience': `Work Experience:

🏢 Systems Analyst - PSA International (May 2025 - Present)
• Improved logistics apps with 6+ feature enhancements and 15+ bug fixes using Angular, Spring Boot, and Oracle DB
• Led end-to-end UAT with enterprise clients, achieving 95% first-pass approval
• Accelerated release cycles by 40% through optimized CI/CD pipelines with Concourse and Tanzu Apps Manager

🚀 Business Intelligence Engineer - United Visual Researchers, Paris (Aug 2024 - Jan 2025)
• Revamped data strategy and developed full-stack reporting system, achieving €2,000 monthly cost savings
• Created ad-hoc reports for tax credit reclaiming, resulting in over €10,000 in recovered tax credits
• Designed RPA solutions with Docker/n8n and analytics dashboards, cutting reporting time by 30%

📊 Data Product Analyst - SPH Media (May 2024 - Aug 2024)
• Led end-to-end migration of Tableau Server to Cloud, achieving $12,000 USD monthly cost saving
• Enhanced user experience by migrating 100+ dashboards, empowering 300 users with self-service analytics
• Implemented governance protocols and managed access controls for compliance

🛒 Product Operations - Shopee (May 2023 - Aug 2023)
• Drove product roadmaps for 4 analytics projects, achieving 5% increase in conversion rates
• Conducted precision/recall analysis improving search relevancy by 15% across 8 markets
• Automated tasks for Product Operations Team, leading to 30% efficiency increase`,
    
    '/education': `Educational Background:

🎓 National University of Singapore (NUS)
• Bachelor of Computing (Information Systems)
• ASEAN Scholar
• Final semester (Graduating 2025)

📚 Key Areas of Study:
• Human-Computer Interaction (HCI)
• Product Analytics & Data Science
• Business Intelligence
• Systems Analysis & Design
• Software Engineering

🌍 International Experience:
• NUS Overseas Colleges (NOC) Program in Paris
• Cross-cultural business experience in European startup ecosystem`,
    
    '/about': `About Minh Phong:

👋 Hi! I'm Minh Phong, a final-year Information Systems student at NUS with a passion for building meaningful products that bridge technology and user needs.

🎯 What drives me:
• Creating data-driven solutions that solve real business problems
• Designing intuitive user experiences through HCI principles
• Building products that make a positive impact

🌟 Background:
• ASEAN Scholar at National University of Singapore
• International experience through internships in Singapore and Paris
• Strong foundation in product analytics, business intelligence, and systems development

🚀 Currently seeking:
Full-time opportunities in Product Management, Data Analytics, Strategy & Operations where I can leverage my technical skills and business acumen to drive meaningful impact.

💡 Fun fact: I love exploring the intersection of technology and human behavior - it's what led me to specialize in HCI and product development!`
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
      else if (input.includes('experience') || input.includes('work') || input.includes('job') || input.includes('career')) {
        botResponse = botResponses['/experience'];
      }
      else if (input.includes('education') || input.includes('study') || input.includes('university') || input.includes('nus') || input.includes('school') || input.includes('degree')) {
        botResponse = botResponses['/education'];
      }
      else if (input.includes('about') || input.includes('who') || input.includes('tell me') || input.includes('background') || input.includes('intro')) {
        botResponse = botResponses['/about'];
      }
      else if (input.includes('help') || input.includes('command') || input.includes('what can')) {
        botResponse = botResponses['/help'];
      }
      else {
        botResponse = `I'm not sure about that. Try asking about my experience, education, or about me. Use /help for available commands.`;
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