
import React from 'react';

interface EditPanelProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
  isEditing: boolean;
}

export const EditPanel: React.FC<EditPanelProps> = ({ prompt, onPromptChange, onSubmit, isEditing }) => {
  return (
    <div className="bg-base-200 p-4 rounded-lg animate-fade-in">
        <h3 className="font-semibold mb-2">2. Edit Selected Image</h3>
        <p className="text-sm text-content-200 mb-3">Describe the change you want to make. For example: "add a retro filter" or "make the background a solid blue color".</p>
        <textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="e.g., Add a cat sitting next to the mug"
            rows={3}
            className="w-full p-2 rounded-lg bg-base-300 border-2 border-transparent focus:border-brand-primary focus:bg-base-100 focus:outline-none transition-colors duration-200"
        />
        <button
            onClick={onSubmit}
            disabled={isEditing || !prompt}
            className="w-full mt-3 bg-brand-secondary hover:bg-brand-primary text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 disabled:bg-base-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
            {isEditing ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Applying...
                </>
            ) : "Apply Edit"}
        </button>
    </div>
  );
};
