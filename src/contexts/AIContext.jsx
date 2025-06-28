import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useSubscription } from './SubscriptionContext';

const AIContext = createContext();

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

export const AIProvider = ({ children }) => {
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const [aiUsage, setAiUsage] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id && subscription) {
      loadAIUsage();
    }
  }, [user, subscription]);

  const loadAIUsage = async () => {
    try {
      // Mock AI usage data for now
      const mockUsage = [
        {
          id: 'usage_1',
          user_id: user.id,
          project_id: null,
          projectTitle: 'Strategic Planning Initiative',
          type: 'statement_generation',
          creditsUsed: 2,
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          statementsGenerated: 8,
          usage_type: 'statement_generation',
          credits_used: 2,
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          metadata: { statementsGenerated: 8 }
        }
      ];

      setAiUsage(mockUsage);
    } catch (error) {
      console.error('Error loading AI usage:', error);
      setAiUsage([]);
    }
  };

  const generateAIStatements = async (focusQuestion, context, count = 10) => {
    setLoading(true);
    try {
      if (subscription?.ai_credits === 0) {
        throw new Error('No AI credits remaining');
      }

      const creditsRequired = Math.ceil(count / 4);
      if (subscription?.ai_credits !== -1 && subscription?.ai_credits < creditsRequired) {
        throw new Error('Insufficient AI credits');
      }

      // Mock AI generation for demo
      const statements = await mockAIGeneration(focusQuestion, context, count);
      
      // Record usage (mock)
      const newUsage = {
        id: `usage_${Date.now()}`,
        user_id: user.id,
        projectTitle: 'Current Project',
        type: 'statement_generation',
        creditsUsed: creditsRequired,
        timestamp: new Date().toISOString(),
        statementsGenerated: statements.length
      };
      
      setAiUsage(prev => [newUsage, ...prev]);

      return statements;
    } catch (error) {
      console.error('AI generation failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    aiCredits: subscription?.ai_credits || 0,
    aiUsage,
    loading,
    generateAIStatements,
    hasAIAccess: subscription?.features?.includes('ai_module') || false
  };

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  );
};

// Mock AI generation function
const mockAIGeneration = async (focusQuestion, context, count) => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const templates = [
    "Implement {technology} to improve {area} capabilities",
    "Develop {strategy} approach for {target} enhancement",
    "Create {framework} system to streamline {process}",
    "Establish {methodology} for better {outcome}",
    "Design {solution} to address {challenge}"
  ];

  const technologies = ["AI-powered", "cloud-based", "mobile-first", "data-driven", "automated"];
  const strategies = ["comprehensive", "agile", "customer-centric", "innovative", "collaborative"];
  const areas = ["operational efficiency", "customer experience", "data analytics", "security", "scalability"];

  const statements = [];
  for (let i = 0; i < count; i++) {
    const template = templates[Math.floor(Math.random() * templates.length)];
    let statement = template
      .replace('{technology}', technologies[Math.floor(Math.random() * technologies.length)])
      .replace('{strategy}', strategies[Math.floor(Math.random() * strategies.length)])
      .replace('{area}', areas[Math.floor(Math.random() * areas.length)])
      .replace('{target}', 'stakeholder engagement')
      .replace('{framework}', 'governance framework')
      .replace('{process}', 'business processes')
      .replace('{methodology}', 'agile methodology')
      .replace('{outcome}', 'business outcomes')
      .replace('{solution}', 'innovative solution')
      .replace('{challenge}', 'current challenges');

    statements.push({
      id: `ai_${Date.now()}_${i}`,
      text: statement,
      source: 'ai_generated',
      confidence: 0.75 + Math.random() * 0.25,
      timestamp: new Date().toISOString()
    });
  }

  return statements;
};