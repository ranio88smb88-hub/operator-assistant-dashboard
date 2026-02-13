
import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, CreditCard, UserCheck, Search, Info, RotateCcw } from 'lucide-react';

interface Props {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const BankValidator: React.FC<Props> = ({ showToast }) => {
  const [adminName, setAdminName] = useState('');
  const [validationName, setValidationName] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'VALID' | 'INVALID'>('IDLE');

  const checkValidation = () => {
    if (!adminName || !validationName) {
      showToast('Mohon lengkapi kedua kolom nama', 'error');
      return;
    }

    const a = adminName.toLowerCase().trim();
    const v = validationName.toLowerCase().trim();

    // Logika Perbandingan Masking:
    // 1. Panjang karakter harus sama (termasuk spasi)
    // 2. Setiap karakter non-'x' harus cocok dengan posisi yang sama di adminName
    // 3. Karakter 'x' dianggap wildcard yang valid untuk karakter apapun
    
    let isValid = true;

    if (a.length !== v.length) {
      isValid = false;
    } else {
      for (let i = 0; i < v.length; i++) {
        const charV = v[i];
        const charA = a[i];

        // Jika bukan 'x', maka karakter harus sama persis
        if (charV !== 'x' && charV !== charA) {
          isValid = false;
          break;
        }
      }
    }

    if (isValid) {
      setStatus('VALID');
      showToast('Data Rekening VALID', 'success');
    } else {
      setStatus('INVALID');
      showToast('Data Rekening TIDAK COCOK', 'error');
    }
  };

  const reset = () => {
    setAdminName('');
    setValidationName('');
    setStatus('IDLE');
  };

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6">
      <div className="glass-panel p-8 rounded-[40px] border border-primary-fade relative overflow-hidden">
        {/* Decorative Background Icon */}
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <CreditCard className="w-64 h-64 text-white" />
        </div>

        <div className="flex items-center space-x-4 mb-10 relative z-10">
          <div className="p-4 bg-primary-fade rounded-2xl border border-primary-fade">
            <UserCheck className="w-8 h-8 text-[var(--primary-color)]" />
          </div>
          <div>
            <h3 className="text-2xl font-black font-orbitron text-white uppercase tracking-tighter">Account Name Matcher</h3>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Secure Verification Protocol V2.1</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
              Nama Dari Admin (Full Name)
            </label>
            <input 
              value={adminName}
              onChange={e => { setAdminName(e.target.value); setStatus('IDLE'); }}
              className="w-full bg-black/60 border-2 border-white/5 rounded-2xl p-5 text-lg font-bold outline-none focus:border-blue-500 transition-all text-white placeholder:text-zinc-800"
              placeholder="CONTOH: SUSANTI SUSAN"
            />
            <p className="text-[9px] text-zinc-600 font-bold uppercase italic">Input nama lengkap sesuai data pendaftaran</p>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center">
              <span className="w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
              Nama Validasi (Masked Name)
            </label>
            <input 
              value={validationName}
              onChange={e => { setValidationName(e.target.value); setStatus('IDLE'); }}
              className="w-full bg-black/60 border-2 border-white/5 rounded-2xl p-5 text-lg font-mono outline-none focus:border-amber-500 transition-all text-white placeholder:text-zinc-800"
              placeholder="CONTOH: SUXXXXX SUXXX"
            />
            <p className="text-[9px] text-zinc-600 font-bold uppercase italic">Gunakan 'x' untuk bagian yang disensor</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row gap-4 relative z-10">
          <button 
            onClick={checkValidation}
            className="flex-1 bg-[var(--primary-color)] text-black font-black font-orbitron py-5 rounded-2xl text-sm flex items-center justify-center hover:opacity-80 transition-all shadow-[0_0_20px_rgba(0,255,0,0.2)]"
          >
            <Search className="w-5 h-5 mr-3" /> JALANKAN VALIDASI
          </button>
          <button 
            onClick={reset}
            className="px-8 bg-zinc-900 border border-white/10 text-zinc-400 font-black font-orbitron rounded-2xl hover:bg-zinc-800 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {status !== 'IDLE' && (
        <div className={`
          p-10 rounded-[40px] border-2 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95 duration-500
          ${status === 'VALID' 
            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.2)]' 
            : 'bg-rose-500/10 border-rose-500/60 text-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.3)] animate-pulse'
          }
        `}>
          <div className={`p-6 rounded-full ${status === 'VALID' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
            {status === 'VALID' ? (
              <ShieldCheck className="w-16 h-16 text-black" />
            ) : (
              <ShieldAlert className="w-16 h-16 text-white" />
            )}
          </div>
          <div>
            <div className="text-5xl font-black font-orbitron tracking-tighter uppercase mb-2">
              {status === 'VALID' ? 'ACC VERIFIED' : 'MATCH FAILED'}
            </div>
            <p className={`text-xs font-black uppercase tracking-[0.4em] ${status === 'VALID' ? 'text-emerald-500/60' : 'text-rose-500/60'}`}>
              {status === 'VALID' ? 'Semua parameter nama sesuai' : 'Karakter atau panjang nama tidak cocok'}
            </p>
          </div>
        </div>
      )}

      <div className="p-6 rounded-3xl border border-white/5 bg-black/20">
        <div className="flex items-start space-x-4">
          <Info className="w-5 h-5 text-zinc-500 mt-1" />
          <div className="space-y-2">
            <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Aturan Validasi Nama:</h4>
            <ul className="text-[10px] text-zinc-600 space-y-1 font-bold">
              <li>• PANJANG KARAKTER HARUS SAMA PERSIS (TERMASUK SPASI).</li>
              <li>• GUNAKAN HURUF KECIL 'x' UNTUK KARAKTER YANG DISENSOR.</li>
              <li>• KARAKTER YANG TIDAK DISENSOR HARUS COCOK DENGAN POSISI DI NAMA ADMIN.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankValidator;
