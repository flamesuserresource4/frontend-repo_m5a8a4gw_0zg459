import React, { useState } from 'react';
import { User, Lock, HelpCircle } from 'lucide-react';

const roles = [
  { label: 'User', value: 'user' },
  { label: 'Admin', value: 'admin' },
  { label: 'Super Admin', value: 'superadmin' },
];

const LoginCard = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both a username and password.');
      return;
    }

    // Mock authentication flow for demo
    onLogin({ username, role });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-cyan-300/30 via-blue-300/20 to-indigo-300/30 pointer-events-none" />
        <div className="relative">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">Welcome back</h2>
          <p className="text-slate-200/80 text-sm mt-1">
            Sign in to manage and book venues
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-slate-200/80 text-sm mb-2">Username</label>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 border border-white/20 focus-within:border-cyan-300/40 px-4 py-3">
                <User className="w-5 h-5 text-slate-200/80" />
                <input
                  type="text"
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-200/60"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-200/80 text-sm mb-2">Password</label>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 border border-white/20 focus-within:border-cyan-300/40 px-4 py-3">
                <Lock className="w-5 h-5 text-slate-200/80" />
                <input
                  type="password"
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-200/60"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-200/80 text-sm mb-2">Role</label>
              <div className="rounded-2xl bg-white/10 border border-white/20 px-4 py-3">
                <select
                  className="w-full bg-transparent text-white outline-none"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {roles.map((r) => (
                    <option className="bg-slate-900" key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div className="text-rose-200 bg-rose-500/10 border border-rose-300/30 rounded-xl px-4 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-500/90 to-blue-600/90 hover:from-cyan-400 hover:to-blue-500 transition-colors text-white font-medium py-3 shadow-lg shadow-cyan-500/20"
            >
              Log In
            </button>

            <div className="flex items-center justify-between text-sm text-slate-200/80">
              <button type="button" className="hover:text-white/90 underline underline-offset-4">
                Forgot password?
              </button>
              <button type="button" className="flex items-center gap-1 hover:text-white/90">
                <HelpCircle className="w-4 h-4" /> Help
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
