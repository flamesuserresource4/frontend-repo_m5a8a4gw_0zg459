import React, { useMemo, useState } from 'react';
import Hero from './components/Hero';
import LoginCard from './components/LoginCard';
import AvailabilityDashboard from './components/AvailabilityDashboard';
import AdminPanel from './components/AdminPanel';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [requests, setRequests] = useState([
    {
      id: 'req-1',
      venue: 'Seminar Hall',
      date: new Date().toISOString().slice(0, 10),
      start: '10:00',
      end: '12:00',
      by: 'jane.doe',
      status: 'Pending',
      comment: '',
    },
  ]);

  const isAdmin = useMemo(() => {
    return currentUser?.role === 'admin' || currentUser?.role === 'superadmin';
  }, [currentUser]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setActiveTab('dashboard');
  };

  const addRequest = (data) => {
    const newReq = {
      id: `req-${Date.now()}`,
      venue: data.venue,
      date: data.date,
      start: data.start,
      end: data.end || '—',
      by: currentUser?.username || 'anonymous',
      status: 'Pending',
      comment: '',
    };
    setRequests((prev) => [newReq, ...prev]);
    // Success message UI is embedded in the modal component
  };

  const updateRequest = (id, changes) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, ...changes } : r)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10">
        <Hero />

        {!currentUser ? (
          <div className="mt-8">
            <LoginCard onLogin={handleLogin} />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 border border-white/20 px-4 py-2 text-slate-200/90">
                  Signed in as <span className="font-medium text-white ml-1">{currentUser.username}</span>
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-cyan-500/20 text-cyan-100 border border-cyan-300/30">
                    {currentUser.role}
                  </span>
                </div>
                <button
                  onClick={() => setCurrentUser(null)}
                  className="px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-slate-200/80 hover:bg-white/15"
                >
                  Sign out
                </button>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-2 rounded-xl border text-sm ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-500/20 border-blue-300/30 text-blue-100'
                      : 'bg-white/5 border-white/20 text-slate-200/80 hover:bg-white/10'
                  }`}
                >
                  Availability
                </button>
                {isAdmin && (
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`px-3 py-2 rounded-xl border text-sm ${
                      activeTab === 'admin'
                        ? 'bg-blue-500/20 border-blue-300/30 text-blue-100'
                        : 'bg-white/5 border-white/20 text-slate-200/80 hover:bg-white/10'
                    }`}
                  >
                    Admin Panel
                  </button>
                )}
              </div>

              {activeTab === 'dashboard' && (
                <AvailabilityDashboard currentUser={currentUser} onRequest={addRequest} />)
              }

              {activeTab === 'admin' && isAdmin && (
                <AdminPanel requests={requests} onUpdate={updateRequest} />
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl p-5">
                <h4 className="font-medium text-slate-100">Quick Tips</h4>
                <ul className="mt-3 text-sm text-slate-200/80 list-disc list-inside space-y-1">
                  <li>Tap an available slot to request a booking.</li>
                  <li>Admins can approve or reject requests with one click.</li>
                  <li>Use filters to narrow down venues and dates.</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 backdrop-blur-xl p-5">
                <h4 className="font-medium text-slate-100">Status Overview</h4>
                <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl bg-white/10 border border-white/20 p-3">
                    <div className="text-2xl font-semibold">{requests.filter(r => r.status === 'Pending').length}</div>
                    <div className="text-xs text-slate-200/80">Pending</div>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/20 p-3">
                    <div className="text-2xl font-semibold">{requests.filter(r => r.status === 'Approved').length}</div>
                    <div className="text-xs text-slate-200/80">Approved</div>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/20 p-3">
                    <div className="text-2xl font-semibold">{requests.filter(r => r.status === 'Rejected').length}</div>
                    <div className="text-xs text-slate-200/80">Rejected</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
