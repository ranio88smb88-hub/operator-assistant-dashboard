
import React, { useMemo } from 'react';
import { ZODIAC_ANIMALS, LUNAR_NEW_YEARS } from '../../constants';
import { Info, Calendar } from 'lucide-react';

export default function ShioReference({ showToast }: {
  showToast: (message: string, type?: 'success' | 'error') => void;
}) {
  const currentData = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    // Find current lunar year
    let currentLunar = LUNAR_NEW_YEARS[0];
    for (let i = LUNAR_NEW_YEARS.length - 1; i >= 0; i--) {
      if (todayStr >= LUNAR_NEW_YEARS[i].date) {
        currentLunar = LUNAR_NEW_YEARS[i];
        break;
      }
    }

    // Togel Shio Order is Reverse Zodiac
    // Current year shio is the anchor (index 0 for numbers 00, 12, 24...)
    const reversedZodiac = [...ZODIAC_ANIMALS].reverse();
    const anchorIndex = reversedZodiac.indexOf(currentLunar.animal);
    
    // Shift the list so current lunar animal is at the top
    const shiftedZodiac = [
      ...reversedZodiac.slice(anchorIndex),
      ...reversedZodiac.slice(0, anchorIndex)
    ];

    return {
      year: currentLunar.year,
      animal: currentLunar.animal,
      list: shiftedZodiac
    };
  }, []);

  const getNumbersForIndex = (index: number) => {
    const nums = [];
    for (let i = index; i <= 99; i += 12) {
      nums.push(i.toString().padStart(2, '0'));
    }
    return nums;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black font-orbitron text-white uppercase tracking-tighter">
            Shio Reference Table
          </h3>
          <div className="flex items-center mt-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <Calendar className="w-3 h-3 mr-2 text-[var(--primary-color)]" />
            Current Cycle: <span className="text-[var(--primary-color)] ml-1">{currentData.animal} {currentData.year}</span>
          </div>
        </div>
        <div className="bg-primary-fade border border-primary-fade px-4 py-2 rounded-xl">
           <p className="text-[9px] font-black text-zinc-400 uppercase leading-tight">
             Sistem terupdate otomatis<br/>setiap Tahun Baru Imlek
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentData.list.map((shio, i) => {
          const numbers = getNumbersForIndex(i);
          const isCurrent = shio === currentData.animal;

          return (
            <div 
              key={shio} 
              className={`glass-panel p-5 rounded-3xl border transition-all duration-500 group ${
                isCurrent ? 'border-[var(--primary-color)] bg-primary-fade' : 'border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className={`text-lg font-black font-orbitron tracking-tighter ${isCurrent ? 'text-[var(--primary-color)]' : 'text-white'}`}>
                    {shio}
                  </h4>
                  {isCurrent && (
                    <span className="text-[8px] font-black uppercase tracking-widest text-[var(--primary-color)] animate-pulse">
                      Active Zodiac
                    </span>
                  )}
                </div>
                <div className="w-8 h-8 rounded-full bg-black/40 border border-white/5 flex items-center justify-center text-[10px] font-black text-zinc-500 group-hover:text-[var(--primary-color)] transition-colors">
                  {i.toString().padStart(2, '0')}
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {numbers.map(num => (
                  <div 
                    key={num} 
                    className={`py-2 rounded-lg text-center font-mono text-xs font-bold transition-all ${
                      isCurrent 
                        ? 'bg-[var(--primary-color)] text-black shadow-[0_0_10px_rgba(0,255,0,0.3)]' 
                        : 'bg-black/40 text-zinc-400 group-hover:text-zinc-200'
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-3xl border border-white/5 bg-zinc-900/30">
        <div className="flex items-start space-x-4">
          <Info className="w-5 h-5 text-zinc-500 mt-1" />
          <p className="text-xs text-zinc-500 leading-relaxed italic">
            Tabel di atas menggunakan perhitungan Shio mundur (Reverse Zodiac) yang disesuaikan dengan transisi Tahun Baru Imlek. 
            Shio tahun berjalan (saat ini: {currentData.animal}) otomatis menempati urutan pertama dengan angka index 00. 
            Seluruh data akan bergeser secara otomatis pada tanggal Imlek berikutnya.
          </p>
        </div>
      </div>
    </div>
  );
}
