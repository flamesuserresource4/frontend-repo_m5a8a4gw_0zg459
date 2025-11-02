import React, { useMemo, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const AdminPanel = ({ requests = [], onUpdate }) => {
  const [filter, setFilter] = useState('Pending');

  const filtered = useMemo(() => {
    if (filter === 'All') return requests;
    return requests.filter((r) => r.status === filter);
  }, [requests, filter]);

  const handleAction = (id, status, comment) => {
    onUpdate?.(id, { status, comment });
  };

  return (
    <div className="rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl p-4 sm:p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-100">Admin Review Panel</h3>
        <div className="flex items-center gap-2">
          {['All', 'Pending', 'Approved', 'Rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl border text-sm transition-colors ${
                filter === f
                  ? 'bg-cyan-500/20 border-cyan-300/30 text-cyan-100'
                  : 'bg-white/5 border-white/20 text-slate-200/80 hover:bg-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {filtered.length === 0 && (
          <div className="col-span-full text-slate-200/80 text-sm">
            No requests in this view.
          </div>
        )}
        {filtered.map((req) => (
          <div key={req.id} className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-100 font-medium">{req.venue}</div>
                <div className="text-slate-200/80 text-sm">{req.date} • {req.start} - {req.end}</div>
                <div className="text-slate-200/70 text-xs mt-1">Requested by {req.by}</div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs border ${
                req.status === 'Approved' ? 'bg-emerald-500/15 border-emerald-300/30 text-emerald-200' :
                req.status === 'Rejected' ? 'bg-rose-500/15 border-rose-300/30 text-rose-200' :
                'bg-amber-500/15 border-amber-300/30 text-amber-200'
              }`}>
                {req.status}
              </span>
            </div>

            {req.status === 'Pending' && (
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => handleAction(req.id, 'Approved', 'Approved – event confirmed')}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-100 border border-emerald-300/30 hover:bg-emerald-500/30"
                >
                  <CheckCircle className="w-4 h-4" /> Approve
                </button>
                <button
                  onClick={() => handleAction(req.id, 'Rejected', 'Conflicts with another booking')}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-500/20 text-rose-100 border border-rose-300/30 hover:bg-rose-500/30"
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </div>
            )}

            {req.comment && (
              <div className="mt-3 text-xs text-slate-200/80">{req.comment}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
