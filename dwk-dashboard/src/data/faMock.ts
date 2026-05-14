export interface FAClient {
  id: string;
  name: string;
  initials: string;
  segment: string;
  aum: string;
  aumNum: number;
  lastContact: string;
  riskFlag: string;
  status: 'Active' | 'Review' | 'Due' | 'Flagged' | 'New';
  since: string;
  email: string;
  phone: string;
  monthlyIncome: string;
  monthlySpend: string;
  savingsRate: string;
}

export const faClients: FAClient[] = [
  { id: 'mc', name: 'Margaret Chen', initials: 'MC', segment: 'Retail Growth', aum: '£420K', aumNum: 420000, lastContact: '2 days ago', riskFlag: 'None', status: 'Active', since: 'Jan 2022', email: 'margaret.chen@email.co.uk', phone: '+44 7700 123456', monthlyIncome: '£5,200', monthlySpend: '£3,100', savingsRate: '40%' },
  { id: 'rh', name: 'Robert Hannigan', initials: 'RH', segment: 'Self-Employed', aum: '£215K', aumNum: 215000, lastContact: '4 days ago', riskFlag: 'Risk assessment pending', status: 'Review', since: 'Mar 2021', email: 'r.hannigan@hannigan-design.co.uk', phone: '+44 7711 234567', monthlyIncome: '£6,800', monthlySpend: '£4,200', savingsRate: '38%' },
  { id: 'sa', name: 'Sophia Andersson', initials: 'SA', segment: 'High Net Worth', aum: '£1.2M', aumNum: 1200000, lastContact: 'Yesterday', riskFlag: 'Annual review overdue', status: 'Due', since: 'Nov 2019', email: 'sophia.andersson@nordglobal.com', phone: '+44 7722 345678', monthlyIncome: '£18,500', monthlySpend: '£9,200', savingsRate: '50%' },
  { id: 'do', name: 'David Okonkwo', initials: 'DO', segment: 'Small Business', aum: '£380K', aumNum: 380000, lastContact: '1 week ago', riskFlag: 'None', status: 'Active', since: 'Jun 2022', email: 'david@okonkworetail.co.uk', phone: '+44 7733 456789', monthlyIncome: '£8,400', monthlySpend: '£5,100', savingsRate: '39%' },
  { id: 'pw', name: 'Patricia Walsh', initials: 'PW', segment: 'Retail Growth', aum: '£190K', aumNum: 190000, lastContact: '3 days ago', riskFlag: 'None', status: 'Active', since: 'Feb 2023', email: 'patricia.walsh@email.co.uk', phone: '+44 7744 567890', monthlyIncome: '£3,900', monthlySpend: '£2,600', savingsRate: '33%' },
  { id: 'jt', name: 'James Thornton', initials: 'JT', segment: 'Self-Employed', aum: '£95K', aumNum: 95000, lastContact: '2 weeks ago', riskFlag: 'Tax mismatch flagged', status: 'Flagged', since: 'Sep 2023', email: 'james@thorntonfreelance.co.uk', phone: '+44 7755 678901', monthlyIncome: '£4,100', monthlySpend: '£3,800', savingsRate: '7%' },
  { id: 'es', name: 'Emily Sutherland', initials: 'ES', segment: 'High Net Worth', aum: '£2.1M', aumNum: 2100000, lastContact: 'Today', riskFlag: 'None', status: 'Active', since: 'Apr 2020', email: 'emily.sutherland@sutherlandcap.com', phone: '+44 7766 789012', monthlyIncome: '£25,000', monthlySpend: '£11,000', savingsRate: '56%' },
  { id: 'lo', name: "Liam O'Brien", initials: 'LO', segment: 'Retail Growth', aum: '£310K', aumNum: 310000, lastContact: '5 days ago', riskFlag: 'None', status: 'Active', since: 'Jul 2021', email: 'liam.obrien@email.co.uk', phone: '+44 7777 890123', monthlyIncome: '£4,700', monthlySpend: '£2,900', savingsRate: '38%' },
  { id: 'fa', name: 'Fatima Al-Rashid', initials: 'FR', segment: 'Small Business', aum: '£540K', aumNum: 540000, lastContact: '3 days ago', riskFlag: 'None', status: 'Active', since: 'Oct 2021', email: 'fatima@alrashidventures.co.uk', phone: '+44 7788 901234', monthlyIncome: '£11,200', monthlySpend: '£6,800', savingsRate: '39%' },
  { id: 'np', name: 'Noah Patel', initials: 'NP', segment: 'Self-Employed', aum: '£178K', aumNum: 178000, lastContact: '1 week ago', riskFlag: 'Documentation missing', status: 'Review', since: 'Jan 2024', email: 'noah.patel@patelsolutions.co.uk', phone: '+44 7799 012345', monthlyIncome: '£5,500', monthlySpend: '£3,900', savingsRate: '29%' },
  { id: 'hb', name: 'Helena Browne', initials: 'HB', segment: 'Retail Growth', aum: '£255K', aumNum: 255000, lastContact: '6 days ago', riskFlag: 'None', status: 'Active', since: 'May 2022', email: 'h.browne@email.co.uk', phone: '+44 7800 123456', monthlyIncome: '£4,300', monthlySpend: '£2,800', savingsRate: '35%' },
  { id: 'tk', name: 'Thomas Keller', initials: 'TK', segment: 'High Net Worth', aum: '£890K', aumNum: 890000, lastContact: '4 days ago', riskFlag: 'None', status: 'Active', since: 'Dec 2020', email: 'thomas.keller@kellerprivate.com', phone: '+44 7811 234567', monthlyIncome: '£14,200', monthlySpend: '£7,500', savingsRate: '47%' },
];

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: string;
  type: 'Debit' | 'Credit';
}

