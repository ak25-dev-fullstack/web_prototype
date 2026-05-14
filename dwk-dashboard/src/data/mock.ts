export const teamStats = {
  teamSize: 24,
  teamSizeChange: '+2 this month',
  activeClients: 1482,
  avgClientsPerAdviser: 62,
  csatScore: 4.82,
  csatTarget: '94% Target reached',
  openEscalations: 12,
  criticalEscalations: 3,
}

export const advisers = [
  { id: 'a1', name: 'Sarah Jenkins',    role: 'Senior Adviser',      clients: 64, capacityPct: 82, satisfaction: 4.9, complaints: 0, status: 'on-track',        avatar: 'SJ' },
  { id: 'a2', name: 'Marcus Vane',      role: 'Wealth Manager',      clients: 67, capacityPct: 85, satisfaction: 4.7, complaints: 2, status: 'on-track',        avatar: 'MV' },
  { id: 'a3', name: 'Elena Rodriguez',  role: 'Portfolio Associate',  clients: 62, capacityPct: 95, satisfaction: 4.3, complaints: 5, status: 'review-required', avatar: 'ER' },
  { id: 'a4', name: 'David Thompson',   role: 'Junior Adviser',      clients: 28, capacityPct: 40, satisfaction: 4.5, complaints: 1, status: 'on-track',        avatar: 'DT' },
  {
    id: 'a5',
    name: 'Morgan Alexander',
    role: 'Senior Adviser',
    clients: 11,
    capacityMax: 15,
    capacityPct: 73,
    satisfaction: 4.9,
    complaints: 0,
    retention: 98,
    totalAUM: '£4.2M',
    aumChange: '+12% vs last quarter',
    tenure: '6 Years',
    location: 'London HQ',
    expertise: ['Self-employed tax', 'Retirement', 'Portfolio Growth'],
    expertiseAlignment: { taxAdvisory: 100, retirementPlanning: 85, investmentStrategy: 40 },
    anomaly: "Two clients currently assigned are operating in High-Net-Worth Real Estate, which sits outside Morgan's primary expertise areas.",
    avatar: 'MA',
    badge: 'Top Performer Q3',
    status: 'on-track',
  },
]

export const heatmapData = {
  weeks: ['W1','W2','W3','W4','W5','W6','W7','W8'],
  advisers: [
    { name: 'A. Smith', scores: [4,6,5,7,6,7,6,7] },
    { name: 'B. Ray',   scores: [3,3,4,4,5,3,4,5] },
    { name: 'L. Cho',   scores: [6,7,6,7,6,7,7,7] },
  ]
}

export const clientSegmentation = [
  { label: 'High Net Worth', pct: 45, color: '#1E86C3' },
  { label: 'Retail Growth',  pct: 30, color: '#1E86C3' },
  { label: 'Standard',       pct: 25, color: 'rgba(30,134,195,0.15)' },
]

export const aumByCategory = [
  { label: 'Equities',      value: 1200, display: '£1.2B' },
  { label: 'Fixed Income',  value: 450,  display: '£450M' },
  { label: 'Cash & Liquid', value: 210,  display: '£210M' },
]

export const escalations = [
  {
    id: 'ESC-8842', type: 'critical-complaint', label: 'CRITICAL COMPLAINT',
    title: 'Mortgage Application Delay - Portfolio £1.2M',
    client: { name: 'Mr. Julian Thorne', avatar: 'JT' },
    adviser: { name: 'Sarah Jenkins', avatar: 'SJ' },
    timeAgo: '14 mins ago',
    actions: ['View Chat History'],
    buttons: ['Message Adviser', 'Reassign', 'Resolve'],
    primaryButton: 'Resolve',
  },
  {
    id: 'ESC-8839', type: 'capacity-overload', label: 'CAPACITY OVERLOAD',
    title: 'High Workload Alert: 12 Active Applications in 24h',
    queueType: 'Retail Lending - North Branch',
    adviser: { name: 'Marcus Sterling', avatar: 'MS' },
    timeAgo: '45 mins ago',
    actions: ['View Performance Metrics'],
    buttons: ['Reassign All', 'Adjust Load'],
    primaryButton: 'Adjust Load',
  },
  {
    id: 'ESC-8835', type: 'unassigned-handover', label: 'UNASSIGNED — ACTION NEEDED',
    title: 'Complex ISA Transfer Query — No Adviser Assigned',
    client: { name: 'Mrs. Emily Chen', avatar: 'EC' },
    adviser: null,
    timeAgo: '2 hours ago',
    actions: ['View Case Notes'],
    buttons: ['Assign to Expert'],
    primaryButton: 'Assign to Expert',
  },
]

