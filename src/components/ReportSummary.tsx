
import React from "react";
import { Report } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertOctagonIcon, AlertCircleIcon, AlertTriangleIcon, InfoIcon } from "lucide-react";

interface ReportSummaryProps {
  report: Report;
}

const ReportSummary: React.FC<ReportSummaryProps> = ({ report }) => {
  const { summary } = report;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Security Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-full mb-2">
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(
                  ${getScoreColor(report.summary.score)} ${report.summary.score}%, 
                  #e5e7eb ${report.summary.score}%
                )`,
                clipPath: 'circle(50% at 50% 50%)'
              }}
            />
            <div className="relative w-24 h-24 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold">{report.summary.score}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Report generated on {new Date(report.dateGenerated).toLocaleDateString()}
          </p>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center mb-1">
              <AlertOctagonIcon className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-sm font-medium">Critical</span>
              <span className="ml-auto text-sm font-bold">{summary.criticalCount}</span>
            </div>
            <Progress value={(summary.criticalCount / summary.totalAlarms) * 100} className="h-2 bg-gray-100 dark:bg-gray-800">
              <div className="h-full bg-red-500 rounded-full" />
            </Progress>
          </div>
          
          <div>
            <div className="flex items-center mb-1">
              <AlertCircleIcon className="h-4 w-4 text-orange-500 mr-2" />
              <span className="text-sm font-medium">High</span>
              <span className="ml-auto text-sm font-bold">{summary.highCount}</span>
            </div>
            <Progress value={(summary.highCount / summary.totalAlarms) * 100} className="h-2 bg-gray-100 dark:bg-gray-800">
              <div className="h-full bg-orange-500 rounded-full" />
            </Progress>
          </div>
          
          <div>
            <div className="flex items-center mb-1">
              <AlertTriangleIcon className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium">Medium</span>
              <span className="ml-auto text-sm font-bold">{summary.mediumCount}</span>
            </div>
            <Progress value={(summary.mediumCount / summary.totalAlarms) * 100} className="h-2 bg-gray-100 dark:bg-gray-800">
              <div className="h-full bg-yellow-500 rounded-full" />
            </Progress>
          </div>
          
          <div>
            <div className="flex items-center mb-1">
              <InfoIcon className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-sm font-medium">Low</span>
              <span className="ml-auto text-sm font-bold">{summary.lowCount}</span>
            </div>
            <Progress value={(summary.lowCount / summary.totalAlarms) * 100} className="h-2 bg-gray-100 dark:bg-gray-800">
              <div className="h-full bg-blue-500 rounded-full" />
            </Progress>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to get color based on score
const getScoreColor = (score: number) => {
  if (score >= 90) return "#22c55e"; // green-500
  if (score >= 70) return "#84cc16"; // lime-500
  if (score >= 50) return "#eab308"; // yellow-500
  if (score >= 30) return "#f97316"; // orange-500
  return "#ef4444"; // red-500
};

export default ReportSummary;
