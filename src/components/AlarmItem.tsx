
import React, { useState } from "react";
import { Alarm } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon, FileTextIcon, AlertCircleIcon, AlertTriangleIcon, AlertOctagonIcon } from "lucide-react";

interface AlarmItemProps {
  alarm: Alarm;
}

const AlarmItem: React.FC<AlarmItemProps> = ({ alarm }) => {
  const [expanded, setExpanded] = useState(false);

  const getSeverityColor = (severity: Alarm["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSeverityIcon = (severity: Alarm["severity"]) => {
    switch (severity) {
      case "critical":
        return <AlertOctagonIcon className="h-4 w-4" />;
      case "high":
        return <AlertCircleIcon className="h-4 w-4" />;
      case "medium":
        return <AlertTriangleIcon className="h-4 w-4" />;
      case "low":
        return <AlertTriangleIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="py-3 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge className={`${getSeverityColor(alarm.severity)} flex items-center gap-1`}>
              {getSeverityIcon(alarm.severity)}
              {alarm.severity}
            </Badge>
            <CardTitle className="text-base font-medium">{alarm.name}</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Collapse details" : "Expand details"}
          >
            {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className={`px-4 ${expanded ? 'py-4' : 'py-2'}`}>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <FileTextIcon className="h-4 w-4 mr-1" />
          <span>
            {alarm.location} (line {alarm.lineNumber})
          </span>
        </div>
        
        {expanded && (
          <div className="mt-3 space-y-3">
            <div>
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <p className="text-sm text-muted-foreground">{alarm.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Suggestion</h4>
              <p className="text-sm text-muted-foreground">{alarm.suggestion}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlarmItem;
