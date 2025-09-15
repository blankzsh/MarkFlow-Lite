// 连接测试功能组件
import React, { useState } from 'react';
import { cloudStorageService } from '../utils/cloud-storage-service';

interface ConnectionTesterProps {
  onTestComplete: (result: { success: boolean; message: string }) => void;
}

const ConnectionTester: React.FC<ConnectionTesterProps> = ({ onTestComplete }) => {
  const [isTesting, setIsTesting] = useState(false);

  const testConnection = async () => {
    setIsTesting(true);
    try {
      // 尝试列出根目录下的文件来测试连接
      await cloudStorageService.listFiles('/');
      onTestComplete({ 
        success: true, 
        message: '连接测试成功' 
      });
    } catch (error: any) {
      onTestComplete({ 
        success: false, 
        message: `连接测试失败: ${error.message || '未知错误'}` 
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <button
      onClick={testConnection}
      disabled={isTesting}
      className={`px-3 py-1 rounded text-sm ${
        isTesting 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700'
      } text-white`}
    >
      {isTesting ? '测试中...' : '测试连接'}
    </button>
  );
};

export default ConnectionTester;