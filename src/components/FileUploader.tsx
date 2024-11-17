import React, { useRef } from 'react';
import { Upload, List } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (file: { name: string; content: string; date: string }) => void;
  onAddLinesToMemos: (lines: string[]) => void;
}

export function FileUploader({ onFileUpload, onAddLinesToMemos }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.name.endsWith('.txt')) {
      alert('txtファイルのみアップロード可能です。');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onFileUpload({
        name: file.name,
        content,
        date: new Date().toISOString()
      });
    };
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddAsMemos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.name.endsWith('.txt')) {
      alert('txtファイルのみアップロード可能です。');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const lines = content.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      onAddLinesToMemos(lines);
    };
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <input
        type="file"
        accept=".txt"
        onChange={handleAddAsMemos}
        className="hidden"
        id="file-to-memos"
      />
      <label
        htmlFor="file-upload"
        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors cursor-pointer"
      >
        <Upload className="w-5 h-5" />
        txtファイルをアップロード
      </label>
      <label
        htmlFor="file-to-memos"
        className="flex items-center gap-2 px-6 py-3 bg-white border border-indigo-600 text-indigo-600 rounded-lg shadow-sm hover:bg-indigo-50 transition-colors cursor-pointer"
      >
        <List className="w-5 h-5" />
        メモとして追加
      </label>
    </div>
  );
}