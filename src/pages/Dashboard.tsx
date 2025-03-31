
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, FilterIcon, RefreshCwIcon } from "lucide-react";
import CodebaseCard from "@/components/CodebaseCard";
import OnboardingModal from "@/components/OnboardingModal";
import { mockCodebases } from "@/utils/mockData";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [codebases, setCodebases] = useState(mockCodebases);
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredCodebases = filterStatus === "all" 
    ? codebases 
    : codebases.filter(codebase => codebase.status === filterStatus);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Codebases</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage and monitor all your connected codebases
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            onClick={() => setIsOnboardingOpen(true)}
            className="flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Codebase
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Tabs defaultValue="all" value={filterStatus} onValueChange={setFilterStatus}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="complete">Complete</TabsTrigger>
            <TabsTrigger value="analyzing">Analyzing</TabsTrigger>
            <TabsTrigger value="error">Error</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <FilterIcon className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Newest First</DropdownMenuItem>
              <DropdownMenuItem>Oldest First</DropdownMenuItem>
              <DropdownMenuItem>A-Z</DropdownMenuItem>
              <DropdownMenuItem>Z-A</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="ghost" 
            size="icon"
            title="Refresh"
          >
            <RefreshCwIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator className="mb-6" />

      {filteredCodebases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCodebases.map((codebase) => (
            <CodebaseCard key={codebase.id} codebase={codebase} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No codebases found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {filterStatus === "all" 
              ? "You haven't added any codebases yet." 
              : `No codebases with status "${filterStatus}" found.`}
          </p>
          {filterStatus === "all" && (
            <Button 
              onClick={() => setIsOnboardingOpen(true)}
              className="flex items-center mx-auto"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Your First Codebase
            </Button>
          )}
        </div>
      )}

      <OnboardingModal
        open={isOnboardingOpen}
        onOpenChange={setIsOnboardingOpen}
        onSuccess={() => {
          // In a real app, we would fetch the updated list of codebases
          // For now, we'll just close the modal
        }}
      />
    </div>
  );
};

export default Dashboard;
