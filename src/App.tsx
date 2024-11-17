import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { MemoInput } from './components/MemoInput';
import { MemoList } from './components/MemoList';
import { DatePicker } from './components/DatePicker';
import { FileUploader } from './components/FileUploader';
import { FileList } from './components/FileList';
import { FileViewer } from './components/FileViewer';
import { startOfDay, isEqual } from 'date-fns';

interface Memo {
  id: string;
  content: string;
  date: string;
}

interface TextFile {
  id: string;
  name: string;
  content: string;
  date: string;
}

function App() {
  const [memos, setMemos] = useState<Memo[]>(() => {
    const saved = localStorage.getItem('memos');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [files, setFiles] = useState<TextFile[]>(() => {
    const saved = localStorage.getItem('textFiles');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedFile, setSelectedFile] = useState<TextFile | null>(null);
  const [activeTab, setActiveTab] = useState<'memos' | 'files'>('memos');

  useEffect(() => {
    localStorage.setItem('memos', JSON.stringify(memos));
  }, [memos]);

  useEffect(() => {
    localStorage.setItem('textFiles', JSON.stringify(files));
  }, [files]);

  const addMemo = (content: string) => {
    const memo = {
      id: Date.now().toString(),
      content,
      date: new Date().toISOString(),
    };
    setMemos([memo, ...memos]);
  };

  const deleteMemo = (id: string) => {
    setMemos(memos.filter(memo => memo.id !== id));
  };

  const handleFileUpload = (fileData: Omit<TextFile, 'id'>) => {
    const newFile = {
      ...fileData,
      id: Date.now().toString(),
    };
    setFiles([newFile, ...files]);
  };

  const deleteFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const handleAddLinesToMemos = (lines: string[]) => {
    const newMemos = lines.map(content => ({
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      content,
      date: new Date().toISOString(),
    }));
    setMemos(prevMemos => [...newMemos, ...prevMemos]);
    setActiveTab('memos'); // メモタブに自動で切り替え
  };

  const filteredMemos = memos.filter(memo => {
    const matchesSearch = searchTerm.trim() === '' || 
      searchTerm
        .toLowerCase()
        .split(/\s+/)
        .every(term => 
          memo.content.toLowerCase().includes(term)
        );
    
    const matchesDate = selectedDate
      ? isEqual(
          startOfDay(new Date(memo.date)),
          startOfDay(selectedDate)
        )
      : true;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          メモ帳
        </h1>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('memos')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'memos'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-indigo-50'
            }`}
          >
            メモ
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'files'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-indigo-50'
            }`}
          >
            ファイル
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'memos' ? (
              <>
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
                <MemoInput onAdd={addMemo} />
                <MemoList memos={filteredMemos} onDelete={deleteMemo} />
              </>
            ) : (
              <>
                <FileUploader
                  onFileUpload={handleFileUpload}
                  onAddLinesToMemos={handleAddLinesToMemos}
                />
                <FileList
                  files={files}
                  onDelete={deleteFile}
                  onView={setSelectedFile}
                />
              </>
            )}
          </div>
          
          {activeTab === 'memos' && (
            <div className="lg:col-span-1">
              <DatePicker
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
            </div>
          )}
        </div>
      </div>

      <FileViewer
        file={selectedFile}
        onClose={() => setSelectedFile(null)}
      />
    </div>
  );
}

export default App;