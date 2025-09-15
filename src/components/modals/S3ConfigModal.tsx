import React, { useState } from 'react';
import ConnectionTester from '../ConnectionTester';
import { cloudStorageService } from '../../utils/cloud-storage-service';

interface S3ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucket: string;
  }) => void;
}

const S3ConfigModal: React.FC<S3ConfigModalProps> = ({ isOpen, onClose, onSave }) => {
  const [accessKeyId, setAccessKeyId] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [region, setRegion] = useState('');
  const [bucket, setBucket] = useState('');
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ accessKeyId, secretAccessKey, region, bucket });
  };

  const handleTestComplete = (result: { success: boolean; message: string }) => {
    setTestResult(result);
  };

  const handleTestConnection = async () => {
    setTestResult(null);
    try {
      const result = await cloudStorageService.connectToS3({
        accessKeyId,
        secretAccessKey,
        region,
        bucket
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">S3 连接配置</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Access Key ID
            </label>
            <input
              type="password"
              value={accessKeyId}
              onChange={(e) => setAccessKeyId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Secret Access Key
            </label>
            <input
              type="password"
              value={secretAccessKey}
              onChange={(e) => setSecretAccessKey(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              区域 (Region)
            </label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="例如: us-west-1"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              存储桶 (Bucket)
            </label>
            <input
              type="text"
              value={bucket}
              onChange={(e) => setBucket(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="例如: my-markdown-bucket"
              required
            />
          </div>
          
          {testResult && (
            <div className={`mb-4 p-2 rounded text-sm ${
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
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              保存配置
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default S3ConfigModal;