export const clientTransactions: Record<string, Transaction[]> = {
  mc: [
    { id: 't1', date: '2026-05-10', description: 'Tesco Superstore', category: 'Groceries', amount: '£67.40', type: 'Debit' },
    { id: 't2', date: '2026-05-09', description: 'Salary — Greenwood Co.', category: 'Income', amount: '£5,200.00', type: 'Credit' },
    { id: 't3', date: '2026-05-08', description: 'Shell Fuel', category: 'Transport', amount: '£88.20', type: 'Debit' },
    { id: 't4', date: '2026-05-07', description: 'Netflix', category: 'Entertainment', amount: '£17.99', type: 'Debit' },
    { id: 't5', date: '2026-05-06', description: 'Rent — Kensington Flats', category: 'Housing', amount: '£1,450.00', type: 'Debit' },
    { id: 't6', date: '2026-05-05', description: 'Costa Coffee', category: 'Dining', amount: '£12.60', type: 'Debit' },
    { id: 't7', date: '2026-05-04', description: 'Amazon Prime', category: 'Entertainment', amount: '£8.99', type: 'Debit' },
    { id: 't8', date: '2026-05-03', description: 'EDF Energy', category: 'Utilities', amount: '£142.00', type: 'Debit' },
    { id: 't9', date: '2026-05-02', description: 'ISA Contribution', category: 'Savings', amount: '£500.00', type: 'Debit' },
    { id: 't10', date: '2026-05-01', description: 'Boots Pharmacy', category: 'Healthcare', amount: '£34.80', type: 'Debit' },
    { id: 't11', date: '2026-04-30', description: 'Waitrose', category: 'Groceries', amount: '£94.20', type: 'Debit' },
    { id: 't12', date: '2026-04-28', description: 'Uber Eats', category: 'Dining', amount: '£28.50', type: 'Debit' },
    { id: 't13', date: '2026-04-26', description: 'TfL Oyster top-up', category: 'Transport', amount: '£50.00', type: 'Debit' },
    { id: 't14', date: '2026-04-24', description: 'British Gas', category: 'Utilities', amount: '£89.00', type: 'Debit' },
    { id: 't15', date: '2026-04-22', description: 'John Lewis', category: 'Shopping', amount: '£210.00', type: 'Debit' },
    { id: 't16', date: '2026-04-20', description: 'Dividend — FTSE Index Fund', category: 'Income', amount: '£320.00', type: 'Credit' },
    { id: 't17', date: '2026-04-18', description: 'Gym membership — PureGym', category: 'Healthcare', amount: '£29.99', type: 'Debit' },
    { id: 't18', date: '2026-04-16', description: 'Spotify', category: 'Entertainment', amount: '£10.99', type: 'Debit' },
    { id: 't19', date: '2026-04-14', description: 'Restaurant — Nobu', category: 'Dining', amount: '£185.00', type: 'Debit' },
    { id: 't20', date: '2026-04-12', description: 'Car insurance — Admiral', category: 'Transport', amount: '£64.33', type: 'Debit' },
  ],
  rh: [
    { id: 't1', date: '2026-05-09', description: 'HMRC Self Assessment', category: 'Tax', amount: '£1,200.00', type: 'Debit' },
    { id: 't2', date: '2026-05-08', description: 'Client Invoice — BlueWave Corp', category: 'Income', amount: '£4,500.00', type: 'Credit' },
    { id: 't3', date: '2026-05-07', description: 'Shell Fuel', category: 'Transport', amount: '£88.20', type: 'Debit' },
    { id: 't4', date: '2026-05-06', description: 'Netflix', category: 'Entertainment', amount: '£17.99', type: 'Debit' },
    { id: 't5', date: '2026-05-05', description: 'Office rent — WeWork', category: 'Housing', amount: '£650.00', type: 'Debit' },
    { id: 't6', date: '2026-05-04', description: 'Adobe Creative Cloud', category: 'Business', amount: '£54.98', type: 'Debit' },
    { id: 't7', date: '2026-05-02', description: 'Client Invoice — Apex Digital', category: 'Income', amount: '£3,200.00', type: 'Credit' },
    { id: 't8', date: '2026-05-01', description: 'National Insurance', category: 'Tax', amount: '£380.00', type: 'Debit' },
    { id: 't9', date: '2026-04-29', description: 'Waitrose', category: 'Groceries', amount: '£112.40', type: 'Debit' },
    { id: 't10', date: '2026-04-27', description: 'BT Broadband', category: 'Utilities', amount: '£45.00', type: 'Debit' },
    { id: 't11', date: '2026-04-25', description: 'Client Invoice — FinBridge Ltd', category: 'Income', amount: '£2,800.00', type: 'Credit' },
    { id: 't12', date: '2026-04-23', description: 'EDF Energy', category: 'Utilities', amount: '£128.00', type: 'Debit' },
    { id: 't13', date: '2026-04-21', description: 'Pret A Manger', category: 'Dining', amount: '£38.70', type: 'Debit' },
    { id: 't14', date: '2026-04-19', description: 'Amazon Web Services', category: 'Business', amount: '£92.00', type: 'Debit' },
    { id: 't15', date: '2026-04-17', description: 'Mortgage payment', category: 'Housing', amount: '£1,180.00', type: 'Debit' },
    { id: 't16', date: '2026-04-15', description: 'Pension contribution', category: 'Savings', amount: '£400.00', type: 'Debit' },
    { id: 't17', date: '2026-04-13', description: 'Tesco Metro', category: 'Groceries', amount: '£54.30', type: 'Debit' },
    { id: 't18', date: '2026-04-11', description: 'Travel — London to Manchester', category: 'Transport', amount: '£89.00', type: 'Debit' },
    { id: 't19', date: '2026-04-09', description: 'LinkedIn Premium', category: 'Business', amount: '£39.99', type: 'Debit' },
    { id: 't20', date: '2026-04-07', description: 'Client Invoice — NorthPoint Ltd', category: 'Income', amount: '£5,600.00', type: 'Credit' },
  ],
};

