export enum ToneType {
  PROFESSIONAL = 'Professional',
  FRIENDLY = 'Friendly',
  SALES = 'Sales',
  SUPPORT = 'Customer Support'
}

export interface GenerationConfig {
  tone: ToneType;
  context: string;
}

export interface EmojiButton {
  char: string;
  label: string;
}