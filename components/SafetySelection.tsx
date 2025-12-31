import React, { useState } from 'react';
import { Home, Car, ChevronLeft, Shield } from './Icons';

interface SafetySelectionProps {
  onSelect: (context: string) => void;
  onBack: () => void;
}

type OptionType = 'living' | 'travel';

const SafetySelection: React.FC<SafetySelectionProps> = ({ onSelect, onBack }) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const handleConfirm = () => {
    if (selectedOption === 'living') {
      onSelect('Focused on: Living Space Safety (Co-living, Safe Apartments, Landlord Verification, Equal Pricing).');
    } else if (selectedOption === 'travel') {
      onSelect('Focused on: Travel Safety (Verified Cabs, Intercity Travel, Safe Routes, Equal Fare Policy).');
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
          relative w-full text-left rounded-3xl p-6 md:p-8
          transition-all duration-300 ease-out flex flex-col h-full
          border-2
          ${isSelected 
            ? `${colorBorder} ${colorBg} shadow-xl scale-[1.02] ring-2 ring-offset-2 ring-blue-50` 
            : 'border-transparent bg-white shadow-md hover:shadow-lg hover:-translate-y-1'
          }
        `}
      >
        <div className={`
          w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors
          ${isSelected ? 'bg-white/40' : `${colorBg} opacity-80`}
        `}>
          <Icon className={`w-8 h-8 ${colorText}`} />
        </div>

        <h3 className={`text-2xl font-serif font-bold mb-4 ${colorText}`}>
          {title}
        </h3>

        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${colorText} opacity-60`} />
              <span className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Selection Indicator */}
        <div className={`absolute top-6 right-6 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? `${colorBorder} ${colorText}` : 'border-slate-200'}`}>
          {isSelected && <div className={`w-3 h-3 rounded-full ${colorText} bg-current`} />}
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-wahi-offWhite p-6 md:p-12 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-5xl mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <button 
          onClick={onBack}
          className="self-start flex items-center text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <div className="text-center md:text-left flex-1 md:ml-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-blue-900 mb-2 flex items-center justify-center md:justify-start gap-3">
            <Shield className="w-8 h-8 text-wahi-lavenderDark" />
            Safety First
          </h1>
          <p className="text-slate-500 font-medium">Choose your focus area to continue</p>
        </div>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl mb-12">
        
        {/* Living Space Card */}
        <OptionCard 
          type="living"
          title="Living Space"
          icon={Home}
          colorBg="bg-wahi-lavender"
          colorText="text-wahi-lavenderDark"
          colorBorder="border-wahi-lavenderDark"
          items={[
            "Women co-living spaces",
            "Apartments prioritizing safety (CCTV, Gated)",
            "Equal Pricing Badge (Fair rent for all)",
            "Verified landlords & community reviews"
          ]}
        />

        {/* Travel Card */}
        <OptionCard 
          type="travel"
          title="Travel"
          icon={Car}
          colorBg="bg-wahi-teal"
          colorText="text-wahi-tealDark"
          colorBorder="border-wahi-tealDark"
          items={[
            "Verified daily commute (Cab vendors, Metro)",
            "Safe intercity travel partnerships",
            "Smart alerts for routes & timings",
            "Equal Fare Policy (No safety markup)"
          ]}
        />
      </div>

      {/* CTA Button */}
      <div className="w-full max-w-md animate-fade-in">
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
          Explore Options
        </button>
      </div>

    </div>
  );
};

export default SafetySelection;