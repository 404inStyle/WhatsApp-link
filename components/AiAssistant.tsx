import React, { useState, useRef, useEffect } from 'react';
import { generateAiMessage } from '../services/geminiService';
import { ToneType } from '../types';
import { TONE_OPTIONS } from '../constants';

interface AiAssistantProps {
  onMessageGenerated: (msg: string) => void;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ onMessageGenerated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState<ToneType>(ToneType.PROFESSIONAL);
  const [context, setContext] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const msg = await generateAiMessage(tone, context);
      if (msg) {
        onMessageGenerated(msg);
        setIsOpen(false); 
      }
    } catch (error) {
      alert("AI 生成服务暂时繁忙，请稍后再试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative ml-auto" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors focus:outline-none ${
           isOpen ? 'bg-blue-100 text-arco-primary' : 'bg-blue-50 text-arco-primary hover:bg-blue-100'
        }`}
      >
        <i className="fa-solid fa-wand-magic-sparkles"></i> 
        <span>AI 帮我写</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-3 w-[280px] md:w-80 bg-white border border-arco-border rounded-lg shadow-arco-hover p-4 z-50 animate-fade-in origin-bottom-right">
          
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-semibold text-arco-title flex items-center gap-2">
              <i className="fa-solid fa-robot text-arco-primary"></i>
              AI 智能助手
            </h4>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100">
              <i className="fa-solid fa-times text-xs"></i>
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-arco-text mb-1.5">风格选择</label>
              <div className="grid grid-cols-2 gap-2">
                {TONE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTone(opt.value)}
                    className={`text-xs py-1.5 px-2 rounded border transition-all duration-200 truncate ${
                      tone === opt.value
                        ? 'bg-blue-50 text-arco-primary border-arco-primary'
                        : 'bg-white text-arco-text border-arco-border hover:border-arco-primary/50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-arco-text mb-1.5">关键词 (可选)</label>
              <input
                type="text"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="例如：黑五促销..."
                className="w-full text-xs p-2 bg-arco-fill border border-transparent hover:bg-gray-100 focus:bg-white focus:border-arco-primary focus:ring-2 focus:ring-arco-primary/10 rounded-md outline-none transition-all"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-arco-primary text-white text-xs font-medium py-2 rounded-md hover:bg-arco-hover disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 transition-all shadow-sm"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i> 生成中...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane"></i> 立即生成
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;