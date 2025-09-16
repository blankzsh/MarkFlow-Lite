import React, { useState, useRef, useEffect } from 'react';

const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'es', name: 'Español' },
    { code: 'pt', name: 'Português' },
    { code: 'de', name: 'Deutsch' }
  ];

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode: string) => {
    // 由于我们已移除i18n功能，这里只关闭菜单
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="p-2 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center"
        title="Switch Language"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.254-.269-.498-.546-.73-.832-.184-.227-.367-.454-.538-.687a1 1 0 01.939-1.44c.156.156.312.313.47.47.248.24.504.473.768.697.27.228.548.446.835.655.3.216.61.42.937.605.014.008.028.015.042.023a1 1 0 01-.084 1.8c-.33-.17-.65-.35-.957-.54-.31-.19-.61-.39-.9-.6-.29-.21-.57-.43-.83-.66-.27-.23-.53-.48-.78-.74-.25-.26-.49-.53-.72-.81-.23-.28-.45-.57-.66-.87-.21-.3-.4-.61-.58-.93-.18-.32-.34-.65-.49-.99-.15-.34-.28-.69-.39-1.05H4a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.902.902 0 01.024.078l.01.038c.04.15.06.3.06.45a1 1 0 01-1.8 1.44l-.02-.03-1.07-2.14H9.12l-1.07 2.14-.02.03a1 1 0 01-1.8-1.44c.04-.15.06-.3.06-.45 0-.026.002-.05.006-.074l.005-.026.01-.038 2.99-5.982A1 1 0 0113 8zm-1.382 4h2.764L13 14.764 11.618 12z" clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-lg z-20">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;