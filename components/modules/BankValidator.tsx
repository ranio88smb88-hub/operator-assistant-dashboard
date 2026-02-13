
import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, CreditCard } from 'lucide-react';
import { BANK_PREFIXES } from '../../constants';

interface Props {
  showToast: (msg: string) => void;
}

const BankValidator: React.FC<Props> = ({ showToast }) => {
  const [account, setAccount] = useState('');
  const [validation, setValidation] = useState<{valid: boolean, bank: string} | null>(null);

  const validate = () => {
    if (account.length < 8) {
      setValidation({ valid: false, bank: 'Unknown' });
      return;
    }

    const prefix = account.substring(0, 3);
    const bank = BANK_PREFIXES[prefix] || 'Generic Bank Account';
    
    // Simulate some logic
    const isValid = account.length >= 10 && account.length <= 16;
    setValidation({ valid: isValid, bank });
  };

  const handleInput = (val: string) => {
    const cleaned = val.replace(/\D/g, '');
    setAccount(cleaned);
    setValidation(null);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="glass-card p-8 rounded-3xl space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl">
            <CreditCard className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Offline Bank Validator</h3>
            <p className="text-zinc-500 text-xs">Simulate bank verification and type detection.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input 
              value={account}
              onChange={e => handleInput(e.target.value)}
              className="w-full bg-zinc-950 border-2 border-white/5 rounded-2xl p-5 text-2xl font-mono tracking-widest outline-none focus:border-blue-500 transition-all placeholder:text-zinc-800"
              placeholder="000 000 0000"
              maxLength={16}
            />
            {account && (
              <button 
                onClick={validate}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 px-6 py-2 rounded-xl text-sm font-bold"
              >
                CHECK
              </button>
            )}
          </div>

          {validation && (
            <div className={`p-6 rounded-2xl border flex items-center space-x-4 animate-in zoom-in-95 duration-200 ${
              validation.valid ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'
            }`}>
              <div className={`p-2 rounded-lg ${validation.valid ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                {validation.valid ? <ShieldCheck className="w-5 h-5 text-white" /> : <ShieldAlert className="w-5 h-5 text-white" />}
              </div>
              <div className="flex-1">
                <div className="text-xs text-zinc-500 uppercase font-bold tracking-tighter mb-0.5">Detection Result</div>
                <div className="font-bold text-white text-lg">{validation.bank}</div>
                <div className={`text-xs font-semibold ${validation.valid ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {validation.valid ? 'NUMBER FORMAT VALIDATED' : 'INVALID ACCOUNT LENGTH / FORMAT'}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-900/50 rounded-xl border border-white/5">
            <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">Known Prefix</span>
            <div className="flex flex-wrap gap-2">
              {Object.keys(BANK_PREFIXES).map(p => (
                <span key={p} className="px-2 py-0.5 bg-white/5 rounded text-[10px] font-mono text-zinc-400">{p}</span>
              ))}
            </div>
          </div>
          <div className="p-4 bg-zinc-900/50 rounded-xl border border-white/5">
            <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">Standard Length</span>
            <span className="text-xs text-zinc-300">10 to 16 digits (Numeric)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankValidator;
