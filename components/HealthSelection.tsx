import React, { useState } from 'react';
import { HeartHandshake, Activity, Sun, Sparkles, ChevronLeft, MentalHealthIcon } from './Icons';

interface HealthSelectionProps {
  onSelect: (context: string) => void;
  onBack: () => void;
}

type OptionType = 'support' | 'mood' | 'mindfulness' | 'mermaid';

const HealthSelection: React.FC<HealthSelectionProps> = ({ onSelect, onBack }) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const handleConfirm = () => {
    if (selectedOption === 'support') {
      onSelect('Focused on: Peer Support & Resources (Anonymous sharing, affordable therapy access, emergency helplines).');
    } else if (selectedOption === 'mood') {
      onSelect('Focused on: Mood & Stress Tracker (Daily check-ins, emotional patterns, trigger insights).');
    } else if (selectedOption === 'mindfulness') {
      onSelect('Focused on: Daily Affirmations & Mindfulness (Guided meditation, breathing exercises, journaling prompts).');
    } else if (selectedOption === 'mermaid') {
      onSelect('Focused on: My MerMAID (Household help delegation, verified support staff, stress reduction).');
    }
  };

  const OptionCard = ({ 
    type, 
    title, 
    icon: Icon, 
    items, 
    colorBg, 
    colorText, 
    colorBorder 
  }: { 
    type: OptionType, 
    title: string, 
    icon: any, 
    items: string[], 
    colorBg: string, 
    colorText: string, 
    colorBorder: string 
  }) => {
    const isSelected = selectedOption === type;
    
    return (
      <button
        onClick={() => setSelectedOption(type)}
        className={`
          relative w-full text-left rounded-3xl p-6
          transition-all duration-300 ease-out flex flex-col h-full
          border-2
          ${isSelected 
            ? `${colorBorder} ${colorBg} shadow-xl scale-[1.02] ring-2 ring-offset-2 ring-purple-50 z-10` 
            : 'border-transparent bg-white shadow-md hover:shadow-lg hover:-translate-y-1'
          }
        `}
      >
        <div className={`
          w-14 h-14 rounded-full flex items-center justify-center mb-5 transition-colors
          ${isSelected ? 'bg-white/40' : `${colorBg} opacity-80`}
        `}>
          <Icon className={`w-7 h-7 ${colorText}`} />
        </div>

        <h3 className={`text-xl font-serif font-bold mb-3 ${colorText}`}>
          {title}
        </h3>

        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${colorText} opacity-60`} />
              <span className="text-slate-600 text-sm font-medium leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Selection Indicator */}
        <div className={`absolute top-5 right-5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? `${colorBorder} ${colorText}` : 'border-slate-200'}`}>
          {isSelected && <div className={`w-3 h-3 rounded-full ${colorText} bg-current`} />}
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-wahi-offWhite p-6 md:p-12 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-6xl mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <button 
          onClick={onBack}
          className="self-start flex items-center text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <div className="text-center md:text-left flex-1 md:ml-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-blue-900 mb-2 flex items-center justify-center md:justify-start gap-3">
            <MentalHealthIcon className="w-8 h-8 text-wahi-tealDark" />
            Mindfulness
          </h1>
          <p className="text-slate-500 font-medium">Balance Your Life</p>
        </div>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mb-12">
        
        {/* Peer Support (Lavender) */}
        <OptionCard 
          type="support"
          title="Peer Support & Resources"
          icon={HeartHandshake}
          colorBg="bg-wahi-lavender"
          colorText="text-wahi-lavenderDark"
          colorBorder="border-wahi-lavenderDark"
          items={[
            "Anonymous community spaces",
            "Access to affordable therapy",
            "Emergency helplines"
          ]}
        />

        {/* Mood Tracker (Sky Blue) */}
        <OptionCard 
          type="mood"
          title="Mood & Stress Tracker"
          icon={Activity}
          colorBg="bg-wahi-sky"
          colorText="text-wahi-skyDark"
          colorBorder="border-wahi-skyDark"
          items={[
            "Daily check-ins for emotional state",
            "Visual graphs of mood patterns",
            "AI insights on triggers"
          ]}
        />

         {/* Affirmations (Peach) */}
         <OptionCard 
          type="mindfulness"
          title="Daily Affirmations"
          icon={Sun}
          colorBg="bg-wahi-peach"
          colorText="text-wahi-peachDark"
          colorBorder="border-wahi-peachDark"
          items={[
            "Uplifting tailored affirmations",
            "Guided meditations & breathing",
            "Journaling prompts"
          ]}
        />

        {/* My MerMAID (Mint) */}
        <OptionCard 
          type="mermaid"
          title="My MerMAID"
          icon={Sparkles}
          colorBg="bg-wahi-mint"
          colorText="text-wahi-mintDark"
          colorBorder="border-wahi-mintDark"
          items={[
            "Hire verified maids & support staff",
            "Cleaning, cooking, childcare options",
            "Delegation reminders & stress reduction"
          ]}
        />
      </div>

      {/* CTA Button */}
      <div className="w-full max-w-md animate-fade-in pb-12">
        <button
          onClick={handleConfirm}
          disabled={!selectedOption}
          className={`
            w-full py-4 rounded-full font-serif text-xl font-bold tracking-wide shadow-xl transition-all duration-300 transform
            ${selectedOption 
              ? 'bg-blue-900 text-white hover:bg-blue-800 hover:scale-105 cursor-pointer' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }
          `}
        >
          Start Your Mindfulness Journey
        </button>
      </div>

    </div>
  );
};

export default HealthSelection;