for (const id of ['sa', 'do', 'pw', 'jt', 'es', 'lo', 'fa', 'np', 'hb', 'tk']) {
  clientTransactions[id] = [
    { id: 't1', date: '2026-05-10', description: 'Tesco Superstore', category: 'Groceries', amount: '£58.20', type: 'Debit' },
    { id: 't2', date: '2026-05-09', description: 'Monthly Salary', category: 'Income', amount: '£6,500.00', type: 'Credit' },
    { id: 't3', date: '2026-05-07', description: 'Mortgage payment', category: 'Housing', amount: '£1,200.00', type: 'Debit' },
    { id: 't4', date: '2026-05-06', description: 'British Gas', category: 'Utilities', amount: '£95.00', type: 'Debit' },
    { id: 't5', date: '2026-05-05', description: 'TfL Oyster', category: 'Transport', amount: '£50.00', type: 'Debit' },
    { id: 't6', date: '2026-05-03', description: 'Netflix', category: 'Entertainment', amount: '£17.99', type: 'Debit' },
    { id: 't7', date: '2026-05-01', description: 'ISA Contribution', category: 'Savings', amount: '£400.00', type: 'Debit' },
    { id: 't8', date: '2026-04-28', description: 'Waitrose', category: 'Groceries', amount: '£103.40', type: 'Debit' },
    { id: 't9', date: '2026-04-25', description: 'Restaurant — The Ivy', category: 'Dining', amount: '£140.00', type: 'Debit' },
    { id: 't10', date: '2026-04-22', description: 'Car insurance', category: 'Transport', amount: '£72.00', type: 'Debit' },
    { id: 't11', date: '2026-04-20', description: 'Amazon order', category: 'Shopping', amount: '£88.50', type: 'Debit' },
    { id: 't12', date: '2026-04-18', description: 'EDF Energy', category: 'Utilities', amount: '£110.00', type: 'Debit' },
    { id: 't13', date: '2026-04-15', description: 'Dividend income', category: 'Income', amount: '£280.00', type: 'Credit' },
    { id: 't14', date: '2026-04-13', description: 'Gym membership', category: 'Healthcare', amount: '£45.00', type: 'Debit' },
    { id: 't15', date: '2026-04-10', description: 'Shell Fuel', category: 'Transport', amount: '£82.30', type: 'Debit' },
    { id: 't16', date: '2026-04-08', description: 'Spotify', category: 'Entertainment', amount: '£10.99', type: 'Debit' },
    { id: 't17', date: '2026-04-06', description: 'Boots Pharmacy', category: 'Healthcare', amount: '£22.50', type: 'Debit' },
    { id: 't18', date: '2026-04-04', description: 'John Lewis', category: 'Shopping', amount: '£165.00', type: 'Debit' },
    { id: 't19', date: '2026-04-02', description: 'Uber Eats', category: 'Dining', amount: '£32.80', type: 'Debit' },
    { id: 't20', date: '2026-03-30', description: 'Pension contribution', category: 'Savings', amount: '£350.00', type: 'Debit' },
  ];
}

