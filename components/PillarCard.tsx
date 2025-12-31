import React from 'react';
import { Pillar } from '../types';
import { SafetyIcon, FinanceIcon, MentalHealthIcon } from './Icons';

interface PillarCardProps {
  pillar: Pillar;
  isSelected: boolean;
  onClick: (pillar: Pillar) => void;
}

const PillarCard: React.FC<PillarCardProps> = ({ pillar, isSelected, onClick }) => {
  const renderIcon = () => {
    const iconClasses = "w-12 h-12 transition-all duration-500 ease-out";
    switch (pillar.iconType) {
      case 'shield': return <SafetyIcon className={iconClasses} />;
      case 'wallet': return <FinanceIcon className={iconClasses} />;
      case 'lotus': return <MentalHealthIcon className={iconClasses} />;
      default: return null;
    }
  };

  return (
    <button
      onClick={() => onClick(pillar)}
      className={`
        group relative overflow-hidden rounded-3xl p-8 
        transition-all duration-500 ease-out 
        flex flex-col items-center justify-center text-center
        h-80 w-full max-w-sm
        ${pillar.colorBg} ${pillar.colorText}
        border-2
        ${isSelected 
          ? `border-current shadow-2xl scale-105 ring-4 ring-offset-2 ring-purple-100 z-10` 
          : `border-transparent hover:shadow-xl hover:-translate-y-2`
        }
      `}
    >
      <div className={`absolute inset-0 bg-white transition-opacity duration-300 ${isSelected ? 'opacity-10' : 'opacity-0 group-hover:opacity-20'}`}></div>
      
      <div className="z-10 flex flex-col items-center transform transition-transform duration-500">
        
        {/* Interactive Icon Container */}
        <div className={`mb-6 p-5 rounded-full backdrop-blur-sm 
                        border border-white/20 shadow-sm
                        transition-all duration-500 ease-out
                        ${isSelected 
                          ? 'bg-white/40 scale-110 rotate-6 shadow-lg' 
                          : 'bg-white/20 group-hover:bg-white/40 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg'
                        }`}>
          {renderIcon()}
        </div>

        <h3 className="font-serif text-2xl font-bold mb-3 tracking-wide transition-colors">
          {pillar.title}
        </h3>
        <p className="font-sans text-sm opacity-90 leading-relaxed max-w-[85%] font-medium transition-opacity duration-300">
          {pillar.description}
        </p>
      </div>
      
      {/* Decorative background animations */}
      <div className={`absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-10 ${pillar.colorBorder} blur-3xl transition-transform duration-1000 ${isSelected ? 'scale-150 opacity-30' : 'group-hover:scale-150 group-hover:opacity-30'}`}></div>
      <div className={`absolute -top-16 -left-16 w-32 h-32 rounded-full opacity-10 ${pillar.colorBorder} blur-2xl transition-transform duration-1000 ${isSelected ? 'scale-125 opacity-20' : 'group-hover:scale-125 group-hover:opacity-20'}`}></div>
      
      {isSelected && (
        <div className="absolute top-4 right-4 text-current animate-fade-in">
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
           </svg>
        </div>
      )}
    </button>
  );
};

export default PillarCard;