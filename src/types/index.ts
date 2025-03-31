
export type Codebase = {
  id: string;
  name: string;
  source: string;
  dateAdded: string;
  language: string;
  status: "analyzing" | "complete" | "error";
  repoUrl?: string;
};

export type AlarmSeverity = "critical" | "high" | "medium" | "low";

export type Alarm = {
  id: string;
  name: string;
  description: string;
  severity: AlarmSeverity;
  location: string;
  lineNumber: number;
  suggestion: string;
};

export type Report = {
  id: string;
  codebaseId: string;
  dateGenerated: string;
  status: "complete" | "processing";
  summary: {
    totalAlarms: number;
    criticalCount: number;
    highCount: number;
    mediumCount: number;
    lowCount: number;
    score: number;
  };
  alarms: Alarm[];
};