export interface ClientNote {
  id: string;
  author: string;
  authorInitials: string;
  timestamp: string;
  text: string;
}

export const clientNotes: Record<string, ClientNote[]> = {
  mc: [
    { id: 'n1', author: 'Sarah Mitchell', authorInitials: 'SM', timestamp: '2026-05-08 14:22', text: 'Client called to discuss rebalancing Growth Equities allocation. Wants to increase to 35% by Q3. Follow up with updated suitability assessment before making changes.' },
    { id: 'n2', author: 'Sarah Mitchell', authorInitials: 'SM', timestamp: '2026-04-30 11:05', text: 'Q1 spending report reviewed with client. Margaret was surprised by the 18% increase in dining expenses — she attributed it to entertaining new business contacts. No concern flagged.' },
  ],
  rh: [
    { id: 'n1', author: 'Sarah Mitchell', authorInitials: 'SM', timestamp: '2026-05-06 09:30', text: 'Robert has not provided updated P&L for tax year 2025/26. Sent reminder email. Risk assessment cannot be completed until documentation is received.' },
    { id: 'n2', author: 'Sarah Mitchell', authorInitials: 'SM', timestamp: '2026-04-22 16:10', text: 'Discussed potential ISA allowance top-up before April deadline. Client agreed to contribute £8,000 before year end. Instructed transfer.' },
  ],
};

for (const id of ['sa', 'do', 'pw', 'jt', 'es', 'lo', 'fa', 'np', 'hb', 'tk']) {
  clientNotes[id] = [
    { id: 'n1', author: 'Sarah Mitchell', authorInitials: 'SM', timestamp: '2026-05-05 10:15', text: 'Routine check-in call completed. Client is satisfied with portfolio performance. No immediate action required.' },
  ];
}

export interface CalendarEvent {
  id: string;
  date: string;
  time: string;
  endTime: string;
  title: string;
  client: string;
  type: 'meeting' | 'call' | 'internal';
  notes?: string;
}

export const calendarEvents: CalendarEvent[] = [
  { id: 'e1', date: '2026-05-13', time: '09:00', endTime: '10:00', title: 'Portfolio Review', client: 'Margaret Chen', type: 'meeting' },
  { id: 'e2', date: '2026-05-13', time: '11:30', endTime: '12:15', title: 'Risk Assessment Call', client: 'Robert Hannigan', type: 'call' },
  { id: 'e3', date: '2026-05-13', time: '14:00', endTime: '15:00', title: 'Annual Review', client: 'Sophia Andersson', type: 'meeting' },
  { id: 'e4', date: '2026-05-13', time: '16:00', endTime: '16:30', title: 'Team Briefing', client: '', type: 'internal' },
  { id: 'e5', date: '2026-05-14', time: '10:00', endTime: '11:00', title: 'New Client Onboarding', client: 'James Thornton', type: 'meeting' },
  { id: 'e6', date: '2026-05-15', time: '14:30', endTime: '15:30', title: 'FCA Compliance Review', client: '', type: 'internal' },
  { id: 'e7', date: '2026-05-16', time: '09:00', endTime: '10:00', title: 'Portfolio Review', client: 'Emily Sutherland', type: 'meeting' },
  { id: 'e8', date: '2026-05-14', time: '15:00', endTime: '15:45', title: 'Investment Strategy Call', client: 'Fatima Al-Rashid', type: 'call' },
  { id: 'e9', date: '2026-05-15', time: '10:30', endTime: '11:15', title: 'Annual Review', client: "Liam O'Brien", type: 'meeting' },
];

export interface Document {
  id: string;
  name: string;
  client: string;
  type: string;
  date: string;
}

export const faDocuments: Document[] = [
  { id: 'd1', name: 'Q1 Spending Report', client: 'Margaret Chen', type: 'PDF Report', date: '2026-04-30' },
  { id: 'd2', name: 'Suitability Assessment', client: 'Robert Hannigan', type: 'Compliance', date: '2026-04-15' },
  { id: 'd3', name: 'Investment Proposal', client: 'Emily Sutherland', type: 'Advisory', date: '2026-05-01' },
  { id: 'd4', name: 'KYC Form', client: 'David Okonkwo', type: 'Compliance', date: '2026-03-20' },
  { id: 'd5', name: 'Annual Review Summary', client: 'Sophia Andersson', type: 'Report', date: '2026-04-28' },
  { id: 'd6', name: 'Risk Profile Assessment', client: 'James Thornton', type: 'Compliance', date: '2026-04-10' },
  { id: 'd7', name: 'Portfolio Rebalancing Proposal', client: 'Emily Sutherland', type: 'Advisory', date: '2026-05-05' },
  { id: 'd8', name: 'Q4 2025 Performance Report', client: 'Thomas Keller', type: 'Report', date: '2026-01-15' },
  { id: 'd9', name: 'AML Screening Result', client: 'Fatima Al-Rashid', type: 'Compliance', date: '2026-03-05' },
  { id: 'd10', name: 'Client Agreement — Revised', client: 'Helena Browne', type: 'Compliance', date: '2026-04-22' },
  { id: 'd11', name: 'Tax Planning Summary 2026', client: 'Robert Hannigan', type: 'Advisory', date: '2026-02-28' },
  { id: 'd12', name: 'Pension Transfer Analysis', client: "Liam O'Brien", type: 'Advisory', date: '2026-03-30' },
];

