
import React, { useState, useEffect } from 'react';
import { ModuleType } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
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
import Toast from './components/ui/Toast';
import ModuleNavigator from './components/ModuleNavigator';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType | 'HOME'>('HOME');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('last_module');
    if (saved && saved !== 'HOME') setActiveModule(saved as ModuleType);
  }, []);

  const handleModuleChange = (module: ModuleType | 'HOME') => {
    setActiveModule(module);
    if (module !== 'HOME') {
      localStorage.setItem('last_module', module);
    }
    setIsSidebarOpen(false);
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const renderContent = () => {
    if (activeModule === 'HOME') {
      return <ModuleNavigator onSelectModule={handleModuleChange} />;
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
      default: return <ModuleNavigator onSelectModule={handleModuleChange} />;
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#050505]">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-lighten pointer-events-none bg-[url('https://assets.codepen.io/3617690/cyberpunk-bg.png')]"></div>
      
      <div className="relative z-10 flex h-full">
        {/* Sidebar */}
        <Sidebar 
          activeModule={activeModule} 
          onModuleChange={handleModuleChange} 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <Header 
            activeModule={activeModule} 
            onToggleMenu={() => setIsSidebarOpen(!isSidebarOpen)} 
            onGoHome={() => handleModuleChange('HOME')}
          />
          
          <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
            <div className="max-w-7xl mx-auto h-full">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default App;
