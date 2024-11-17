import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface MemoInputProps {
  onAdd: (content: string) => void;
}

export function MemoInput({ onAdd }: MemoInputProps) {
  const [content, setContent] = useState('');

  const handleAdd = () => {
    if (content.trim()) {
      onAdd(content);
      setContent('');
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="新しいメモを入力..."
        className="flex-1 px-4 py-3 rounded-lg bg-white shadow-sm border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
      />
      <button
        onClick={handleAdd}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        追加
      </button>
    </div>
  );
}