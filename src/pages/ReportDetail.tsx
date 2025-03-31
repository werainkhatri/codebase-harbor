
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getReportById, getCodebaseById } from "@/utils/mockData";
import AlarmItem from "@/components/AlarmItem";
import ReportSummary from "@/components/ReportSummary";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon, RefreshCwIcon, DownloadIcon, GitBranchIcon, ActivityIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ReportDetail = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const report = id ? getReportById(id) : undefined;
  console.log(getReportById(id));
  const codebase = id ? getCodebaseById(id) : undefined;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!report || !codebase) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Report Not Found</h1>
        <p className="mb-6">The report you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  const filteredAlarms = activeTab === "all"
    ? report.alarms
    : report.alarms.filter(alarm => alarm.severity === activeTab);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mr-4">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{codebase.name}</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            {codebase.source === "GitHub" && (
              <>
                <GitBranchIcon className="h-4 w-4 mr-1" />
                <span className="mr-2">{codebase.repoUrl}</span>
              </>
            )}
            <ActivityIcon className="h-4 w-4 mr-1" />
            <span>Last scan: {new Date(report.dateGenerated).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {loading ? (
            <Skeleton className="h-[400px] w-full rounded-lg" />
          ) : (
            <>
              <ReportSummary report={report} />

              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {}}
                  >
                    <RefreshCwIcon className="h-4 w-4 mr-2" />
                    Rescan Codebase
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {}}
                  >
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Alarms</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All ({report.alarms.length})</TabsTrigger>
                  <TabsTrigger value="critical">Critical ({report.summary.criticalCount})</TabsTrigger>
                  <TabsTrigger value="high">High ({report.summary.highCount})</TabsTrigger>
                  <TabsTrigger value="medium">Medium ({report.summary.mediumCount})</TabsTrigger>
                  <TabsTrigger value="low">Low ({report.summary.lowCount})</TabsTrigger>
                </TabsList>

                <Separator className="mb-4" />

                <TabsContent value={activeTab}>
                  {loading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-24 w-full rounded-lg" />
                      ))}
                    </div>
                  ) : filteredAlarms.length > 0 ? (
                    <div>
                      {filteredAlarms.map((alarm) => (
                        <AlarmItem key={alarm.id} alarm={alarm} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <h3 className="text-lg font-medium mb-2">No alarms found</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        No {activeTab !== "all" ? activeTab : ""} alarms were detected in this codebase.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
