import React from 'react';
import { Calendar, X } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface Memo {
  id: string;
  content: string;
  date: string;
}

interface MemoListProps {
  memos: Memo[];
  onDelete: (id: string) => void;
}

export function MemoList({ memos, onDelete }: MemoListProps) {
  if (memos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        メモが見つかりません
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {memos.map((memo) => (
        <div
          key={memo.id}
          className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow relative group"
        >
          <div className="flex items-start justify-between">
            <p className="text-gray-800 whitespace-pre-wrap break-words flex-1">
              {memo.content}
            </p>
            <button
              onClick={() => onDelete(memo.id)}
              className="text-gray-400 hover:text-red-500 transition-colors ml-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <time>
              {format(new Date(memo.date), 'PPPp', { locale: ja })}
            </time>
          </div>
        </div>
      ))}
    </div>
  );
}