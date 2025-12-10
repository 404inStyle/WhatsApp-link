import { EmojiButton, ToneType } from './types';

export const COMMON_EMOJIS: EmojiButton[] = [
  { char: '✨', label: 'Sparkles' },
  { char: '🔥', label: 'Fire' },
  { char: '🤝', label: 'Handshake' },
  { char: '💼', label: 'Briefcase' },
  { char: '👋', label: 'Wave' },
  { char: '💬', label: 'Chat' },
  { char: '🚀', label: 'Rocket' },
  { char: '💎', label: 'Gem' },
  { char: '🎁', label: 'Gift' },
  { char: '✅', label: 'Check' },
  { char: '❤️', label: 'Heart' },
  { char: '👍', label: 'Thumbs Up' },
  { char: '🎉', label: 'Party' },
  { char: '👀', label: 'Eyes' },
  { char: '😊', label: 'Smile' },
  { char: '📱', label: 'Phone' },
  { char: '📩', label: 'Mail' },
  { char: '⭐', label: 'Star' },
];

export const TONE_OPTIONS = [
  { value: ToneType.PROFESSIONAL, label: '商务洽谈 (Professional)' },
  { value: ToneType.FRIENDLY, label: '社群互动 (Friendly)' },
  { value: ToneType.SALES, label: '限时促销 (Sales)' },
  { value: ToneType.SUPPORT, label: '售后服务 (Support)' },
];