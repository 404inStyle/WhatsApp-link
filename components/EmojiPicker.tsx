import React from 'react';
import { COMMON_EMOJIS } from '../constants';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect }) => {
  // Show all emojis in a scrollable row
  const displayEmojis = COMMON_EMOJIS;

  return (
    <div 
      className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1 min-w-0" 
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {displayEmojis.map((emoji) => (
        <button
          key={emoji.label}
          onClick={() => onSelect(emoji.char)}
          className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-transparent hover:bg-gray-100 rounded-md text-lg transition-colors text-arco-title"
          title={emoji.label}
          type="button"
        >
          {emoji.char}
        </button>
      ))}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default EmojiPicker;