import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useSubscription } from './SubscriptionContext';
import { supabase } from '../lib/supabase';

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
      const { data, error } = await supabase
        .from('ai_usage')
        .select(`
          *,
          project:projects(title)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      const formattedUsage = data.map(usage => ({
        ...usage,
        projectTitle: usage.project?.title || 'Unknown Project',
        type: usage.usage_type,
        creditsUsed: usage.credits_used,
        timestamp: usage.created_at,
        statementsGenerated: usage.metadata?.statementsGenerated,
        clustersGenerated: usage.metadata?.clustersGenerated,
        statementsEnhanced: usage.metadata?.statementsEnhanced
      }));

      setAiUsage(formattedUsage);
    } catch (error) {
      console.error('Error loading AI usage:', error);
    }
  };

  const recordAIUsage = async (usageType, projectId, creditsUsed, metadata = {}) => {
    try {
      const { data, error } = await supabase
        .from('ai_usage')
        .insert([
          {
            user_id: user.id,
            project_id: projectId,
            usage_type: usageType,
            credits_used: creditsUsed,
            metadata
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Update subscription credits
      if (subscription.ai_credits !== -1) {
        const newCredits = Math.max(0, subscription.ai_credits - creditsUsed);
        await supabase
          .from('subscriptions')
          .update({ ai_credits: newCredits })
          .eq('user_id', user.id);
      }

      // Reload usage and subscription
      loadAIUsage();
    } catch (error) {
      console.error('Error recording AI usage:', error);
    }
  };

  const generateAIStatements = async (focusQuestion, context, count = 10) => {
    setLoading(true);
    try {
      if (subscription.ai_credits === 0) {
        throw new Error('No AI credits remaining');
      }

      const creditsRequired = Math.ceil(count / 4);
      if (subscription.ai_credits !== -1 && subscription.ai_credits < creditsRequired) {
        throw new Error('Insufficient AI credits');
      }

      // Mock AI generation for demo (replace with actual AI service)
      const statements = await mockAIGeneration(focusQuestion, context, count);

      // Record usage
      await recordAIUsage('statement_generation', null, creditsRequired, {
        statementsGenerated: statements.length,
        focusQuestion,
        context
      });

      return statements;
    } catch (error) {
      console.error('AI generation failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const generateAIClusters = async (statements, settings) => {
    setLoading(true);
    try {
      if (subscription.ai_credits === 0) {
        throw new Error('No AI credits remaining');
      }

      const creditsRequired = Math.ceil(statements.length / 10);
      if (subscription.ai_credits !== -1 && subscription.ai_credits < creditsRequired) {
        throw new Error('Insufficient AI credits');
      }

      // Mock AI clustering for demo (replace with actual AI service)
      const clusters = await mockAIClusterGeneration(statements, settings);

      // Record usage
      await recordAIUsage('clustering', null, creditsRequired, {
        clustersGenerated: clusters.length,
        statementCount: statements.length
      });

      return clusters;
    } catch (error) {
      console.error('AI clustering failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const enhanceStatement = async (statement, focusQuestion) => {
    setLoading(true);
    try {
      if (subscription.ai_credits === 0) {
        throw new Error('No AI credits remaining');
      }

      if (subscription.ai_credits !== -1 && subscription.ai_credits < 1) {
        throw new Error('Insufficient AI credits');
      }

      // Mock AI enhancement for demo (replace with actual AI service)
      const enhanced = await mockAIEnhancement(statement, focusQuestion);

      // Record usage
      await recordAIUsage('enhancement', null, 1, {
        statementsEnhanced: 1,
        originalLength: statement.length,
        enhancedLength: enhanced.enhanced.length
      });

      return enhanced;
    } catch (error) {
      console.error('AI enhancement failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const purchaseAICredits = async (creditPackage) => {
    try {
      const packages = {
        small: { credits: 25, price: 9.99 },
        medium: { credits: 100, price: 29.99 },
        large: { credits: 500, price: 99.99 }
      };

      const package_ = packages[creditPackage];
      if (!package_) {
        throw new Error('Invalid package');
      }

      // In a real app, this would integrate with Stripe or another payment processor
      // For demo, we'll just add the credits
      const currentCredits = subscription.ai_credits === -1 ? -1 : subscription.ai_credits;
      const newCredits = currentCredits === -1 ? -1 : currentCredits + package_.credits;

      await supabase
        .from('subscriptions')
        .update({ ai_credits: newCredits })
        .eq('user_id', user.id);

      return { success: true, credits: package_.credits };
    } catch (error) {
      console.error('Credit purchase failed:', error);
      throw error;
    }
  };

  const value = {
    aiCredits: subscription?.ai_credits || 0,
    aiUsage,
    loading,
    generateAIStatements,
    generateAIClusters,
    enhanceStatement,
    purchaseAICredits,
    hasAIAccess: subscription?.features?.includes('ai_module') || false
  };

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  );
};

// Mock AI functions (replace with actual AI service integration)
const mockAIGeneration = async (focusQuestion, context, count) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const templates = [
    "Implement {technology} to improve {area} capabilities",
    "Develop {strategy} approach for {target} enhancement",
    "Create {framework} system to streamline {process}",
    "Establish {methodology} for better {outcome}",
    "Design {solution} to address {challenge}",
    "Build {platform} that enables {capability}",
    "Integrate {tool} to optimize {workflow}",
    "Deploy {technology} for enhanced {performance}",
    "Introduce {practice} to strengthen {aspect}",
    "Launch {initiative} targeting {improvement}"
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
      .replace('{challenge}', 'current challenges')
      .replace('{platform}', 'digital platform')
      .replace('{capability}', 'new capabilities')
      .replace('{tool}', 'advanced tools')
      .replace('{workflow}', 'existing workflows')
      .replace('{performance}', 'system performance')
      .replace('{practice}', 'best practices')
      .replace('{aspect}', 'organizational culture')
      .replace('{initiative}', 'strategic initiative')
      .replace('{improvement}', 'continuous improvement');

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

const mockAIClusterGeneration = async (statements, settings) => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const clusterTemplates = [
    { name: 'Technology Infrastructure', keywords: ['technology', 'infrastructure', 'platform', 'system', 'data', 'cloud'] },
    { name: 'Customer Experience', keywords: ['customer', 'experience', 'service', 'support', 'user', 'client'] },
    { name: 'Organizational Process', keywords: ['process', 'workflow', 'collaboration', 'team', 'agile', 'methodology'] },
    { name: 'Strategic Planning', keywords: ['strategy', 'planning', 'goal', 'objective', 'vision', 'mission'] }
  ];

  const colors = [
    'bg-blue-100 border-blue-300 text-blue-900',
    'bg-green-100 border-green-300 text-green-900',
    'bg-purple-100 border-purple-300 text-purple-900',
    'bg-red-100 border-red-300 text-red-900'
  ];

  const clusters = [];
  const usedStatements = new Set();

  clusterTemplates.forEach((template, index) => {
    const matchingStatements = statements.filter(statement => {
      if (usedStatements.has(statement.id)) return false;
      const text = statement.text.toLowerCase();
      return template.keywords.some(keyword => text.includes(keyword));
    });

    if (matchingStatements.length >= (settings.minClusterSize || 2)) {
      matchingStatements.forEach(s => usedStatements.add(s.id));
      clusters.push({
        id: Date.now() + index,
        name: template.name,
        color: colors[index % colors.length],
        statements: matchingStatements,
        confidence: 0.75 + Math.random() * 0.25,
        method: settings.clusteringMethod || 'semantic'
      });
    }
  });

  return clusters;
};

const mockAIEnhancement = async (statement, focusQuestion) => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const enhancements = [
    " with measurable KPIs and success metrics",
    " while ensuring stakeholder alignment and buy-in",
    " through iterative development and continuous feedback",
    " leveraging industry best practices and proven methodologies",
    " with consideration for budget constraints and resource allocation"
  ];

  const enhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
  
  return {
    original: statement,
    enhanced: statement + enhancement,
    confidence: 0.8 + Math.random() * 0.2,
    suggestions: [
      "Consider adding specific timelines",
      "Include success metrics",
      "Define stakeholder roles"
    ]
  };
};