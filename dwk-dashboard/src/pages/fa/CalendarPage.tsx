import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, User } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import { calendarEvents, faClients } from '../../data/faMock';
import type { CalendarEvent } from '../../data/faMock';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const HOURS = Array.from({ length: 11 }, (_, i) => i + 8); // 08:00 – 18:00

const TYPE_COLORS: Record<CalendarEvent['type'], { bg: string; border: string; text: string }> = {
  meeting:  { bg: 'rgba(30,134,195,0.15)',  border: '#1E86C3', text: '#60B4E0' },
  call:     { bg: 'rgba(245,158,11,0.12)',  border: '#F59E0B', text: '#FCD34D' },
  internal: { bg: 'rgba(100,116,139,0.15)', border: '#64748B', text: '#94A3B8' },
};

function getWeekDays(anchorDate: Date) {
  const day = anchorDate.getDay();
  const start = new Date(anchorDate);
  start.setDate(anchorDate.getDate() - day);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function fmtDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function timeToRow(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return (h - 8) * 60 + (m || 0);
}

function durationMins(start: string, end: string): number {
  return timeToRow(end) - timeToRow(start);
}

export default function CalendarPage() {
  const { showToast } = useToast();
  const [anchor, setAnchor] = useState(new Date('2026-05-13'));
  const [events, setEvents] = useState<CalendarEvent[]>(calendarEvents);
  const [popover, setPopover] = useState<CalendarEvent | null>(null);
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ client: '', date: '2026-05-13', time: '09:00', type: 'meeting' as CalendarEvent['type'], notes: '' });

  const weekDays = getWeekDays(anchor);

  function prevWeek() {
    const d = new Date(anchor);
    d.setDate(d.getDate() - 7);
    setAnchor(d);
  }

  function nextWeek() {
    const d = new Date(anchor);
    d.setDate(d.getDate() + 7);
    setAnchor(d);
  }

  function handleSchedule() {
    const clientName = faClients.find(c => c.id === newEvent.client)?.name ?? newEvent.client;
    const ev: CalendarEvent = {
      id: `e${Date.now()}`,
      date: newEvent.date,
      time: newEvent.time,
      endTime: `${String(Number(newEvent.time.split(':')[0]) + 1).padStart(2, '0')}:00`,
      title: newEvent.type === 'internal' ? 'Internal Meeting' : `Meeting — ${clientName}`,
      client: clientName,
      type: newEvent.type,
      notes: newEvent.notes,
    };
    setEvents(e => [...e, ev]);
    setNewEventOpen(false);
    showToast('Meeting scheduled.');
  }

  const inputStyle = {
    width: '100%', height: 36, borderRadius: 8, border: '1px solid var(--border)',
    padding: '0 12px', fontFamily: "'Inter', sans-serif", fontSize: 14,
    color: 'var(--text-primary)', background: '#1E293B',
  };

  const CELL_H = 60; // px per hour

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Calendar</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>Week of {weekDays[0].toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Button variant="ghost" size="sm" icon={<ChevronLeft size={14} />} onClick={prevWeek}>Prev</Button>
          <Button variant="ghost" size="sm" onClick={() => setAnchor(new Date('2026-05-13'))}>Today</Button>
          <Button variant="ghost" size="sm" onClick={nextWeek}>Next <ChevronRight size={14} /></Button>
          <Button variant="primary" size="sm" icon={<Plus size={14} />} onClick={() => setNewEventOpen(true)}>Schedule Meeting</Button>
        </div>
      </div>

      <Card padding={0} className="table-wrap" style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 700 }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', borderBottom: '1px solid var(--divider)' }}>
            <div />
            {weekDays.map((d, i) => {
              const isToday = fmtDate(d) === '2026-05-13';
              return (
                <div key={i} style={{ padding: '12px 8px', textAlign: 'center', background: isToday ? 'var(--primary-light)' : undefined, borderRight: i < 6 ? '1px solid var(--divider)' : undefined }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 2 }}>{DAYS[d.getDay()]}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: isToday ? 700 : 400, color: isToday ? 'var(--primary)' : 'var(--text-primary)' }}>{d.getDate()}</div>
                </div>
              );
            })}
          </div>

          {/* Grid body */}
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)' }}>
            {/* Hour labels + horizontal lines */}
            <div style={{ gridColumn: '1 / -1', position: 'relative', height: CELL_H * HOURS.length }}>
              {HOURS.map((h, i) => (
                <div
                  key={h}
                  style={{
                    position: 'absolute', top: i * CELL_H, left: 0, right: 0,
                    height: CELL_H, borderTop: '1px solid var(--divider)',
                    display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)',
                  }}
                >
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-tertiary)', padding: '4px 8px', lineHeight: 1 }}>
                    {String(h).padStart(2, '0')}:00
                  </div>
                  {weekDays.map((_, ci) => (
                    <div key={ci} style={{ borderLeft: '1px solid var(--divider)' }} />
                  ))}
                </div>
              ))}

              {/* Events */}
              {events.map(ev => {
                const dayIdx = weekDays.findIndex(d => fmtDate(d) === ev.date);
                if (dayIdx < 0) return null;
                const top = timeToRow(ev.time);
                const height = Math.max(durationMins(ev.time, ev.endTime), 30);
                const tc = TYPE_COLORS[ev.type];
                return (
                  <div
                    key={ev.id}
                    onClick={() => setPopover(ev)}
                    style={{
                      position: 'absolute',
                      top: top,
                      left: `calc(60px + ${dayIdx} * ((100% - 60px) / 7) + 3px)`,
                      width: `calc((100% - 60px) / 7 - 6px)`,
                      height,
                      background: tc.bg,
                      borderLeft: `3px solid ${tc.border}`,
                      borderRadius: 6,
                      padding: '4px 6px',
                      cursor: 'pointer',
                      zIndex: 10,
                      overflow: 'hidden',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                      transition: 'box-shadow 120ms ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.14)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)'; }}
                  >
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: tc.text, lineHeight: 1.3 }}>{ev.title}</div>
                    {ev.client && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-secondary)', marginTop: 1 }}>{ev.client}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Event popover */}
      {popover && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setPopover(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#1E293B', borderRadius: 12, padding: 20, width: 300, boxShadow: '0 8px 32px rgba(0,0,0,0.16)', animation: 'card-in 150ms ease both' }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, marginBottom: 12 }}>{popover.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {popover.client && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <User size={14} color="var(--text-tertiary)" />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{popover.client}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Clock size={14} color="var(--text-tertiary)" />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{popover.time} – {popover.endTime}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Calendar size={14} color="var(--text-tertiary)" />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{popover.type}</span>
              </div>
            </div>
            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button variant="ghost" size="sm" onClick={() => setPopover(null)}>Close</Button>
              <Button variant="primary" size="sm" onClick={() => { setPopover(null); showToast('Notes feature coming soon.'); }}>Add Notes</Button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule modal */}
      <Modal
        open={newEventOpen}
        onClose={() => setNewEventOpen(false)}
        title="Schedule Meeting"
        footer={
          <>
            <Button variant="ghost" onClick={() => setNewEventOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSchedule}>Schedule</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Client</label>
            <select value={newEvent.client} onChange={e => setNewEvent(n => ({ ...n, client: e.target.value }))} style={{ ...inputStyle, appearance: 'none' }}>
              <option value="">Internal / No client</option>
              {faClients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Date</label>
            <input type="date" value={newEvent.date} onChange={e => setNewEvent(n => ({ ...n, date: e.target.value }))} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Time</label>
            <input type="time" value={newEvent.time} onChange={e => setNewEvent(n => ({ ...n, time: e.target.value }))} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Type</label>
            <select value={newEvent.type} onChange={e => setNewEvent(n => ({ ...n, type: e.target.value as CalendarEvent['type'] }))} style={{ ...inputStyle, appearance: 'none' }}>
              <option value="meeting">Meeting</option>
              <option value="call">Call</option>
              <option value="internal">Internal</option>
            </select>
          </div>
          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Notes (optional)</label>
            <textarea value={newEvent.notes} onChange={e => setNewEvent(n => ({ ...n, notes: e.target.value }))} rows={3} placeholder="Meeting agenda or notes..." style={{ width: '100%', borderRadius: 8, border: '1px solid var(--border)', padding: '10px 12px', fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-primary)', resize: 'vertical' }} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
