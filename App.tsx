import React, { useState, useEffect } from 'react';
import EmojiPicker from './components/EmojiPicker';
import AiAssistant from './components/AiAssistant';

const App: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  // Update link whenever inputs change
  useEffect(() => {
    // Keep only digits
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (!cleanPhone) {
      setGeneratedLink('');
      return;
    }

    const baseUrl = "https://wa.me/";
    let finalUrl = `${baseUrl}${cleanPhone}`;

    if (message) {
      const encodedMessage = encodeURIComponent(message);
      finalUrl += `?text=${encodedMessage}`;
    }

    setGeneratedLink(finalUrl);
  }, [phone, message]);

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const insertEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 font-sans selection:bg-arco-primary selection:text-white">
      
      {/* Brand Header */}
      <div className="text-center mb-10 animate-slide-up">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-arco-primary text-white shadow-lg shadow-arco-primary/30 mb-4 transform hover:scale-105 transition-transform duration-300">
          <i className="fa-brands fa-whatsapp text-3xl"></i>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-arco-title mb-2 tracking-tight">
          WhatsApp链接生成器
        </h1>
        <p className="text-arco-text text-base font-normal max-w-md mx-auto">
          为跨境电商与私域流量打造的
          <span className="text-arco-primary font-medium mx-1">营销工具</span>
        </p>
      </div>

      {/* Main Card - Arco Style */}
      <div className="w-full max-w-[800px] bg-white rounded-2xl shadow-arco-card border border-white/50 p-8 md:p-10 space-y-8 animate-fade-in relative">
        
        {/* 1. Phone Input Section */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-arco-title flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-arco-primary text-white text-xs font-bold">1</span>
            输入目标号码
          </label>
          <div className="group relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-arco-muted group-focus-within:text-arco-primary transition-colors">
              <i className="fa-solid fa-globe"></i>
            </div>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="例如: 1 555 123 4567"
              className="w-full pl-10 pr-4 py-3 bg-arco-fill border border-transparent hover:bg-gray-100 focus:bg-white focus:border-arco-primary focus:ring-4 focus:ring-arco-primary/10 rounded-xl outline-none transition-all text-arco-title font-mono text-base placeholder-arco-muted/70"
            />
          </div>
          <p className="text-xs text-arco-muted pl-1">请包含国家代码，无需加号 (+)</p>
        </div>

        {/* 2. Message Input Section */}
        <div className="space-y-3">
           <label className="text-sm font-semibold text-arco-title flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-arco-primary text-white text-xs font-bold">2</span>
            定制营销话术
          </label>
          
          {/* Removed overflow-hidden to allow AI popup to show, added specific rounding to children */}
          <div className="bg-arco-fill border border-transparent hover:bg-gray-100 focus-within:bg-white focus-within:border-arco-primary focus-within:ring-4 focus-within:ring-arco-primary/10 rounded-xl transition-all group relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, 我对你们的高级版方案很感兴趣，能发一份报价单吗？"
              rows={4}
              className="w-full p-4 bg-transparent border-none outline-none text-arco-title resize-none text-base placeholder-arco-muted/70 leading-relaxed rounded-t-xl"
            />
            {/* Tool Bar */}
            <div className="bg-white/50 border-t border-arco-border/50 px-3 py-2 flex items-center justify-between gap-2 rounded-b-xl">
               <EmojiPicker onSelect={insertEmoji} />
               <AiAssistant onMessageGenerated={(msg) => setMessage(msg)} />
            </div>
          </div>
        </div>

        {/* 3. Preview Section */}
        <div className="bg-arco-fill/50 rounded-xl p-6 border border-dashed border-arco-border">
           <div className="flex items-center justify-between mb-4">
             <h3 className="text-xs font-bold text-arco-muted uppercase tracking-wider flex items-center gap-2">
               <i className="fa-solid fa-eye"></i> 实时预览
             </h3>
             {phone && (
               <span className="text-xs font-medium text-arco-primary bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                 +{phone.replace(/\D/g,'')}
               </span>
             )}
           </div>
           
           <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-white bg-gradient-to-br from-gray-300 to-gray-400">
               <i className="fa-solid fa-user text-xs"></i>
             </div>
             
             <div className="bg-white border border-arco-border rounded-tr-2xl rounded-br-2xl rounded-bl-2xl p-4 shadow-sm relative flex-grow max-w-lg">
                {message ? (
                  <p className="text-arco-title whitespace-pre-wrap leading-relaxed text-sm">{message}</p>
                ) : (
                  <p className="text-arco-muted italic text-sm">（预览消息内容...）</p>
                )}
                <div className="text-[10px] text-arco-muted text-right mt-1.5 flex justify-end items-center gap-1">
                  12:00 PM <i className="fa-solid fa-check-double text-arco-primary"></i>
                </div>
             </div>
           </div>
        </div>

        {/* 4. Action Section */}
        <div className="pt-2">
          {/* Link Display */}
          <div className="mb-5 relative">
             <input 
                readOnly
                value={generatedLink || 'https://wa.me/'}
                className="w-full pl-4 pr-12 py-3 bg-white border border-arco-border rounded-lg text-arco-muted text-sm font-mono focus:outline-none"
             />
             <div className="absolute right-3 top-3 text-arco-muted">
                <i className="fa-solid fa-link"></i>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleCopy}
              disabled={!generatedLink}
              className={`py-3 px-6 rounded-lg font-medium text-base transition-all flex items-center justify-center gap-2 ${
                generatedLink 
                ? 'bg-arco-primary text-white hover:bg-arco-hover active:bg-arco-active shadow-lg shadow-arco-primary/20' 
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              {copied ? (
                <>
                  <i className="fa-solid fa-check-circle"></i> 已复制
                </>
              ) : (
                <>
                  <i className="fa-regular fa-copy"></i> 复制短链接
                </>
              )}
            </button>

            {generatedLink ? (
              <a 
                href={generatedLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="py-3 px-6 rounded-lg font-medium text-base text-success bg-green-50 border border-green-100 hover:bg-green-100 transition-all flex items-center justify-center gap-2"
              >
                  <i className="fa-brands fa-whatsapp text-lg"></i> 打开测试
              </a>
            ) : (
               <button disabled className="py-3 px-6 rounded-lg font-medium text-base text-arco-muted bg-gray-50 border border-arco-border cursor-not-allowed flex items-center justify-center gap-2">
                  <i className="fa-brands fa-whatsapp text-lg"></i> 打开测试
               </button>
            )}
          </div>
          
          <div className="mt-8 text-center">
            <span className="text-xs text-arco-muted">
              Powered by doingfb
            </span>
          </div>
        </div>

      </div>
      
      {/* Footer */}
      <div className="mt-10 flex flex-wrap justify-center gap-6 text-arco-muted text-xs">
        <a href="https://doingfb.com/" target="_blank" rel="noopener noreferrer" className="hover:text-arco-primary cursor-pointer transition-colors">使用指南</a>
        <a href="https://doingfb.com/" target="_blank" rel="noopener noreferrer" className="hover:text-arco-primary cursor-pointer transition-colors">隐私政策</a>
        <a href="https://doingfb.com/" target="_blank" rel="noopener noreferrer" className="hover:text-arco-primary cursor-pointer transition-colors">联系我们</a>
      </div>

    </div>
  );
};

export default App;