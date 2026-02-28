
import React, { useState, useEffect, useRef } from 'react';
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
import SlotWinCalc from './components/modules/SlotWinCalc';
import Settings from './components/modules/Settings';
import Toast from './components/ui/Toast';
import ModuleNavigator from './components/ModuleNavigator';
import { motion, AnimatePresence } from 'framer-motion';
import { PASARAN_SCHEDULE } from './constants';

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
    [ModuleType.SLOT_WIN_CALC]: { title: 'WIN TRACKER', image: 'https://assets.codepen.io/3617690/cyberpunk-character-alt-2.png' },
  }
};

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType | 'HOME'>('HOME');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  
  // Ref untuk melacak pasaran yang sudah diberi notifikasi di menit ini agar tidak double
  const lastNotifiedRef = useRef<string>("");

  useEffect(() => {
    const savedModule = localStorage.getItem('last_module');
    if (savedModule && savedModule !== 'HOME') setActiveModule(savedModule as ModuleType);

    const savedSettings = localStorage.getItem('app_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Background Checker untuk Notifikasi Bet Close
  useEffect(() => {
    const checkBetClose = () => {
      const now = new Date();
      // Format jam saat ini ke "HH:mm WIB"
      const currentHH = String(now.getHours()).padStart(2, '0');
      const currentMM = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHH}:${currentMM} WIB`;
      
      // Jika sudah pernah notif di menit yang sama, lewati
      if (lastNotifiedRef.current === currentTimeStr) return;

      // Cari pasaran yang betClose-nya sama dengan waktu sekarang
      const closingMarkets = PASARAN_SCHEDULE.filter(p => p.betClose === currentTimeStr);
      
      if (closingMarkets.length > 0) {
        closingMarkets.forEach(market => {
          showToast(`⚠️ ${market.name} BET CLOSE SEKARANG!`, 'error');
        });
        // Tandai menit ini sudah diberi notifikasi
        lastNotifiedRef.current = currentTimeStr;
      }
    };

    const timer = setInterval(checkBetClose, 30000); // Cek setiap 30 detik
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    document.body.style.fontFamily = settings.fontFamily;
    
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem('app_settings', JSON.stringify(newSettings));
    showToast('Settings saved successfully');
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000); // 5 detik agar operator sempat baca
  };

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModule}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {(() => {
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
              case ModuleType.SLOT_WIN_CALC: return <SlotWinCalc showToast={showToast} />;
              case ModuleType.SETTINGS: return <Settings settings={settings} onUpdate={updateSettings} />;
              default: return <ModuleNavigator onSelectModule={handleModuleChange} settings={settings} />;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#050505]">
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.15] mix-blend-screen pointer-events-none transition-all duration-1000 z-0"
        style={{ backgroundImage: `url(${settings.bgImage})` }}
      ></div>

      {/* Overlays */}
      <div className="fixed inset-0 bg-scanline pointer-events-none z-[1] opacity-20"></div>
      
      {/* Navbar Integration */}
      <Navbar 
        activeModule={activeModule} 
        onModuleChange={handleModuleChange}
        primaryColor={settings.primaryColor}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          {renderContent()}
        </div>
      </main>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <footer className="relative z-10 p-6 text-center border-t border-white/5 bg-black/80">
        <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em]">
          Working Dashboard Management Console // Encrypted Node Active
        </p>
      </footer>
    </div>
  );
};

export default App;
