
import React, { useState, useEffect } from 'react';
import { ModuleType, AppSettings } from './types';
import Navbar from './components/Navbar';
import FootballPrediction from './components/modules/FootballPrediction';
import TogelPrediction from './components/modules/TogelPrediction';
import SyairHoki from './components/modules/SyairHoki';
import BankValidator from './components/modules/BankValidator';
import PasaranSchedule from './components/modules/PasaranSchedule';
import TogelPrizeCalc from './components/modules/TogelPrizeCalc';
import TogelCalculator from './components/modules/TogelCalculator';
import FootballBetCalc from './components/modules/FootballBetCalc';
import TogelResultViewer from './components/modules/TogelResultViewer';
import NawalaCheck from './components/modules/NawalaCheck';
import ShioReference from './components/modules/ShioReference';
import Settings from './components/modules/Settings';
import Toast from './components/ui/Toast';
import ModuleNavigator from './components/ModuleNavigator';

const DEFAULT_SETTINGS: AppSettings = {
  primaryColor: '#00ff00',
  bgImage: 'https://assets.codepen.io/3617690/cyberpunk-bg.png',
  fontFamily: "'Orbitron', sans-serif",
  fontSize: '14px',
  tableHeaderBg: 'rgba(255, 255, 255, 0.05)',
  tableRowBg: 'transparent',
  tableTextColor: '#e4e4e7',
  sliders: {
    [ModuleType.FOOTBALL_PRED]: { title: 'FOOTBALL OPS', image: 'https://assets.codepen.io/3617690/cyberpunk-character-alt-1.png' },
    [ModuleType.TOGEL_PRED]: { title: 'NUMEROLOGY', image: 'https://assets.codepen.io/3617690/cyberpunk-character-alt-2.png' },
    [ModuleType.BANK_VALIDATOR]: { title: 'GATEWAY CHECK', image: 'https://assets.codepen.io/3617690/cyberpunk-character-alt-3.png' },
    [ModuleType.SYAIR_HOKI]: { title: 'ORACLE SYAIR', image: 'https://assets.codepen.io/3617690/cyberpunk-character-alt-4.png' },
    [ModuleType.NAWALA_CHECK]: { title: 'FIREWALL SCAN', image: 'https://assets.codepen.io/3617690/cyberpunk-character-alt-5.png' },
    [ModuleType.PASARAN_SCHEDULE]: { title: 'MARKET TIMES', image: 'https://assets.codepen.io/3617690/cyberpunk-character-alt-1.png' },
  }
};

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType | 'HOME'>('HOME');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const savedModule = localStorage.getItem('last_module');
    if (savedModule && savedModule !== 'HOME') setActiveModule(savedModule as ModuleType);

    const savedSettings = localStorage.getItem('app_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    // Apply dynamic CSS variables
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    document.body.style.fontFamily = settings.fontFamily;
    document.body.style.fontSize = settings.fontSize;
    
    // Custom Table Styles injection
    const styleTagId = 'dynamic-app-styles';
    let styleTag = document.getElementById(styleTagId);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleTagId;
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = `
      .neon-text-primary { text-shadow: 0 0 10px ${settings.primaryColor}88; color: ${settings.primaryColor}; }
      .neon-border-primary { border-color: ${settings.primaryColor}; box-shadow: 0 0 10px ${settings.primaryColor}44; }
      table thead tr { background-color: ${settings.tableHeaderBg} !important; }
      table tbody tr { background-color: ${settings.tableRowBg} !important; color: ${settings.tableTextColor} !important; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background: ${settings.primaryColor} !important; }
      .bg-primary-fade { background-color: ${settings.primaryColor}11; }
      .border-primary-fade { border-color: ${settings.primaryColor}33; }
    `;
  }, [settings]);

  const handleModuleChange = (module: ModuleType | 'HOME') => {
    setActiveModule(module);
    if (module !== 'HOME') {
      localStorage.setItem('last_module', module);
    }
    // Scroll to top on module change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem('app_settings', JSON.stringify(newSettings));
    showToast('Settings saved successfully');
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const renderContent = () => {
    if (activeModule === 'HOME') {
      return <ModuleNavigator onSelectModule={handleModuleChange} settings={settings} />;
    }

    switch (activeModule) {
      case ModuleType.FOOTBALL_PRED: return <FootballPrediction showToast={showToast} />;
      case ModuleType.TOGEL_PRED: return <TogelPrediction showToast={showToast} />;
      case ModuleType.SYAIR_HOKI: return <SyairHoki showToast={showToast} />;
      case ModuleType.BANK_VALIDATOR: return <BankValidator showToast={showToast} />;
      case ModuleType.PASARAN_SCHEDULE: return <PasaranSchedule showToast={showToast} />;
      case ModuleType.PRIZE_CALC: return <TogelPrizeCalc showToast={showToast} />;
      case ModuleType.TOGEL_CALC: return <TogelCalculator showToast={showToast} />;
      case ModuleType.FOOTBALL_CALC: return <FootballBetCalc showToast={showToast} />;
      case ModuleType.RESULT_VIEWER: return <TogelResultViewer showToast={showToast} />;
      case ModuleType.NAWALA_CHECK: return <NawalaCheck showToast={showToast} />;
      case ModuleType.SHIO_REF: return <ShioReference showToast={showToast} />;
      case ModuleType.SETTINGS: return <Settings settings={settings} onUpdate={updateSettings} />;
      default: return <ModuleNavigator onSelectModule={handleModuleChange} settings={settings} />;
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#050505]">
      {/* Background Layer */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-lighten pointer-events-none transition-all duration-1000 z-0"
        style={{ backgroundImage: `url(${settings.bgImage})` }}
      ></div>
      
      {/* Navbar Integration */}
      <Navbar 
        activeModule={activeModule} 
        onModuleChange={handleModuleChange}
        primaryColor={settings.primaryColor}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 overflow-x-hidden p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto h-full">
          {renderContent()}
        </div>
      </main>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* Simple Footer */}
      <footer className="relative z-10 p-6 text-center border-t border-white/5 bg-black/40">
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">
          Cyber-Ops Management Console // Locally Encrypted Protocol
        </p>
      </footer>
    </div>
  );
};

export default App;