export const pendingClients = [
  {
    id: 'c1', name: 'Harrington Tech Grp', industry: 'SaaS & Cloud Infrastructure',
    liquidity: '£4.2M', flags: ['Cross-border Tax Flag'],
    needs: ['Net Wealth', 'M&A Strategy'], flagged: true,
  },
  {
    id: 'c2', name: 'Luna Logistics Ltd', industry: 'Global Supply Chain',
    liquidity: '£850k Operating Cap', flags: [], needs: [], flagged: false,
  },
  {
    id: 'c3', name: 'Dr. Elena Rostova', industry: 'HNW Individual',
    liquidity: '£12.5M Estate Portfolio', flags: [], needs: [], flagged: false,
  },
]

export const finAiMatches = [
  {
    rank: 1, adviser: 'Sarah Jenkins, CFA', match: 'HIGH MATCH', compatibility: 98,
    rationale: "Sarah possesses 12 years experience in Tech M&A. Her current workload of £45M across 6 clients allows for the capacity required by Harrington's complex £4.2M liquidity event. She recently resolved a similar cross-border tax issue for BlueWave Corp.",
    expertise: [ { label: 'Corporate Tax Structuring', pct: 95 }, { label: 'SaaS Revenue Models', pct: 88 } ],
  },
  {
    rank: 2, adviser: 'Marcus Thorne', match: null, compatibility: 84,
    rationale: 'Excellent tax alignment, however currently managing a high-intensity portfolio (88% capacity). Consider for future expansions.',
    expertise: [],
  },
  {
    rank: 3, adviser: 'Leila Varma', match: null, compatibility: 79,
    rationale: 'Specialises in HNW Individuals rather than SaaS Corporate structure. Risk of misalignment in terminology and reporting needs.',
    expertise: [],
  },
]

export const adviserPanelList = [
  { name: 'David Chen',   role: 'Global Markets',     capacity: 45, avatar: 'DC' },
  { name: 'Emily Watson', role: 'Tax Planning',        capacity: 12, avatar: 'EW' },
  { name: 'Liam Hughes',  role: 'Investment Strategy', capacity: 82, avatar: 'LH' },
  { name: 'Sophia Rossi', role: 'Wealth Mgmt',         capacity: 15, avatar: 'SR' },
]

export const recentReports = [
  { title: 'Team Performance Report', subtitle: '(Weekly)', date: 'Generated May 18, 2025' },
  { title: 'Product Performance',     subtitle: '(Anonymised)', date: 'Generated May 15, 2025' },
]

export const communications = [
  { from: 'Emma Davies', subject: 'Re: Client Reassignment', time: '10:24 AM', unread: true },
  { from: 'John Smith',  subject: 'Question about pension options', time: 'Yesterday', unread: false },
]

export const dailyBriefing = [
  { time: '09:12', type: 'system', text: 'Team performance up 14% vs last week.' },
  { time: '08:45', type: 'alert',  text: '3 Escalations pending in "Assignment" stage.' },
  { time: 'System', type: 'system', text: 'Morning huddle notes uploaded.' },
]

export const performanceTrends = {
  months: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
  satisfaction: {
    morgan: [4.7, 4.8, 4.8, 4.9, 4.9, 4.9],
    teamAvg: [4.3, 4.4, 4.3, 4.5, 4.4, 4.5],
  },
  responseTime: {
    morgan: [3.2, 2.8, 2.5, 2.1, 1.9, 1.8],
    teamAvg: [4.5, 4.2, 4.0, 3.8, 3.9, 3.7],
  },
}
