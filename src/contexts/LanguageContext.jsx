import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation data structure
const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      pricing: 'Pricing',
      dashboard: 'Dashboard',
      teams: 'Teams',
      reports: 'Reports',
      signIn: 'Sign In',
      getStarted: 'Get Started',
      signOut: 'Sign Out',
      adminPanel: 'Admin Panel'
    },
    
    // Common UI elements
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      create: 'Create',
      update: 'Update',
      loading: 'Loading...',
      saving: 'Saving...',
      search: 'Search',
      filter: 'Filter',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
      back: 'Back',
      continue: 'Continue',
      submit: 'Submit',
      yes: 'Yes',
      no: 'No',
      or: 'or',
      and: 'and',
      required: 'Required',
      optional: 'Optional',
      language: 'Language'
    },
    
    // Homepage
    home: {
      heroTitle: 'Strategic Consulting',
      heroSubtitle: 'Made Visual',
      heroDescription: 'Transform your strategic planning process with Group Concept Mapping. Engage stakeholders, visualize complex ideas, and make data-driven decisions with our professional consulting platform.',
      startFreeTrial: 'Start Free Trial',
      viewPricing: 'View Pricing',
      featuresTitle: 'Powerful Features for Strategic Consulting',
      featuresDescription: 'Everything you need to conduct professional Group Concept Mapping sessions and generate actionable strategic insights.',
      processTitle: 'The GCM Process',
      processDescription: 'Follow our proven 5-step methodology to transform complex strategic challenges into clear, actionable insights.',
      ctaTitle: 'Ready to Transform Your Strategic Planning?',
      ctaDescription: 'Join leading consultants and organizations who use StrategyMap to facilitate better strategic decisions.',
      features: {
        collaboration: {
          title: 'Collaborative Brainstorming',
          description: 'Engage stakeholders in structured idea generation sessions with real-time collaboration.'
        },
        structuring: {
          title: 'Concept Structuring',
          description: 'Organize and categorize ideas using advanced clustering algorithms and visualization.'
        },
        rating: {
          title: 'Priority Rating',
          description: 'Enable participants to rate concepts on importance and feasibility for strategic decision-making.'
        },
        analytics: {
          title: 'Advanced Analytics',
          description: 'Generate comprehensive reports with statistical analysis and actionable insights.'
        },
        realtime: {
          title: 'Real-time Updates',
          description: 'See changes instantly as participants contribute ideas and provide ratings.'
        },
        security: {
          title: 'Enterprise Security',
          description: 'Bank-level security with encrypted data transmission and secure cloud storage.'
        }
      }
    },
    
    // Authentication
    auth: {
      signInTitle: 'Sign in to your account',
      signUpTitle: 'Create your account',
      email: 'Email address',
      password: 'Password',
      confirmPassword: 'Confirm password',
      fullName: 'Full name',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot your password?',
      createAccount: 'Create account',
      signIn: 'Sign in',
      signUp: 'Sign up',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      agreeToTerms: 'I agree to the',
      termsOfService: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      enterEmail: 'Enter your email',
      enterPassword: 'Enter your password',
      enterFullName: 'Enter your full name',
      createPassword: 'Create a password',
      confirmYourPassword: 'Confirm your password'
    },
    
    // Dashboard
    dashboard: {
      welcomeBack: 'Welcome back',
      manageProjects: 'Manage your strategic consulting projects and insights',
      settings: 'Settings',
      newProject: 'New Project',
      activeProjects: 'Active Projects',
      completedProjects: 'Completed Projects',
      noActiveProjects: 'No active projects yet',
      noActiveProjectsDesc: 'Create your first Group Concept Mapping project to get started.',
      createProject: 'Create Project',
      plan: 'Plan',
      projectsUsed: 'projects used',
      managePlan: 'Manage Plan',
      aiAssistant: 'AI Assistant',
      unlimitedCredits: 'Unlimited credits',
      creditsRemaining: 'credits remaining',
      notEnabled: 'Not enabled',
      viewUsage: 'View Usage',
      enableAI: 'Enable AI'
    },
    
    // Projects
    projects: {
      createNewProject: 'Create New Project',
      projectTitle: 'Project Title',
      description: 'Description',
      focusQuestion: 'Focus Question',
      enterProjectTitle: 'Enter project title',
      describeProject: 'Describe your project goals and context',
      enterFocusQuestion: 'What specific question will guide your concept mapping session?',
      focusQuestionHelper: 'This question will guide participants during brainstorming',
      creatingProject: 'Creating...',
      participants: 'participants',
      statements: 'statements',
      created: 'Created',
      viewProject: 'View Project',
      projectSettings: 'Project Settings',
      exportData: 'Export Data',
      backToDashboard: 'Back to Dashboard'
    },
    
    // GCM Process
    gcm: {
      phases: {
        brainstorming: 'Brainstorming',
        structuring: 'Structuring',
        rating: 'Rating',
        analysis: 'Analysis'
      },
      brainstorming: {
        title: 'Brainstorming Phase',
        description: 'Generate ideas and statements related to the focus question. Encourage participants to think freely and contribute diverse perspectives.',
        addStatement: 'Add Statement',
        contributeIdeas: 'Contribute Your Ideas',
        enterIdea: 'Enter your idea or statement...',
        generatedStatements: 'Generated Statements',
        contributors: 'contributors',
        aiGenerated: 'AI-generated',
        proceedToStructuring: 'Proceed to Structuring',
        readyToMove: 'Ready to move to the next phase?',
        sufficientStatements: 'Once you have sufficient statements, proceed to organize them into meaningful groups.'
      },
      structuring: {
        title: 'Structuring Phase',
        description: 'Organize statements into meaningful clusters based on similarity and thematic relationships. Create groups that represent coherent concepts or themes.',
        dragAndDrop: 'Drag and drop statements between clusters to organize them',
        conceptClusters: 'Concept Clusters',
        createCluster: 'Create Cluster',
        clusterName: 'Cluster name...',
        unorganizedStatements: 'Unorganized Statements',
        dragInstructions: 'Drag these statements into appropriate clusters above',
        clusteringProgress: 'Clustering Progress',
        totalStatements: 'Total Statements',
        organized: 'Organized',
        proceedToRating: 'Proceed to Rating',
        readyForRating: 'Ready for the rating phase?'
      },
      rating: {
        title: 'Rating & Clustering Phase',
        description: 'Rate each statement on importance and feasibility, then organize them into meaningful clusters for strategic analysis.',
        importance: 'Importance',
        feasibility: 'Feasibility',
        importanceDesc: 'How critical is this for achieving your goals?',
        feasibilityDesc: 'How realistic is it to implement this?',
        ratingProgress: 'Rating Progress',
        statementsToRate: 'Statements to Rate',
        yourRatings: 'Your Ratings',
        complete: 'Complete',
        rateStatements: 'Rate Statements',
        avgImportance: 'Avg. Importance',
        avgFeasibility: 'Avg. Feasibility',
        proceedToAnalysis: 'Proceed to Analysis'
      },
      analysis: {
        title: 'Analysis Phase',
        description: 'Analyze the structured data to generate strategic insights and actionable recommendations based on participant ratings and concept relationships.',
        analysisComplete: 'Analysis complete',
        readyForDecisions: 'Ready for strategic decision-making',
        exportReport: 'Export Report',
        conceptClusterAnalysis: 'Concept Cluster Analysis',
        strategicPriorityMatrix: 'Strategic Priority Matrix',
        strategicInsights: 'Strategic Insights & Recommendations',
        quickWins: 'Quick Wins',
        strategicProjects: 'Strategic Projects',
        fillInProjects: 'Fill-in Projects',
        questionable: 'Questionable',
        highImportanceHighFeasibility: 'High Importance, High Feasibility',
        highImportanceLowFeasibility: 'High Importance, Low Feasibility',
        lowImportanceHighFeasibility: 'Low Importance, High Feasibility',
        lowImportanceLowFeasibility: 'Low Importance, Low Feasibility',
        noClustersInQuadrant: 'No clusters in this quadrant',
        keyFindings: 'Key Findings',
        recommendedActions: 'Recommended Actions',
        immediate: 'Immediate (0-6 months)',
        mediumTerm: 'Medium-term (6-18 months)',
        longTerm: 'Long-term (18+ months)',
        riskConsiderations: 'Risk Considerations'
      }
    },
    
    // Error messages
    errors: {
      invalidCredentials: 'Invalid email or password',
      passwordsDoNotMatch: 'Passwords do not match',
      passwordTooShort: 'Password must be at least 8 characters long',
      failedToCreateAccount: 'Failed to create account. Please try again.',
      connectionFailed: 'Connection failed. Please try again.',
      somethingWentWrong: 'Something went wrong. Please try again.',
      requiredField: 'This field is required',
      invalidEmail: 'Please enter a valid email address'
    }
  },
  
  de: {
    // Navigation
    nav: {
      home: 'Startseite',
      pricing: 'Preise',
      dashboard: 'Dashboard',
      teams: 'Teams',
      reports: 'Berichte',
      signIn: 'Anmelden',
      getStarted: 'Loslegen',
      signOut: 'Abmelden',
      adminPanel: 'Admin-Panel'
    },
    
    // Common UI elements
    common: {
      save: 'Speichern',
      cancel: 'Abbrechen',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      add: 'Hinzufügen',
      create: 'Erstellen',
      update: 'Aktualisieren',
      loading: 'Wird geladen...',
      saving: 'Wird gespeichert...',
      search: 'Suchen',
      filter: 'Filtern',
      next: 'Weiter',
      previous: 'Zurück',
      close: 'Schließen',
      back: 'Zurück',
      continue: 'Fortfahren',
      submit: 'Absenden',
      yes: 'Ja',
      no: 'Nein',
      or: 'oder',
      and: 'und',
      required: 'Erforderlich',
      optional: 'Optional',
      language: 'Sprache'
    },
    
    // Homepage
    home: {
      heroTitle: 'Strategische Beratung',
      heroSubtitle: 'Visuell Gemacht',
      heroDescription: 'Transformieren Sie Ihren strategischen Planungsprozess mit Group Concept Mapping. Binden Sie Stakeholder ein, visualisieren Sie komplexe Ideen und treffen Sie datengestützte Entscheidungen mit unserer professionellen Beratungsplattform.',
      startFreeTrial: 'Kostenlose Testversion starten',
      viewPricing: 'Preise ansehen',
      featuresTitle: 'Leistungsstarke Features für strategische Beratung',
      featuresDescription: 'Alles was Sie brauchen, um professionelle Group Concept Mapping-Sitzungen durchzuführen und umsetzbare strategische Erkenntnisse zu generieren.',
      processTitle: 'Der GCM-Prozess',
      processDescription: 'Folgen Sie unserer bewährten 5-Schritte-Methodik, um komplexe strategische Herausforderungen in klare, umsetzbare Erkenntnisse zu verwandeln.',
      ctaTitle: 'Bereit, Ihre strategische Planung zu transformieren?',
      ctaDescription: 'Schließen Sie sich führenden Beratern und Organisationen an, die StrategyMap nutzen, um bessere strategische Entscheidungen zu treffen.',
      features: {
        collaboration: {
          title: 'Kollaboratives Brainstorming',
          description: 'Binden Sie Stakeholder in strukturierte Ideenfindungssitzungen mit Echtzeit-Zusammenarbeit ein.'
        },
        structuring: {
          title: 'Konzept-Strukturierung',
          description: 'Organisieren und kategorisieren Sie Ideen mit fortschrittlichen Clustering-Algorithmen und Visualisierung.'
        },
        rating: {
          title: 'Prioritätenbewertung',
          description: 'Ermöglichen Sie Teilnehmern, Konzepte nach Wichtigkeit und Machbarkeit für strategische Entscheidungen zu bewerten.'
        },
        analytics: {
          title: 'Erweiterte Analytik',
          description: 'Generieren Sie umfassende Berichte mit statistischer Analyse und umsetzbaren Erkenntnissen.'
        },
        realtime: {
          title: 'Echtzeit-Updates',
          description: 'Sehen Sie Änderungen sofort, während Teilnehmer Ideen beitragen und Bewertungen abgeben.'
        },
        security: {
          title: 'Unternehmenssicherheit',
          description: 'Bank-Level-Sicherheit mit verschlüsselter Datenübertragung und sicherem Cloud-Speicher.'
        }
      }
    },
    
    // Authentication
    auth: {
      signInTitle: 'Bei Ihrem Konto anmelden',
      signUpTitle: 'Ihr Konto erstellen',
      email: 'E-Mail-Adresse',
      password: 'Passwort',
      confirmPassword: 'Passwort bestätigen',
      fullName: 'Vollständiger Name',
      rememberMe: 'Angemeldet bleiben',
      forgotPassword: 'Passwort vergessen?',
      createAccount: 'Konto erstellen',
      signIn: 'Anmelden',
      signUp: 'Registrieren',
      alreadyHaveAccount: 'Haben Sie bereits ein Konto?',
      dontHaveAccount: 'Haben Sie noch kein Konto?',
      agreeToTerms: 'Ich stimme den',
      termsOfService: 'Nutzungsbedingungen',
      privacyPolicy: 'Datenschutzrichtlinie',
      enterEmail: 'E-Mail eingeben',
      enterPassword: 'Passwort eingeben',
      enterFullName: 'Vollständigen Namen eingeben',
      createPassword: 'Passwort erstellen',
      confirmYourPassword: 'Passwort bestätigen'
    },
    
    // Dashboard
    dashboard: {
      welcomeBack: 'Willkommen zurück',
      manageProjects: 'Verwalten Sie Ihre strategischen Beratungsprojekte und Erkenntnisse',
      settings: 'Einstellungen',
      newProject: 'Neues Projekt',
      activeProjects: 'Aktive Projekte',
      completedProjects: 'Abgeschlossene Projekte',
      noActiveProjects: 'Noch keine aktiven Projekte',
      noActiveProjectsDesc: 'Erstellen Sie Ihr erstes Group Concept Mapping-Projekt, um zu beginnen.',
      createProject: 'Projekt erstellen',
      plan: 'Plan',
      projectsUsed: 'Projekte verwendet',
      managePlan: 'Plan verwalten',
      aiAssistant: 'KI-Assistent',
      unlimitedCredits: 'Unbegrenzte Credits',
      creditsRemaining: 'Credits verbleibend',
      notEnabled: 'Nicht aktiviert',
      viewUsage: 'Nutzung anzeigen',
      enableAI: 'KI aktivieren'
    },
    
    // Projects
    projects: {
      createNewProject: 'Neues Projekt erstellen',
      projectTitle: 'Projekttitel',
      description: 'Beschreibung',
      focusQuestion: 'Fokus-Frage',
      enterProjectTitle: 'Projekttitel eingeben',
      describeProject: 'Beschreiben Sie Ihre Projektziele und den Kontext',
      enterFocusQuestion: 'Welche spezifische Frage wird Ihre Concept Mapping-Sitzung leiten?',
      focusQuestionHelper: 'Diese Frage wird die Teilnehmer beim Brainstorming leiten',
      creatingProject: 'Wird erstellt...',
      participants: 'Teilnehmer',
      statements: 'Aussagen',
      created: 'Erstellt',
      viewProject: 'Projekt anzeigen',
      projectSettings: 'Projekteinstellungen',
      exportData: 'Daten exportieren',
      backToDashboard: 'Zurück zum Dashboard'
    },
    
    // GCM Process
    gcm: {
      phases: {
        brainstorming: 'Brainstorming',
        structuring: 'Strukturierung',
        rating: 'Bewertung',
        analysis: 'Analyse'
      },
      brainstorming: {
        title: 'Brainstorming-Phase',
        description: 'Generieren Sie Ideen und Aussagen in Bezug auf die Fokus-Frage. Ermutigen Sie Teilnehmer, frei zu denken und vielfältige Perspektiven beizutragen.',
        addStatement: 'Aussage hinzufügen',
        contributeIdeas: 'Ihre Ideen beitragen',
        enterIdea: 'Geben Sie Ihre Idee oder Aussage ein...',
        generatedStatements: 'Generierte Aussagen',
        contributors: 'Mitwirkende',
        aiGenerated: 'KI-generiert',
        proceedToStructuring: 'Zur Strukturierung fortfahren',
        readyToMove: 'Bereit für die nächste Phase?',
        sufficientStatements: 'Sobald Sie ausreichend Aussagen haben, fahren Sie mit der Organisation in sinnvolle Gruppen fort.'
      },
      structuring: {
        title: 'Strukturierungs-Phase',
        description: 'Organisieren Sie Aussagen in sinnvolle Cluster basierend auf Ähnlichkeit und thematischen Beziehungen. Erstellen Sie Gruppen, die kohärente Konzepte oder Themen repräsentieren.',
        dragAndDrop: 'Ziehen Sie Aussagen zwischen Clustern, um sie zu organisieren',
        conceptClusters: 'Konzept-Cluster',
        createCluster: 'Cluster erstellen',
        clusterName: 'Cluster-Name...',
        unorganizedStatements: 'Unorganisierte Aussagen',
        dragInstructions: 'Ziehen Sie diese Aussagen in die entsprechenden Cluster oben',
        clusteringProgress: 'Clustering-Fortschritt',
        totalStatements: 'Aussagen insgesamt',
        organized: 'Organisiert',
        proceedToRating: 'Zur Bewertung fortfahren',
        readyForRating: 'Bereit für die Bewertungsphase?'
      },
      rating: {
        title: 'Bewertungs- & Clustering-Phase',
        description: 'Bewerten Sie jede Aussage nach Wichtigkeit und Machbarkeit, und organisieren Sie sie dann in sinnvolle Cluster für strategische Analyse.',
        importance: 'Wichtigkeit',
        feasibility: 'Machbarkeit',
        importanceDesc: 'Wie wichtig ist dies für das Erreichen Ihrer Ziele?',
        feasibilityDesc: 'Wie realistisch ist es, dies umzusetzen?',
        ratingProgress: 'Bewertungsfortschritt',
        statementsToRate: 'Zu bewertende Aussagen',
        yourRatings: 'Ihre Bewertungen',
        complete: 'Vollständig',
        rateStatements: 'Aussagen bewerten',
        avgImportance: 'Durchschn. Wichtigkeit',
        avgFeasibility: 'Durchschn. Machbarkeit',
        proceedToAnalysis: 'Zur Analyse fortfahren'
      },
      analysis: {
        title: 'Analyse-Phase',
        description: 'Analysieren Sie die strukturierten Daten, um strategische Erkenntnisse und umsetzbare Empfehlungen basierend auf Teilnehmerbewertungen und Konzeptbeziehungen zu generieren.',
        analysisComplete: 'Analyse abgeschlossen',
        readyForDecisions: 'Bereit für strategische Entscheidungsfindung',
        exportReport: 'Bericht exportieren',
        conceptClusterAnalysis: 'Konzept-Cluster-Analyse',
        strategicPriorityMatrix: 'Strategische Prioritätenmatrix',
        strategicInsights: 'Strategische Erkenntnisse & Empfehlungen',
        quickWins: 'Schnelle Erfolge',
        strategicProjects: 'Strategische Projekte',
        fillInProjects: 'Füll-Projekte',
        questionable: 'Fragwürdig',
        highImportanceHighFeasibility: 'Hohe Wichtigkeit, Hohe Machbarkeit',
        highImportanceLowFeasibility: 'Hohe Wichtigkeit, Niedrige Machbarkeit',
        lowImportanceHighFeasibility: 'Niedrige Wichtigkeit, Hohe Machbarkeit',
        lowImportanceLowFeasibility: 'Niedrige Wichtigkeit, Niedrige Machbarkeit',
        noClustersInQuadrant: 'Keine Cluster in diesem Quadranten',
        keyFindings: 'Wichtige Erkenntnisse',
        recommendedActions: 'Empfohlene Maßnahmen',
        immediate: 'Sofortig (0-6 Monate)',
        mediumTerm: 'Mittelfristig (6-18 Monate)',
        longTerm: 'Langfristig (18+ Monate)',
        riskConsiderations: 'Risiko-Überlegungen'
      }
    },
    
    // Error messages
    errors: {
      invalidCredentials: 'Ungültige E-Mail oder Passwort',
      passwordsDoNotMatch: 'Passwörter stimmen nicht überein',
      passwordTooShort: 'Passwort muss mindestens 8 Zeichen lang sein',
      failedToCreateAccount: 'Fehler beim Erstellen des Kontos. Bitte versuchen Sie es erneut.',
      connectionFailed: 'Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.',
      somethingWentWrong: 'Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.',
      requiredField: 'Dieses Feld ist erforderlich',
      invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    const browserLanguage = navigator.language.split('-')[0];
    
    if (savedLanguage && ['en', 'de'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    } else if (['en', 'de'].includes(browserLanguage)) {
      setCurrentLanguage(browserLanguage);
    }
  }, []);

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('preferred-language', currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const changeLanguage = (languageCode) => {
    if (['en', 'de'].includes(languageCode)) {
      setCurrentLanguage(languageCode);
    }
  };

  // Translation function with nested object support
  const translate = (key, replacements = {}) => {
    const keys = key.split('.');
    let translation = translations[currentLanguage];
    
    for (const k of keys) {
      translation = translation?.[k];
      if (!translation) break;
    }
    
    // Fallback to English if translation not found
    if (!translation) {
      let fallback = translations.en;
      for (const k of keys) {
        fallback = fallback?.[k];
        if (!fallback) break;
      }
      translation = fallback || key;
    }
    
    // Replace placeholders
    if (typeof translation === 'string' && Object.keys(replacements).length > 0) {
      Object.entries(replacements).forEach(([placeholder, value]) => {
        translation = translation.replace(`{${placeholder}}`, value);
      });
    }
    
    return translation;
  };

  // Short alias for translate function
  const t = translate;

  const value = {
    currentLanguage,
    changeLanguage,
    translate,
    t,
    availableLanguages: [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};