
import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, CreditCard } from 'lucide-react';
import { BANK_PREFIXES } from '../../constants';

interface Props {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const BankValidator: React.FC<Props> = ({ showToast }) => {
  const [account, setAccount] = useState('');
  const [validation, setValidation] = useState<{valid: boolean, bank: string} | null>(null);

  const validate = () => {
    if (account.length < 8) {
      setValidation({ valid: false, bank: 'Unknown' });
      showToast('Invalid account length', 'error');
      return;
    }

    const prefix = account.substring(0, 3);
    const bank = BANK_PREFIXES[prefix] || 'Generic Bank Account';
    
    const isValid = account.length >= 10 && account.length <= 16;
    setValidation({ valid: isValid, bank });
    
    if (isValid) {
      showToast('Account validated successfully', 'success');
    } else {
      showToast('Format mismatch detected', 'error');
    }
  };

  const handleInput = (val: string) => {
    const cleaned = val.replace(/\D/g, '');
    setAccount(cleaned);
    setValidation(null);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="glass-panel p-8 rounded-3xl space-y-6 border border-[#0f0]/20">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl">
            <CreditCard className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-orbitron text-white uppercase">Bank Validator</h3>
            <p className="text-zinc-500 text-[10px] tracking-widest uppercase">Offline Protocol Verification</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input 
              value={account}
              onChange={e => handleInput(e.target.value)}
              className="w-full bg-black border-2 border-white/5 rounded-2xl p-5 text-2xl font-mono tracking-widest outline-none focus:border-[#0f0] transition-all placeholder:text-zinc-800 text-white"
              placeholder="000 000 0000"
              maxLength={16}
            />
            {account && (
              <button 
                onClick={validate}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#0f0] text-black px-6 py-2 rounded-xl text-xs font-black font-orbitron hover:bg-white transition-colors"
              >
                EXECUTE
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
                <div className="text-[9px] text-zinc-500 uppercase font-black tracking-[0.2em] mb-0.5">System Analysis Result</div>
                <div className="font-bold text-white text-lg font-orbitron">{validation.bank}</div>
                <div className={`text-[10px] font-black tracking-widest ${validation.valid ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {validation.valid ? 'STATUS: VALIDATED' : 'STATUS: FORMAT ERROR'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BankValidator;
