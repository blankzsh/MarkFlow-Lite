import React, { useState } from 'react';
import ConnectionTester from '../ConnectionTester';
import { cloudStorageService } from '../../utils/cloud-storage-service';

interface WebDAVConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: {
    url: string;
    username: string;
    password: string;
  }) => void;
}

const WebDAVConfigModal: React.FC<WebDAVConfigModalProps> = ({ isOpen, onClose, onSave }) => {
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ url, username, password });
  };

  const handleTestComplete = (result: { success: boolean; message: string }) => {
    setTestResult(result);
  };

  const handleTestConnection = async () => {
    setTestResult(null);
    try {
      const result = await cloudStorageService.connectToWebDAV({
        url,
        username,
        password
      });
      
      setTestResult(result);
    } catch (error: any) {
      setTestResult({ 
        success: false, 
        message: `连接测试失败: ${error.message || '未知错误'}` 
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-96 animate-scaleIn">
        <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">WebDAV 连接配置</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              服务器地址
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="例如: https://webdav.example.com"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              用户名
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          {testResult && (
            <div className={`mb-4 p-2 rounded text-sm transition-all duration-300 ${
              testResult.success 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {testResult.message}
            </div>
          )}
          
          <div className="flex justify-between items-center mb-4">
            <ConnectionTester onTestComplete={handleTestComplete} />
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
              保存配置
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WebDAVConfigModal;