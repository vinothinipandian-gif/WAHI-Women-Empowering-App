import React, { useState, useRef, useEffect } from 'react';
import { Pillar, ChatMessage } from '../types';
import { generateAdvice } from '../services/geminiService';
import { Send, ChevronLeft, Loader2, Sparkles } from './Icons';

interface ChatModuleProps {
  pillar: Pillar;
  additionalContext?: string;
  onBack: () => void;
}

const ChatModule: React.FC<ChatModuleProps> = ({ pillar, additionalContext, onBack }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Welcome to the ${pillar.title} space. How can I support your journey today?` }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    // Combine general pillar context with specific sub-selection context
    const fullContext = `${pillar.promptContext}. ${additionalContext || ''}`;
    const responseText = await generateAdvice(userMsg, fullContext);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden md:rounded-xl md:my-8 md:h-[90vh]">
      {/* Header */}
      <div className={`${pillar.colorBg} ${pillar.colorText} p-4 flex items-center shadow-sm z-10`}>
        <button 
          onClick={onBack}
          className="p-2 hover:bg-black/5 rounded-full transition-colors mr-3"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="font-serif text-xl font-bold flex items-center gap-2">
            {pillar.title} <Sparkles className="w-4 h-4 opacity-70" />
          </h2>
          <p className="text-xs opacity-80">Powered by WAHI Intelligence</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/50">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`
                max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-slate-800 text-white rounded-br-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                }
              `}
            >
              {msg.text.split('\n').map((line, i) => (
                <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              <span className="text-xs text-slate-400">WAHI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask about ${pillar.title.toLowerCase()}...`}
            className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 text-sm py-2"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className={`
              p-2 rounded-full transition-all
              ${input.trim() ? `${pillar.colorText} bg-white shadow-md hover:scale-105` : 'text-slate-300 bg-transparent cursor-not-allowed'}
            `}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModule;