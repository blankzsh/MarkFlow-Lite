import React, { useState } from 'react';

interface FileNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (filename: string) => void;
  title: string;
  placeholder: string;
}

const FileNameModal: React.FC<FileNameModalProps> = ({ isOpen, onClose, onSave, title, placeholder }) => {
  const [filename, setFilename] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filename.trim()) {
      onSave(filename.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-96 animate-scaleIn">
        <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              文件名
            </label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={placeholder}
              autoFocus
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              确定
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileNameModal;