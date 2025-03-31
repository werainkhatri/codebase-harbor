
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { GitBranchIcon, UploadIcon, GithubIcon } from "lucide-react";

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
  const [bindleId, setBindleId] = useState("");
  const [applicationName, setApplicationName] = useState("");
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
          <DialogTitle className="text-xl">Add an Application</DialogTitle>
          <DialogDescription>
            Register your software application's Bindle Id to begin the audit process.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="repo-url">Bindle Id</Label>
              <div className="flex items-center space-x-2">
                <GitBranchIcon className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="repo-url"
                  placeholder="amzn1.bindle.resource.<id>"
                  value={bindleId}
                  onChange={(e) => setBindleId(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-name">Application Name</Label>
              <Input
                id="project-name"
                placeholder="MyAwesomeApplication"
                value={applicationName}
                onChange={(e) => setApplicationName(e.target.value)}
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
              {uploading ? "Adding..." : "Add Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
