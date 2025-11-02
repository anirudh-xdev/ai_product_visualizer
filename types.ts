
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
