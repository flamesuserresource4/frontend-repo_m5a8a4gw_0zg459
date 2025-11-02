import React, { useMemo, useState } from 'react';
import { Calendar, Filter } from 'lucide-react';
import BookingModal from './BookingModal';

const VENUES = [
  'Seminar Hall',
  'STPK Hall',
  'IEDC Room',
  'Computer Lab',
  'Physics Lab',
];

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];

const mockAvailability = (date) => {
  // Generate deterministic availability for demo
  const seed = new Date(date).getDate();
  return VENUES.reduce((acc, v, i) => {
    acc[v] = timeSlots.map((t, idx) => ((seed + i + idx) % 3) !== 0);
    return acc;
  }, {});
};

const AvailabilityDashboard = ({ currentUser, onRequest }) => {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [venue, setVenue] = useState('All Venues');
  const [slotToBook, setSlotToBook] = useState(null);

  const availability = useMemo(() => mockAvailability(date), [date]);

  const venuesToShow = venue === 'All Venues' ? VENUES : [venue];

  const handleBook = (vName, t) => {
    setSlotToBook({ venue: vName, date, start: t, end: '' });
  };

  return (
    <div className="w-full">
      <div className="rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-2 text-slate-200/90">
            <Calendar className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Availability</h3>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/20">
              <Filter className="w-4 h-4 text-slate-200/70" />
              <select
                className="bg-transparent outline-none text-slate-100"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              >
                <option className="bg-slate-900" value="All Venues">All Venues</option>
                {VENUES.map((v) => (
                  <option className="bg-slate-900" key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
            <input
              type="date"
              className="px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-slate-100 outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="grid" style={{ gridTemplateColumns: `220px repeat(${timeSlots.length}, minmax(100px, 1fr))` }}>
              <div className="p-3 text-slate-200/80 text-sm">Venue</div>
              {timeSlots.map((t) => (
                <div key={t} className="p-3 text-slate-200/80 text-sm text-center">{t}</div>
              ))}

              {venuesToShow.map((vName) => (
                <React.Fragment key={vName}>
                  <div className="p-3 font-medium text-slate-100/90">{vName}</div>
                  {availability[vName].map((isFree, idx) => (
                    <div key={idx} className="p-2">
                      <button
                        disabled={!isFree}
                        onClick={() => handleBook(vName, timeSlots[idx])}
                        className={`w-full h-12 rounded-xl border text-sm transition-colors ${
                          isFree
                            ? 'bg-emerald-400/15 border-emerald-300/30 text-emerald-200 hover:bg-emerald-400/25'
                            : 'bg-rose-400/10 border-rose-300/20 text-rose-200/80 cursor-not-allowed'
                        }`}
                      >
                        {isFree ? 'Available' : 'Booked'}
                      </button>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-200/70">Tap any available slot to create a booking request.</p>
      </div>

      <BookingModal
        open={!!slotToBook}
        slot={slotToBook}
        onClose={() => setSlotToBook(null)}
        onSubmit={(data) => {
          onRequest?.(data);
          setSlotToBook(null);
        }}
      />
    </div>
  );
};

export default AvailabilityDashboard;
