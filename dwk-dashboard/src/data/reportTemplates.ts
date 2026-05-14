export type ReportCategory = 'Performance' | 'Compliance' | 'Financial' | 'Client' | 'Operations';

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: ReportCategory;
  metrics: string[];
  isPrebuilt: boolean;
}

export const tmTemplates: ReportTemplate[] = [
  {
    id: 'tm-perf',
    name: 'Team Performance Report',
    description: 'Adviser satisfaction scores, response times, capacity utilisation, and complaints across the team.',
    category: 'Performance',
    metrics: ['CSAT scores', 'Avg response time', 'Capacity utilisation', 'Complaints'],
    isPrebuilt: true,
  },
  {
    id: 'tm-aum',
    name: 'AUM Growth Report',
    description: 'Total AUM trend, breakdown by adviser and client segment, quarter-on-quarter growth.',
    category: 'Financial',
    metrics: ['Total AUM', 'AUM by adviser', 'AUM by segment', 'QoQ growth %'],
    isPrebuilt: true,
  },
  {
    id: 'tm-compliance',
    name: 'Compliance Summary',
    description: 'KYC completion rates, suitability assessments, AML checks, and overdue items by adviser.',
    category: 'Compliance',
    metrics: ['KYC completion', 'Suitability rate', 'AML checks', 'Overdue items'],
    isPrebuilt: true,
  },
  {
    id: 'tm-csat',
    name: 'Client Satisfaction Report',
    description: 'CSAT trends over time, satisfaction scores by adviser, complaint resolution rates.',
    category: 'Client',
    metrics: ['Avg CSAT', 'CSAT by adviser', 'Complaint rate', 'Resolution time'],
    isPrebuilt: true,
  },
  {
    id: 'tm-leaderboard',
    name: 'Adviser Leaderboard',
    description: 'Ranked adviser comparison by satisfaction, AUM, client retention, and overall score.',
    category: 'Performance',
    metrics: ['Satisfaction rank', 'AUM rank', 'Retention rate', 'Composite score'],
    isPrebuilt: true,
  },
  {
    id: 'tm-escalations',
    name: 'Escalations Report',
    description: 'Escalation volume, type breakdown, resolution times, and adviser-level escalation rates.',
    category: 'Operations',
    metrics: ['Total escalations', 'Type breakdown', 'Avg resolution time', 'Open vs closed'],
    isPrebuilt: true,
  },
];

export const faTemplates: ReportTemplate[] = [
  {
    id: 'fa-spending',
    name: 'Spending Analysis Report',
    description: 'Client spending patterns by category, income vs. expenditure, and month-on-month trends.',
    category: 'Financial',
    metrics: ['Avg monthly spend', 'Spending categories', 'Income vs spend', 'Savings rate'],
    isPrebuilt: true,
  },
  {
    id: 'fa-compliance',
    name: 'Compliance Activity Report',
    description: 'KYC status, suitability assessments, annual reviews completion, and flagged items.',
    category: 'Compliance',
    metrics: ['KYC status', 'Suitability done', 'Reviews completed', 'Open flags'],
    isPrebuilt: true,
  },
  {
    id: 'fa-reviews',
    name: 'Client Review Summary',
    description: 'Annual and quarterly review completion rates, upcoming reviews, and overdue status.',
    category: 'Client',
    metrics: ['Reviews completed', 'Reviews due', 'Overdue reviews', 'Avg completion time'],
    isPrebuilt: true,
  },
  {
    id: 'fa-savings',
    name: 'Client Savings & Goals Report',
    description: 'Savings rates, ISA and pension contributions, and progress towards financial goals.',
    category: 'Financial',
    metrics: ['Avg savings rate', 'ISA contributions', 'Pension contributions', 'Goals progress'],
    isPrebuilt: true,
  },
];

export const tmMetricOptions = [
  'CSAT scores', 'Avg response time', 'Capacity utilisation', 'Complaints count',
  'Total AUM', 'AUM by adviser', 'AUM by segment', 'QoQ growth %',
  'KYC completion', 'Suitability rate', 'AML checks', 'Overdue items',
  'Complaint rate', 'Resolution time', 'Retention rate', 'Team size',
  'Total escalations', 'Open escalations', 'Critical escalations', 'Adviser productivity',
];

export const faMetricOptions = [
  'Total AUM', 'AUM by client', 'Portfolio allocation', 'Performance vs benchmark',
  'Avg monthly spend', 'Spending categories', 'Income vs spend', 'Savings rate',
  'KYC status', 'Suitability done', 'Reviews completed', 'Open flags',
  'Reviews due', 'Overdue reviews', 'ISA contributions', 'Pension contributions',
  'Client satisfaction', 'Avg response time', 'Net new clients', 'Client retention',
];
