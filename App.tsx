import React, { useState } from 'react';
import { AppView, Pillar } from './types';
import PillarCard from './components/PillarCard';
import ChatModule from './components/ChatModule';
import SafetySelection from './components/SafetySelection';
import FinanceSelection from './components/FinanceSelection';
import HealthSelection from './components/HealthSelection';
import { WahiLogo } from './components/Icons';

const PILLARS: Pillar[] = [
  {
    id: AppView.MODULE_SAFETY,
    title: 'Safety',
    description: 'Real-time guidance, emergency resources, and community alerts.',
    colorBg: 'bg-wahi-lavender',
    colorText: 'text-wahi-lavenderDark',
    colorBorder: 'border-wahi-lavenderDark',
    iconType: 'shield',
    promptContext: 'personal safety, emergency response, travel safety for women, digital privacy',
  },
  {
    id: AppView.MODULE_FINANCE,
    title: 'Entrepreneurship',
    description: 'Start small, grow smart — from budgeting to launching your own venture.',
    colorBg: 'bg-wahi-coral',
    colorText: 'text-wahi-coralDark',
    colorBorder: 'border-wahi-coralDark',
    iconType: 'wallet',
    promptContext: 'small business ideas, financial literacy, investment basics, grant writing, negotiation',
  },
  {
    id: AppView.MODULE_HEALTH,
    title: 'Mental Health',
    description: 'Daily affirmations, meditation guides, and emotional support.',
    colorBg: 'bg-wahi-teal',
    colorText: 'text-wahi-tealDark',
    colorBorder: 'border-wahi-tealDark',
    iconType: 'lotus',
    promptContext: 'mental wellness, anxiety relief, meditation, work-life balance, self-care routines',
  },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.ONBOARDING);
  const [activePillar, setActivePillar] = useState<Pillar | null>(null);
  const [safetySubContext, setSafetySubContext] = useState<string>('');
  const [financeSubContext, setFinanceSubContext] = useState<string>('');
  const [healthSubContext, setHealthSubContext] = useState<string>('');

  // In onboarding, click selects the pillar. 
  // Clicking again or clicking CTA confirms.
  const handlePillarSelect = (pillar: Pillar) => {
    setActivePillar(pillar);
  };

  const handleStart = () => {
    if (activePillar) {
      setCurrentView(activePillar.id);
    }
  };

  const handleBack = () => {
    // Navigation logic:
    // If in Safety module and have sub-context -> back to Safety Selection
    // If in Finance module and have sub-context -> back to Finance Selection
    // If in Health module and have sub-context -> back to Health Selection
    // Else -> back to Onboarding (reset everything)
    
    if (currentView === AppView.MODULE_SAFETY && safetySubContext) {
      setSafetySubContext(''); 
    } else if (currentView === AppView.MODULE_FINANCE && financeSubContext) {
      setFinanceSubContext('');
    } else if (currentView === AppView.MODULE_HEALTH && healthSubContext) {
      setHealthSubContext('');
    } else {
      setCurrentView(AppView.ONBOARDING);
      setActivePillar(null);
      setSafetySubContext('');
      setFinanceSubContext('');
      setHealthSubContext('');
    }
  };

  const handleSafetyContextSelect = (context: string) => {
    setSafetySubContext(context);
  };

  const handleFinanceContextSelect = (context: string) => {
    setFinanceSubContext(context);
  };

  const handleHealthContextSelect = (context: string) => {
    setHealthSubContext(context);
  };

  // Render logic based on view state
  const renderContent = () => {
    if (currentView === AppView.ONBOARDING) {
      return (
        <main className="container mx-auto px-6 py-12 min-h-screen flex flex-col justify-center">
          
          {/* Header Section */}
          <header className="text-center mb-12 animate-fade-in-up flex flex-col items-center">
            {/* Logo Image */}
            <div className="mb-6 text-blue-900">
              <WahiLogo className="w-48 h-32 md:w-64 md:h-40" />
            </div>

            <h1 className="font-serif text-5xl md:text-6xl font-bold text-blue-900 mb-4 tracking-tight">
              Welcome to WAHI
            </h1>
            <div className="flex items-center justify-center gap-3">
              <p className="font-serif text-xl md:text-2xl text-slate-500 italic">
                Own your path
              </p>
            </div>
          </header>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto items-center justify-items-center mb-12">
            {PILLARS.map((pillar) => (
              <PillarCard 
                key={pillar.id} 
                pillar={pillar} 
                isSelected={activePillar?.id === pillar.id}
                onClick={handlePillarSelect} 
              />
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center animate-fade-in">
            <button
              onClick={handleStart}
              disabled={!activePillar}
              className={`
                px-12 py-4 rounded-full font-serif text-lg font-bold tracking-wide shadow-xl transition-all duration-300 transform
                ${activePillar 
                  ? 'bg-blue-900 text-white hover:bg-blue-800 hover:scale-105 cursor-pointer' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              {activePillar ? 'Start Your Journey' : 'Choose Your Path'}
            </button>
            <p className="mt-4 text-sm text-slate-400 font-medium">
              {activePillar ? `Selected: ${activePillar.title}` : 'Select an option above to get started'}
            </p>
          </div>

        </main>
      );
    }

    // Safety View Logic
    if (currentView === AppView.MODULE_SAFETY) {
      if (!safetySubContext) {
        return (
          <SafetySelection 
            onSelect={handleSafetyContextSelect} 
            onBack={handleBack} 
          />
        );
      }
    }

    // Finance View Logic
    if (currentView === AppView.MODULE_FINANCE) {
      if (!financeSubContext) {
        return (
          <FinanceSelection 
            onSelect={handleFinanceContextSelect} 
            onBack={handleBack} 
          />
        );
      }
    }

    // Health View Logic
    if (currentView === AppView.MODULE_HEALTH) {
      if (!healthSubContext) {
        return (
          <HealthSelection 
            onSelect={handleHealthContextSelect} 
            onBack={handleBack} 
          />
        );
      }
    }

    // Default Chat Module
    if (activePillar) {
      // Determine context to pass
      let context = '';
      if (currentView === AppView.MODULE_SAFETY) context = safetySubContext;
      if (currentView === AppView.MODULE_FINANCE) context = financeSubContext;
      if (currentView === AppView.MODULE_HEALTH) context = healthSubContext;

      return (
        <ChatModule 
          pillar={activePillar} 
          additionalContext={context}
          onBack={handleBack} 
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-wahi-offWhite font-sans selection:bg-purple-100 selection:text-purple-900">
      {renderContent()}
    </div>
  );
};

export default App;