export interface CategorisationItem {
  id: string;
  client: string;
  clientInitials: string;
  date: string;
  description: string;
  amount: string;
  amountType: 'Debit' | 'Credit';
  currentCategory: string;
  confidence: number;
  suggestedCategory?: string;
  status: 'Pending' | 'Confirmed' | 'Overridden';
  overriddenTo?: string;
  reviewedAt?: string;
}

export const categorisationItems: CategorisationItem[] = [
  { id: 'ci1',  client: 'Emily Sutherland',  clientInitials: 'ES', date: '2026-05-10', description: 'Bloomberg Terminal Sub.', amount: '£2,100.00', amountType: 'Debit', currentCategory: 'Business',       confidence: 78, status: 'Pending' },
  { id: 'ci2',  client: 'Emily Sutherland',  clientInitials: 'ES', date: '2026-05-09', description: 'Quintessentially Members Club', amount: '£850.00', amountType: 'Debit', currentCategory: 'Entertainment', confidence: 41, suggestedCategory: 'Dining', status: 'Pending' },
  { id: 'ci3',  client: 'Emily Sutherland',  clientInitials: 'ES', date: '2026-05-07', description: 'Walpole Fine Art Auction', amount: '£4,200.00', amountType: 'Debit', currentCategory: 'Shopping',       confidence: 34, suggestedCategory: 'Investment', status: 'Pending' },
  { id: 'ci4',  client: 'Sophia Andersson',  clientInitials: 'SA', date: '2026-05-08', description: 'Coutts Private Banking Fee',    amount: '£220.00',  amountType: 'Debit', currentCategory: 'Business',       confidence: 82, status: 'Pending' },
  { id: 'ci5',  client: 'Sophia Andersson',  clientInitials: 'SA', date: '2026-05-06', description: 'Offshore Transfer — Isle of Man', amount: '£15,000.00', amountType: 'Debit', currentCategory: 'Savings', confidence: 55, suggestedCategory: 'Investment', status: 'Pending' },
  { id: 'ci6',  client: 'Robert Hannigan',   clientInitials: 'RH', date: '2026-05-09', description: 'HMRC Self Assessment',      amount: '£1,200.00', amountType: 'Debit', currentCategory: 'Tax',            confidence: 91, status: 'Confirmed', reviewedAt: '2026-05-10 09:15' },
  { id: 'ci7',  client: 'Robert Hannigan',   clientInitials: 'RH', date: '2026-05-07', description: 'Adobe Creative Cloud',      amount: '£54.98',   amountType: 'Debit', currentCategory: 'Business',       confidence: 88, status: 'Confirmed', reviewedAt: '2026-05-10 09:16' },
  { id: 'ci8',  client: 'Margaret Chen',     clientInitials: 'MC', date: '2026-05-07', description: 'Netflix',                   amount: '£17.99',   amountType: 'Debit', currentCategory: 'Entertainment',  confidence: 97, status: 'Confirmed', reviewedAt: '2026-05-09 14:30' },
  { id: 'ci9',  client: 'James Thornton',    clientInitials: 'JT', date: '2026-05-04', description: 'HMRC Payment Ref 29KX',     amount: '£890.00',  amountType: 'Debit', currentCategory: 'Tax',            confidence: 67, suggestedCategory: 'Other', status: 'Pending' },
  { id: 'ci10', client: 'Fatima Al-Rashid',  clientInitials: 'FR', date: '2026-05-03', description: 'Amazon Business Prime',     amount: '£340.00',  amountType: 'Debit', currentCategory: 'Shopping',       confidence: 58, suggestedCategory: 'Business', status: 'Overridden', overriddenTo: 'Business', reviewedAt: '2026-05-08 11:00' },
  { id: 'ci11', client: 'Helena Browne',     clientInitials: 'HB', date: '2026-05-01', description: 'Capital at Risk — Wealthify', amount: '£500.00', amountType: 'Debit', currentCategory: 'Savings',       confidence: 43, suggestedCategory: 'Investment', status: 'Pending' },
  { id: 'ci12', client: "Liam O'Brien",      clientInitials: 'LO', date: '2026-05-03', description: 'Aviva Investment Top-up',   amount: '£1,500.00', amountType: 'Debit', currentCategory: 'Savings',      confidence: 74, status: 'Pending' },
];

