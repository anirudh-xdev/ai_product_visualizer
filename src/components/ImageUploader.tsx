
import React, { useRef } from 'react';
import type { OriginalImage } from '../types';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  originalImage: OriginalImage | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, originalImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-base-200 p-4 rounded-lg">
      <h3 className="font-semibold mb-2">1. Upload Product Image</h3>
      {originalImage ? (
        <div className="space-y-3">
          <div className="aspect-square w-full rounded-lg overflow-hidden border-2 border-base-300">
            <img 
              src={URL.createObjectURL(originalImage.file)} 
              alt="Original product" 
              className="w-full h-full object-contain"
            />
          </div>
          <button
            onClick={triggerFileInput}
            className="w-full bg-base-300 hover:bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Change Image
          </button>
        </div>
      ) : (
        <div
          onClick={triggerFileInput}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="aspect-square w-full border-2 border-dashed border-base-300 rounded-lg flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:border-brand-primary hover:bg-base-300 transition-colors duration-200"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-content-200 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-4-4V6a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4H7z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m3-3H7" />
            </svg>
          <p className="text-content-200">
            <span className="font-semibold text-brand-secondary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-content-200 mt-1">PNG, JPG, WEBP</p>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
    </div>
  );
};
