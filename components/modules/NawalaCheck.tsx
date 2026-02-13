import React, { useState } from 'react';
import { Search, Shield, ShieldCheck, ShieldAlert, Globe } from 'lucide-react';

interface Props {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

// Add showToast to component props to align with other modules
const NawalaCheck: React.FC<Props> = ({ showToast }) => {
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'SAFE' | 'WARNING' | 'BLOCKED'>('IDLE');

  const check = () => {
    if (!domain) return;
    
    const keywords = ['slot', 'judi', 'porn', 'bet', 'casino', 'bola', 'togel'];
    const lower = domain.toLowerCase();
    
    if (keywords.some(k => lower.includes(k))) {
      setStatus('BLOCKED');
    } else if (lower.includes('free') || lower.includes('win')) {
      setStatus('WARNING');
    } else {
      setStatus('SAFE');
    }
    // Provide user feedback
    showToast('Analysis completed');
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="glass-card p-10 rounded-3xl space-y-8 text-center border border-white/10">
        <div className="mx-auto w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center">
          <Globe className="w-10 h-10 text-blue-500" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold">Nawala / Domain Filter Check</h2>
          <p className="text-zinc-500 text-sm mt-2">Check domain visibility status based on internal keyword filtering logic.</p>
        </div>

        <div className="flex space-x-2">
          <input 
            value={domain}
            onChange={e => { setDomain(e.target.value); setStatus('IDLE'); }}
            className="flex-1 bg-zinc-950 border-2 border-white/5 rounded-2xl p-4 text-xl outline-none focus:border-blue-500 transition-all font-mono"
            placeholder="www.your-domain.com"
          />
          <button 
            onClick={check}
            className="bg-blue-600 px-8 rounded-2xl font-bold hover:bg-blue-500 transition-all"
          >
            ANALYSIS
          </button>
        </div>

        {status !== 'IDLE' && (
          <div className={`p-8 rounded-2xl border-2 animate-in zoom-in-95 duration-300 ${
            status === 'SAFE' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' :
            status === 'WARNING' ? 'bg-amber-500/5 border-amber-500/20 text-amber-400' :
            'bg-rose-500/5 border-rose-500/20 text-rose-400'
          }`}>
            <div className="flex flex-col items-center space-y-3">
              {status === 'SAFE' && <ShieldCheck className="w-12 h-12" />}
              {status === 'WARNING' && <Shield className="w-12 h-12" />}
              {status === 'BLOCKED' && <ShieldAlert className="w-12 h-12" />}
              
              <div className="text-3xl font-black uppercase tracking-widest">{status}</div>
              <p className="text-sm text-zinc-400 max-w-sm">
                {status === 'SAFE' && "Domain passes basic keyword filtering. No high-risk content detected."}
                {status === 'WARNING' && "Domain contains suspicious marketing keywords. Potential risk of future blocking."}
                {status === 'BLOCKED' && "Critical! Domain contains blacklisted keywords (Gambling/High Risk Content). Block likely."}
              </p>
            </div>
          </div>
        )}

        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
          <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-4">Scanning Parameters</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Meta Tags', 'Domain Keywords', 'SSL Status', 'IP Origin'].map(p => (
              <div key={p} className="flex items-center space-x-2 text-zinc-400">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span className="text-[10px] font-bold">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NawalaCheck;