import React from 'react';
import { Shield, Wallet, Loader2, Send, ChevronLeft, Sparkles, Home, Car, BookOpen, Store, Users, HeartHandshake, Activity, Sun } from 'lucide-react';

export const SafetyIcon = ({ className }: { className?: string }) => (
  <Shield className={className} strokeWidth={1.5} />
);

export const FinanceIcon = ({ className }: { className?: string }) => (
  <Wallet className={className} strokeWidth={1.5} />
);

// Clear Lotus Flower Icon for Mental Health
export const MentalHealthIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Central Petal */}
    <path d="M50 20 C 50 20, 30 50, 50 70 C 70 50, 50 20, 50 20 Z" />
    
    {/* Left Side Petal */}
    <path d="M50 70 C 40 60, 20 45, 20 35 C 20 25, 35 30, 50 50" />
    
    {/* Right Side Petal */}
    <path d="M50 70 C 60 60, 80 45, 80 35 C 80 25, 65 30, 50 50" />
    
    {/* Lower Left Petal */}
    <path d="M50 70 C 40 75, 15 65, 15 55" />
    
    {/* Lower Right Petal */}
    <path d="M50 70 C 60 75, 85 65, 85 55" />
    
    {/* Base line */}
    <path d="M 25 80 Q 50 85, 75 80" />
  </svg>
);

// Custom icon mimicking the "Angelic Wings with Halo" line art
export const WahiLogo = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 200 200" 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Halo */}
    <ellipse cx="100" cy="40" rx="30" ry="8" />

    {/* Left Wing */}
    <path d="M 90 100 C 80 60, 50 60, 35 90" /> {/* Shoulder */}
    <path d="M 35 90 C 25 110, 25 140, 30 170" /> {/* Outer long feather */}
    <path d="M 30 170 Q 35 150, 40 140" />
    <path d="M 40 140 C 40 155, 40 160, 45 165" /> {/* Second feather */}
    <path d="M 45 165 Q 50 145, 55 135" />
    <path d="M 55 135 C 55 145, 60 150, 65 155" /> {/* Third feather */}
    <path d="M 65 155 Q 70 135, 75 125" />
    <path d="M 75 125 C 75 135, 80 140, 85 140" /> {/* Fourth feather */}
    <path d="M 85 140 Q 90 120, 90 100" />

    {/* Left Wing Details (Layers) */}
    <path d="M 45 95 C 50 110, 50 120, 50 130" opacity="0.5" />
    <path d="M 60 90 C 65 105, 70 115, 70 120" opacity="0.5" />
    <path d="M 75 85 C 80 95, 85 105, 85 110" opacity="0.5" />

    {/* Right Wing (Mirrored) */}
    <path d="M 110 100 C 120 60, 150 60, 165 90" />
    <path d="M 165 90 C 175 110, 175 140, 170 170" />
    <path d="M 170 170 Q 165 150, 160 140" />
    <path d="M 160 140 C 160 155, 160 160, 155 165" />
    <path d="M 155 165 Q 150 145, 145 135" />
    <path d="M 145 135 C 145 145, 140 150, 135 155" />
    <path d="M 135 155 Q 130 135, 125 125" />
    <path d="M 125 125 C 125 135, 120 140, 115 140" />
    <path d="M 115 140 Q 110 120, 110 100" />

    {/* Right Wing Details */}
    <path d="M 155 95 C 150 110, 150 120, 150 130" opacity="0.5" />
    <path d="M 140 90 C 135 105, 130 115, 130 120" opacity="0.5" />
    <path d="M 125 85 C 120 95, 115 105, 115 110" opacity="0.5" />

  </svg>
);

export { Loader2, Send, ChevronLeft, Sparkles, Home, Car, Shield, BookOpen, Store, Users, Wallet, HeartHandshake, Activity, Sun };