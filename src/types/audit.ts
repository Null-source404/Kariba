export type AuditCategory = 'a11y' | 'design' | 'layout' | 'typography' | 'interaction';

export type IssueSeverity = 'critical' | 'warning' | 'info';

export interface AuditIssue {
  id: string;
  category: AuditCategory;
  severity: IssueSeverity;
  title: string;
  description: string;
  recommendation: string;
  codeSnippet?: string;
  fixedCodeSnippet?: string;
  ruleReference: string;
}

export interface AuditResult {
  score: number;
  totalIssues: number;
  criticalCount: number;
  warningCount: number;
  infoCount: number;
  categoryScores: Record<AuditCategory, number>;
  issues: AuditIssue[];
}

export interface CodeTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  badCode: string;
  improvedCode: string;
  highlights: string[];
}
