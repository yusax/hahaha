import React from 'react';
import { X } from 'lucide-react';

interface FileViewerProps {
  file: { name: string; content: string } | null;
  onClose: () => void;
}

export function FileViewer({ file, onClose }: FileViewerProps) {
  if (!file) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">{file.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 overflow-auto flex-1">
          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
            {file.content}
          </pre>
        </div>
      </div>
    </div>
  );
}