
import { Alarm, AlarmSeverity, Codebase, Report } from "@/types";

export const mockCodebases: Codebase[] = [
  {
    id: "code-1",
    name: "Frontend Service",
    source: "GitHub",
    dateAdded: "2023-11-15",
    language: "TypeScript",
    status: "complete",
    repoUrl: "https://github.com/user/frontend-service"
  },
  {
    id: "code-2",
    name: "Authentication API",
    source: "GitHub",
    dateAdded: "2023-11-10",
    language: "Python",
    status: "complete",
    repoUrl: "https://github.com/user/auth-api"
  },
  {
    id: "code-3",
    name: "Payment Service",
    source: "Upload",
    dateAdded: "2023-11-05",
    language: "Java",
    status: "analyzing"
  }
];

const createAlarm = (
  id: string,
  name: string,
  description: string,
  severity: AlarmSeverity,
  location: string,
  lineNumber: number,
  suggestion: string
): Alarm => ({
  id,
  name,
  description,
  severity,
  location,
  lineNumber,
  suggestion
});

export const mockAlarms: Record<string, Alarm[]> = {
  "code-1": [
    createAlarm(
      "alarm-1",
      "Unhandled Error",
      "Exception is caught but not properly logged or handled",
      "high",
      "src/services/api.ts",
      45,
      "Implement proper error handling with logging and user feedback"
    ),
    createAlarm(
      "alarm-2",
      "Memory Leak",
      "Event listeners are not being properly removed",
      "critical",
      "src/components/DataTable.tsx",
      127,
      "Use useEffect cleanup function to remove event listeners"
    ),
    createAlarm(
      "alarm-3",
      "Insecure Authentication",
      "Plain text passwords in code",
      "critical",
      "src/auth/login.ts",
      23,
      "Use secure environment variables and never hardcode credentials"
    ),
    createAlarm(
      "alarm-4",
      "Performance Issue",
      "Inefficient rendering causing unnecessary re-renders",
      "medium",
      "src/components/Dashboard.tsx",
      78,
      "Implement React.memo or useMemo to prevent unnecessary re-renders"
    ),
    createAlarm(
      "alarm-5",
      "Dead Code",
      "Unused function that's never called",
      "low",
      "src/utils/helpers.ts",
      156,
      "Remove or refactor unused code to improve maintainability"
    )
  ],
  "code-2": [
    createAlarm(
      "alarm-6",
      "SQL Injection",
      "Raw SQL query with user input",
      "critical",
      "app/database/queries.py",
      34,
      "Use parameterized queries or an ORM to prevent SQL injection attacks"
    ),
    createAlarm(
      "alarm-7",
      "Rate Limiting Bypass",
      "Authentication endpoints lack rate limiting",
      "high",
      "app/routes/auth.py",
      56,
      "Implement rate limiting to prevent brute force attacks"
    ),
    createAlarm(
      "alarm-8",
      "Debug Mode",
      "Application running in debug mode in production",
      "high",
      "config/settings.py",
      12,
      "Ensure debug mode is disabled in production environments"
    )
  ]
};

export const mockReports: Report[] = [
  {
    id: "report-1",
    codebaseId: "code-1",
    dateGenerated: "2023-11-16",
    status: "complete",
    summary: {
      totalAlarms: 5,
      criticalCount: 2,
      highCount: 1,
      mediumCount: 1,
      lowCount: 1,
      score: 65
    },
    alarms: mockAlarms["code-1"]
  },
  {
    id: "report-2",
    codebaseId: "code-2",
    dateGenerated: "2023-11-11",
    status: "complete",
    summary: {
      totalAlarms: 3,
      criticalCount: 1,
      highCount: 2,
      mediumCount: 0,
      lowCount: 0,
      score: 58
    },
    alarms: mockAlarms["code-2"]
  },
  {
    id: "report-3",
    codebaseId: "code-3",
    dateGenerated: "2023-11-06",
    status: "processing",
    summary: {
      totalAlarms: 0,
      criticalCount: 0,
      highCount: 0,
      mediumCount: 0,
      lowCount: 0,
      score: 0
    },
    alarms: []
  }
];

export const getReportById = (id: string): Report | undefined => {
  return mockReports.find(report => report.id === id);
};

export const getCodebaseById = (id: string): Codebase | undefined => {
  return mockCodebases.find(codebase => codebase.id === id);
};
