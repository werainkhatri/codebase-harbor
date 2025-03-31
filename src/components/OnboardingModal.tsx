
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { GitBranchIcon, UploadIcon } from "lucide-react";

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ 
  open, 
  onOpenChange,
  onSuccess
}) => {
  const [activeTab, setActiveTab] = useState("github");
  const [repoUrl, setRepoUrl] = useState("");
  const [projectName, setProjectName] = useState("");
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setUploading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUploading(false);
      
      toast({
        title: "Codebase added successfully",
        description: "We've started analyzing your codebase. You'll receive a notification when it's complete.",
      });
      
      onOpenChange(false);
      onSuccess();
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add a Codebase</DialogTitle>
          <DialogDescription>
            Connect or upload your code to begin the audit process
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="github" className="flex items-center gap-2">
              <GitHubLogoIcon className="h-4 w-4" />
              GitHub
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <UploadIcon className="h-4 w-4" />
              Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="github" className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="repo-url">Repository URL</Label>
                  <div className="flex items-center space-x-2">
                    <GitBranchIcon className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="repo-url"
                      placeholder="https://github.com/user/repo"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="Frontend Service"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <DialogFooter>
                <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? "Adding..." : "Add Repository"}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="upload" className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="project-name-upload">Project Name</Label>
                  <Input
                    id="project-name-upload"
                    placeholder="Backend API"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Source Code</Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 flex flex-col items-center justify-center gap-2">
                    <UploadIcon className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Drag and drop your code archive here</p>
                    <p className="text-xs text-muted-foreground">(or click to browse)</p>
                    <Input 
                      type="file" 
                      className="hidden" 
                      id="file-upload" 
                      accept=".zip,.tar.gz"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      type="button"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <DialogFooter>
                <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? "Uploading..." : "Upload Code"}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
