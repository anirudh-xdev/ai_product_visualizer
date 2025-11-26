import { ChatMessage as ChatMessageType } from '../../../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAi = message.role === 'assistant';
  
  return (
    <div className={`flex gap-4 p-4 rounded-xl transition-colors ${
      isAi ? 'bg-base-200/50' : 'bg-transparent'
    }`}>
      <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        isAi ? 'bg-brand-primary text-white' : 'bg-content-200 text-base-100'
      }`}>
        {isAi ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-content-100">
            {isAi ? 'Omnexia AI' : 'You'}
          </span>
          <span className="text-xs text-content-300">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        {message.content[0].image_url && (
          <div className="mb-2">
            <img 
              src={message.content[0].image_url} 
              alt="Uploaded content" 
              className="max-w-sm rounded-lg border border-border-medium shadow-sm"
            />
          </div>
        )}
        
        <div className="text-content-200 leading-relaxed whitespace-pre-wrap">
          {message.content[0].text}
        </div>
      </div>
    </div>
  );
}
