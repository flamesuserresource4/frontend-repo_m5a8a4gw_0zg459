import React, { useState } from 'react';

const BookingModal = ({ open, onClose, slot, onSubmit }) => {
  const [form, setForm] = useState({
    venue: slot?.venue || '',
    date: slot?.date || '',
    start: slot?.start || '',
    end: slot?.end || '',
    purpose: '',
    notes: '',
  });

  React.useEffect(() => {
    if (slot) {
      setForm((prev) => ({
        ...prev,
        venue: slot.venue,
        date: slot.date,
        start: slot.start,
        end: slot.end,
      }));
    }
  }, [slot]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.start || !form.end) return;
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-slate-900/60 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
        <h3 className="text-xl font-semibold text-white">Request Booking</h3>
        <p className="text-slate-200/80 text-sm mt-1">Fill in the details below</p>

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-slate-200/80 text-sm mb-2">Venue Name</label>
            <input name="venue" value={form.venue} onChange={handleChange} className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <label className="block text-slate-200/80 text-sm mb-2">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <label className="block text-slate-200/80 text-sm mb-2">Start Time</label>
            <input type="time" name="start" value={form.start} onChange={handleChange} className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <label className="block text-slate-200/80 text-sm mb-2">End Time</label>
            <input type="time" name="end" value={form.end} onChange={handleChange} className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white outline-none" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-slate-200/80 text-sm mb-2">Purpose</label>
            <input name="purpose" value={form.purpose} onChange={handleChange} placeholder="e.g., Workshop, Meeting" className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white outline-none placeholder:text-slate-200/60" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-slate-200/80 text-sm mb-2">Additional Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white outline-none resize-none" />
          </div>

          <div className="sm:col-span-2 mt-2 flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border border-white/20 text-slate-200/90 hover:bg-white/10">Cancel</button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-lg shadow-cyan-500/20">
              Submit Request
            </button>
          </div>
        </form>

        <p className="mt-4 text-xs text-slate-200/70">Your booking request has been submitted for approval.</p>
      </div>
    </div>
  );
};

export default BookingModal;
