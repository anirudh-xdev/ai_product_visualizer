import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Mic, MicOff, X } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string, image?: File) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedImage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!text.trim() && !selectedImage) || disabled) return;

    onSend(text, selectedImage || undefined);
    setText('');
    setSelectedImage(null);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      // Stop listening logic would go here
    } else {
      setIsListening(true);
      // Start listening logic would go here
      // For now, let's simulate voice input after 2 seconds
      setTimeout(() => {
        setText((prev) => prev + " Hello, this is a voice message.");
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      {previewUrl && (
        <div className="absolute bottom-full left-0 mb-2 p-2 bg-base-100 rounded-lg shadow-lg border border-border-light">
          <div className="relative">
            <img src={previewUrl} alt="Preview" className="h-20 w-auto rounded" />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-end gap-2 bg-base-100 p-2 rounded-xl border border-border-medium focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary transition-all shadow-sm">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-content-300 hover:text-brand-primary hover:bg-base-200 rounded-lg transition-colors"
          title="Upload Image"
          disabled={disabled}
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageSelect}
          accept="image/*"
          className="hidden"
        />

        <button
          type="button"
          onClick={toggleVoiceInput}
          className={`p-2 rounded-lg transition-colors ${
            isListening 
              ? 'text-red-500 bg-red-50 animate-pulse' 
              : 'text-content-300 hover:text-brand-primary hover:bg-base-200'
          }`}
          title="Voice Input"
          disabled={disabled}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={isListening ? "Listening..." : "Type a message..."}
          className="flex-1 max-h-32 min-h-[44px] py-2.5 px-2 bg-transparent border-none focus:ring-0 resize-none text-content-100 placeholder:text-content-300"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          disabled={disabled}
        />

        <button
          type="submit"
          disabled={(!text.trim() && !selectedImage) || disabled}
          className="p-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
