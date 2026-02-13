import React from 'react';
import { PASARAN_SCHEDULE } from '../../constants';
import { Clock, Info } from 'lucide-react';

interface Props {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

// Add showToast to component props to align with other modules
const PasaranSchedule: React.FC<Props> = ({ showToast }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold">Pasaran Schedule</h3>
          <p className="text-zinc-500 text-sm">Real-time daily market opening and closing hours.</p>
        </div>
        <div className="flex items-center text-xs text-zinc-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          <Info className="w-3 h-3 mr-2" /> All times in GMT+7
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/5">
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Pasaran Name</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest text-center">Close Time</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest text-center">Result Time</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Schedule</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {PASARAN_SCHEDULE.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 font-semibold text-zinc-200">{p.name}</td>
                <td className="px-6 py-4 text-center text-rose-400 font-mono text-sm">{p.close}</td>
                <td className="px-6 py-4 text-center text-emerald-400 font-mono text-sm">{p.open}</td>
                <td className="px-6 py-4 text-sm text-zinc-500 italic">{p.result}</td>
                <td className="px-6 py-4 text-right">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-tighter border border-emerald-500/20">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Asia Markets', icon: Clock, val: '5 Active' },
          { label: 'Europe Markets', icon: Clock, val: '2 Active' },
          { label: 'Special Draw', icon: Clock, val: 'Weekend' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4 rounded-xl flex items-center justify-between border border-white/5">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <stat.icon className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-sm font-medium text-zinc-400">{stat.label}</span>
            </div>
            <span className="text-sm font-bold text-zinc-100">{stat.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasaranSchedule;