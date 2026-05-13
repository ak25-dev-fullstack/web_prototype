export interface TMClient {
  id: string;
  name: string;
  initials: string;
  adviser: string;
  adviserInitials: string;
  segment: string;
  aum: string;
  status: 'Active' | 'Review' | 'Flagged' | 'New';
  lastActivity: string;
}

export const tmClients: TMClient[] = [
  { id: 'tc1',  name: 'Julian Whitfield',    initials: 'JW', adviser: 'Sarah Jenkins',    adviserInitials: 'SJ', segment: 'High Net Worth', aum: '£1.8M', status: 'Active',  lastActivity: 'Today' },
  { id: 'tc2',  name: 'Amara Osei',          initials: 'AO', adviser: 'Sarah Jenkins',    adviserInitials: 'SJ', segment: 'Small Business', aum: '£420K', status: 'Active',  lastActivity: '2 days ago' },
  { id: 'tc3',  name: 'Claire Donovan',      initials: 'CD', adviser: 'Sarah Jenkins',    adviserInitials: 'SJ', segment: 'Retail Growth',  aum: '£185K', status: 'Review',  lastActivity: '1 week ago' },
  { id: 'tc4',  name: 'George Harrington',   initials: 'GH', adviser: 'Marcus Vane',      adviserInitials: 'MV', segment: 'Self-Employed',  aum: '£310K', status: 'Active',  lastActivity: '3 days ago' },
  { id: 'tc5',  name: 'Priya Sharma',        initials: 'PS', adviser: 'Marcus Vane',      adviserInitials: 'MV', segment: 'Retail Growth',  aum: '£230K', status: 'Active',  lastActivity: '5 days ago' },
  { id: 'tc6',  name: 'Daniel Frost',        initials: 'DF', adviser: 'Marcus Vane',      adviserInitials: 'MV', segment: 'High Net Worth', aum: '£2.4M', status: 'Flagged', lastActivity: '2 days ago' },
  { id: 'tc7',  name: 'Yuki Nakamura',       initials: 'YN', adviser: 'Elena Rodriguez',  adviserInitials: 'ER', segment: 'Small Business', aum: '£560K', status: 'Active',  lastActivity: 'Today' },
  { id: 'tc8',  name: 'Oliver Strand',       initials: 'OS', adviser: 'Elena Rodriguez',  adviserInitials: 'ER', segment: 'Retail Growth',  aum: '£145K', status: 'Review',  lastActivity: '1 week ago' },
  { id: 'tc9',  name: 'Nadia Petrov',        initials: 'NP', adviser: 'Elena Rodriguez',  adviserInitials: 'ER', segment: 'Self-Employed',  aum: '£205K', status: 'Flagged', lastActivity: '3 days ago' },
  { id: 'tc10', name: 'Benjamin Cross',      initials: 'BC', adviser: 'David Thompson',   adviserInitials: 'DT', segment: 'Retail Growth',  aum: '£90K',  status: 'New',    lastActivity: 'Today' },
  { id: 'tc11', name: 'Sienna O\'Callaghan', initials: 'SC', adviser: 'David Thompson',   adviserInitials: 'DT', segment: 'Self-Employed',  aum: '£120K', status: 'Active',  lastActivity: '4 days ago' },
  { id: 'tc12', name: 'Rajan Mehta',         initials: 'RM', adviser: 'David Thompson',   adviserInitials: 'DT', segment: 'Small Business', aum: '£340K', status: 'Active',  lastActivity: '6 days ago' },
  { id: 'tc13', name: 'Charlotte Beech',     initials: 'CB', adviser: 'Morgan Alexander', adviserInitials: 'MA', segment: 'High Net Worth', aum: '£1.1M', status: 'Active',  lastActivity: 'Yesterday' },
  { id: 'tc14', name: 'Felix Gruber',        initials: 'FG', adviser: 'Morgan Alexander', adviserInitials: 'MA', segment: 'Self-Employed',  aum: '£280K', status: 'Review',  lastActivity: '2 days ago' },
  { id: 'tc15', name: 'Isabelle Lacroix',    initials: 'IL', adviser: 'Morgan Alexander', adviserInitials: 'MA', segment: 'Retail Growth',  aum: '£165K', status: 'Active',  lastActivity: '3 days ago' },
  { id: 'tc16', name: 'Samuel Adjei',        initials: 'SA', adviser: 'Sarah Jenkins',    adviserInitials: 'SJ', segment: 'Small Business', aum: '£475K', status: 'Active',  lastActivity: 'Yesterday' },
  { id: 'tc17', name: 'Tara Nwosu',          initials: 'TN', adviser: 'Marcus Vane',      adviserInitials: 'MV', segment: 'High Net Worth', aum: '£3.2M', status: 'Active',  lastActivity: 'Today' },
  { id: 'tc18', name: 'Leon Fischer',        initials: 'LF', adviser: 'Elena Rodriguez',  adviserInitials: 'ER', segment: 'Retail Growth',  aum: '£198K', status: 'New',    lastActivity: 'Today' },
];

