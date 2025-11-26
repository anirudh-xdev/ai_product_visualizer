
export interface OriginalImage {
  file: File;
  base64: string;
  mimeType: string;
}

export interface GeneratedImage {
  id: string;
  src: string;
  isEditing: boolean;
  mimeType: string;
}

export type ChatRole = 'user' | 'assistant';

export interface Content {
  type: 'text' | 'input_image';
  text?: string;
  image_url?: string; // base64 or public URL
}

export interface  ChatMessage {
  id: string;
  role: ChatRole;     // 'user' | 'assistant' | 'system'
  content: Content[]; // multimodal array
  timestamp: number;
}