export const categorisationAuditLog = [
  { id: 'al1', timestamp: '2026-05-10 09:15', adviser: 'Sarah Mitchell', client: 'Robert Hannigan', description: 'HMRC Self Assessment', from: 'Tax', to: 'Tax', action: 'Confirmed' },
  { id: 'al2', timestamp: '2026-05-10 09:16', adviser: 'Sarah Mitchell', client: 'Robert Hannigan', description: 'Adobe Creative Cloud', from: 'Business', to: 'Business', action: 'Confirmed' },
  { id: 'al3', timestamp: '2026-05-09 14:30', adviser: 'Sarah Mitchell', client: 'Margaret Chen', description: 'Netflix', from: 'Entertainment', to: 'Entertainment', action: 'Confirmed' },
  { id: 'al4', timestamp: '2026-05-08 11:00', adviser: 'Sarah Mitchell', client: 'Fatima Al-Rashid', description: 'Amazon Business Prime', from: 'Shopping', to: 'Business', action: 'Overridden' },
  { id: 'al5', timestamp: '2026-05-07 16:20', adviser: 'Sarah Mitchell', client: 'David Okonkwo', description: 'Monthly Salary', from: 'Income', to: 'Income', action: 'Confirmed' },
];

export const auditLog = [
  { timestamp: '2026-05-13 09:12', user: 'Sarah Mitchell', action: 'View', target: 'Margaret Chen — Client Record', ip: '192.168.1.45' },
  { timestamp: '2026-05-13 09:45', user: 'Sarah Mitchell', action: 'Export', target: 'Q1 Spending Report — PDF', ip: '192.168.1.45' },
  { timestamp: '2026-05-13 10:02', user: 'Jonathan Sterling', action: 'Reassign', target: 'David Okonkwo → Marcus Vane', ip: '10.0.0.12' },
  { timestamp: '2026-05-13 10:15', user: 'Sarah Mitchell', action: 'Edit', target: 'Robert Hannigan — Private Note Added', ip: '192.168.1.45' },
  { timestamp: '2026-05-13 10:48', user: 'Sarah Mitchell', action: 'View', target: 'Sophia Andersson — Client Record', ip: '192.168.1.45' },
  { timestamp: '2026-05-13 11:10', user: 'Jonathan Sterling', action: 'View', target: 'Team Performance Report', ip: '10.0.0.12' },
  { timestamp: '2026-05-13 11:32', user: 'Sarah Mitchell', action: 'Export', target: 'My Clients List — CSV', ip: '192.168.1.45' },
  { timestamp: '2026-05-12 16:55', user: 'Sarah Mitchell', action: 'Edit', target: 'Emily Sutherland — Portfolio Proposal Updated', ip: '192.168.1.45' },
  { timestamp: '2026-05-12 15:40', user: 'Jonathan Sterling', action: 'Reassign', target: 'James Thornton → David Thompson', ip: '10.0.0.12' },
  { timestamp: '2026-05-12 14:20', user: 'Sarah Mitchell', action: 'Login', target: 'System Login', ip: '192.168.1.45' },
  { timestamp: '2026-05-12 13:00', user: 'Jonathan Sterling', action: 'Login', target: 'System Login', ip: '10.0.0.12' },
  { timestamp: '2026-05-12 10:05', user: 'Sarah Mitchell', action: 'View', target: 'James Thornton — Compliance Flag', ip: '192.168.1.45' },
  { timestamp: '2026-05-11 16:30', user: 'Sarah Mitchell', action: 'Edit', target: 'Noah Patel — Documentation Request Sent', ip: '192.168.1.45' },
  { timestamp: '2026-05-11 14:15', user: 'Jonathan Sterling', action: 'View', target: 'Escalations Queue', ip: '10.0.0.12' },
  { timestamp: '2026-05-11 09:50', user: 'Sarah Mitchell', action: 'Export', target: 'Calendar — May 2026 — PDF', ip: '192.168.1.45' },
];
