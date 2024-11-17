import React from 'react';
import { File, Trash2, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface TextFile {
  id: string;
  name: string;
  content: string;
  date: string;
}

interface FileListProps {
  files: TextFile[];
  onDelete: (id: string) => void;
  onView: (file: TextFile) => void;
}

export function FileList({ files, onDelete, onView }: FileListProps) {
  if (files.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        アップロードされたファイルはありません
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <File className="w-5 h-5 text-indigo-600" />
              <span className="font-medium text-gray-800">{file.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onView(file)}
                className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                title="表示"
              >
                <ExternalLink className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(file.id)}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                title="削除"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            アップロード日時: {format(new Date(file.date), 'PPPp', { locale: ja })}
          </div>
        </div>
      ))}
    </div>
  );
}