export enum AppView {
  ONBOARDING = 'ONBOARDING',
  MODULE_SAFETY = 'MODULE_SAFETY',
  MODULE_FINANCE = 'MODULE_FINANCE',
  MODULE_HEALTH = 'MODULE_HEALTH',
}

export interface Pillar {
  id: AppView;
  title: string;
  description: string;
  colorBg: string;
  colorText: string;
  colorBorder: string;
  iconType: 'shield' | 'wallet' | 'lotus';
  promptContext: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}