
import React from "react";
import { Codebase } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitBranchIcon, AlertCircleIcon, CheckCircleIcon, LoaderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CodebaseCardProps {
  codebase: Codebase;
}

const CodebaseCard: React.FC<CodebaseCardProps> = ({ codebase }) => {
  const navigate = useNavigate();

  const getStatusIcon = () => {
    switch (codebase.status) {
      case "complete":
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case "analyzing":
        return <LoaderIcon className="h-5 w-5 text-blue-500 animate-spin" />;
      case "error":
        return <AlertCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{codebase.name}</CardTitle>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <Badge variant={codebase.status === "analyzing" ? "outline" : "default"} className={
              codebase.status === "complete" ? "bg-green-500" : 
              codebase.status === "analyzing" ? "text-blue-500 border-blue-500" :
              "bg-red-500"
            }>
              {codebase.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-muted-foreground">Language:</div>
          <div>{codebase.language}</div>
          <div className="text-muted-foreground">Source:</div>
          <div className="flex items-center">
            {codebase.source === "GitHub" && <GitBranchIcon className="h-4 w-4 mr-1" />}
            {codebase.source}
          </div>
          <div className="text-muted-foreground">Added:</div>
          <div>{new Date(codebase.dateAdded).toLocaleDateString()}</div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="default" 
          className="w-full"
          onClick={() => navigate(`/report/${codebase.id}`)}
          disabled={codebase.status !== "complete"}
        >
          View Report
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CodebaseCard;
