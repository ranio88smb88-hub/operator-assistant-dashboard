
import React, { useMemo } from 'react';
import { ZODIAC_ANIMALS, LUNAR_NEW_YEARS } from '../../constants';
import { Info, Calendar } from 'lucide-react';

export default function ShioReference({ showToast }: {
  showToast: (message: string, type?: 'success' | 'error') => void;
}) {
  const currentData = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    // Temukan shio tahun lunar saat ini berdasarkan tanggal imlek
    let currentLunar = LUNAR_NEW_YEARS[0];
    for (let i = LUNAR_NEW_YEARS.length - 1; i >= 0; i--) {
      if (todayStr >= LUNAR_NEW_YEARS[i].date) {
        currentLunar = LUNAR_NEW_YEARS[i];
        break;
      }
    }

    // Urutan Shio Togel adalah Reverse Zodiac (Mundur)
    // Shio tahun ini selalu mendapatkan index 0 (angka 00, 12, 24...)
    const reversedZodiac = [...ZODIAC_ANIMALS].reverse();
    const anchorIndex = reversedZodiac.indexOf(currentLunar.animal);
    
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
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-4xl font-black font-orbitron text-white uppercase tracking-tighter">
            SHIO REFERENCE
          </h3>
          <div className="flex items-center text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">
            <Calendar className="w-3 h-3 mr-2 text-[var(--primary-color)]" />
            Active Cycle: <span className="text-[var(--primary-color)] ml-2">{currentData.animal} // {currentData.year}</span>
          </div>
        </div>
        <div className="bg-primary-fade border border-primary-fade px-6 py-4 rounded-[30px] backdrop-blur-xl">
           <p className="text-[10px] font-black text-zinc-400 uppercase leading-relaxed tracking-wider">
             Sistem terupdate otomatis<br/>sesuai kalender imlek
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentData.list.map((shio, i) => {
          const numbers = getNumbersForIndex(i);
          const isCurrent = shio === currentData.animal;

          return (
            <div 
              key={shio} 
              className={`glass-panel p-6 rounded-[40px] border transition-all duration-700 group hover:scale-[1.02] ${
                isCurrent ? 'border-[var(--primary-color)] bg-primary-fade shadow-[0_0_30px_rgba(0,255,0,0.1)]' : 'border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className={`text-xl font-black font-orbitron tracking-tighter ${isCurrent ? 'text-[var(--primary-color)] neon-text-primary' : 'text-zinc-400'}`}>
                    {shio}
                  </h4>
                  {isCurrent && (
                    <div className="w-12 h-1 bg-[var(--primary-color)] mt-1 rounded-full animate-pulse"></div>
                  )}
                </div>
                <div className="w-10 h-10 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center text-[11px] font-black text-zinc-600 group-hover:text-[var(--primary-color)] transition-colors">
                  {i.toString().padStart(2, '0')}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {numbers.map(num => (
                  <div 
                    key={num} 
                    className={`py-3 rounded-2xl text-center font-mono text-xs font-black transition-all duration-300 ${
                      isCurrent 
                        ? 'bg-[var(--primary-color)] text-black shadow-lg' 
                        : 'bg-black/40 text-zinc-500 border border-white/5 group-hover:text-zinc-300 group-hover:border-white/20'
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

      <div className="glass-panel p-8 rounded-[40px] border border-white/5 bg-zinc-950/40">
        <div className="flex items-start space-x-6">
          <div className="p-3 bg-zinc-900 rounded-2xl border border-white/10">
            <Info className="w-6 h-6 text-zinc-600" />
          </div>
          <div className="space-y-2">
            <p className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">Protocol Information:</p>
            <p className="text-xs text-zinc-600 leading-relaxed font-bold italic">
              Angka Shio dalam tabel di atas dihitung menggunakan algoritma "Reverse Zodiac" yang umum digunakan dalam kalkulasi angka keberuntungan. 
              Setiap kali memasuki Tahun Baru Imlek, Shio tahun tersebut otomatis menempati index 00 dan menggeser seluruh urutan secara matematis. 
              Sistem ini berjalan 100% offline berdasarkan waktu lokal perangkat Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