export const tmAuditLog = [
  { timestamp: '2026-05-13 10:02', user: 'Jonathan Sterling', action: 'Reassign', target: 'David Okonkwo → Marcus Vane', ip: '10.0.0.12' },
  { timestamp: '2026-05-13 10:48', user: 'Jonathan Sterling', action: 'View', target: 'Escalations Queue', ip: '10.0.0.12' },
  { timestamp: '2026-05-13 11:10', user: 'Jonathan Sterling', action: 'View', target: 'Team Performance Report', ip: '10.0.0.12' },
  { timestamp: '2026-05-13 11:55', user: 'Jonathan Sterling', action: 'Export', target: 'Adviser List — CSV', ip: '10.0.0.12' },
  { timestamp: '2026-05-12 16:20', user: 'Jonathan Sterling', action: 'Reassign', target: 'James Thornton → David Thompson', ip: '10.0.0.12' },
  { timestamp: '2026-05-12 15:00', user: 'Jonathan Sterling', action: 'View', target: 'Elena Rodriguez — Adviser Profile', ip: '10.0.0.12' },
  { timestamp: '2026-05-12 14:30', user: 'Jonathan Sterling', action: 'Edit', target: 'ESC-8842 — Status Updated: In Progress', ip: '10.0.0.12' },
  { timestamp: '2026-05-12 13:00', user: 'Jonathan Sterling', action: 'Login', target: 'System Login', ip: '10.0.0.12' },
  { timestamp: '2026-05-12 11:45', user: 'Jonathan Sterling', action: 'View', target: 'Client — Tara Nwosu', ip: '10.0.0.12' },
  { timestamp: '2026-05-11 16:05', user: 'Jonathan Sterling', action: 'Export', target: 'Team Performance Report — PDF', ip: '10.0.0.12' },
  { timestamp: '2026-05-11 14:30', user: 'Jonathan Sterling', action: 'Reassign', target: 'Felix Gruber → Sarah Jenkins', ip: '10.0.0.12' },
  { timestamp: '2026-05-11 12:10', user: 'Jonathan Sterling', action: 'Edit', target: 'ESC-8839 — Resolved', ip: '10.0.0.12' },
  { timestamp: '2026-05-11 10:00', user: 'Jonathan Sterling', action: 'Login', target: 'System Login', ip: '10.0.0.12' },
  { timestamp: '2026-05-10 17:00', user: 'Jonathan Sterling', action: 'View', target: 'Assignments — Pending Queue', ip: '10.0.0.12' },
  { timestamp: '2026-05-10 15:30', user: 'Jonathan Sterling', action: 'Export', target: 'Q1 Compliance Summary — PDF', ip: '10.0.0.12' },
];
