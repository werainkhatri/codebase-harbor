
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldCheckIcon, CodeIcon, AlertTriangleIcon, ActivityIcon, UploadIcon, FileTextIcon } from "lucide-react";
import OnboardingModal from "@/components/OnboardingModal";
import Navbar from "@/components/Navbar";

const Index = () => {
  const navigate = useNavigate();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section with the uploaded image */}
      <section className="relative text-white">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          className="relative w-full bg-cover bg-center min-h-[600px] flex items-center"
          style={{ backgroundImage: "url('/lovable-uploads/1a9c81b5-42c5-435a-95cf-8a6f29b6e4e5.jpeg')" }}
        >
          <div className="container mx-auto max-w-6xl px-4 py-16 lg:py-24 z-20 relative">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold mb-4 md:text-5xl lg:text-6xl drop-shadow-lg">
                  Detect Service Issues in Your Code
                </h1>
                <p className="text-xl mb-8 text-white drop-shadow-md">
                  Automatically audit your codebase for service system issues, security vulnerabilities, and performance bottlenecks.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-yellow-500 text-blue-900 hover:bg-yellow-400"
                    onClick={() => setIsOnboardingOpen(true)}
                  >
                    Start Audit Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-white border-white hover:bg-white/10"
                    onClick={() => navigate('/dashboard')}
                  >
                    View Dashboard
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg opacity-50 blur"></div>
                  <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <ShieldCheckIcon className="h-8 w-8 text-blue-600 mr-3" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Score</h3>
                        <div className="ml-auto flex items-center justify-center rounded-full w-12 h-12 bg-blue-100 dark:bg-blue-900">
                          <span className="text-blue-600 dark:text-blue-400 font-bold">85</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <AlertTriangleIcon className="h-4 w-4 text-red-500 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">Critical issues detected</span>
                          <span className="ml-auto font-semibold text-gray-900 dark:text-white">2</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ActivityIcon className="h-4 w-4 text-orange-500 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">Performance issues</span>
                          <span className="ml-auto font-semibold text-gray-900 dark:text-white">5</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <CodeIcon className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">Files analyzed</span>
                          <span className="ml-auto font-semibold text-gray-900 dark:text-white">127</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center mb-4">
                <UploadIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Connect Your Code</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Upload your code or connect your GitHub repository to begin the automated audit process.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center mb-4">
                <ActivityIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Automated Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our system scans your codebase for service issues, security vulnerabilities, and performance bottlenecks.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center mb-4">
                <FileTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Detailed Reports</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get comprehensive reports with actionable insights and recommendations to improve your code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to secure your codebase?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Start your first audit today and get actionable insights to improve your code's security and performance.
          </p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsOnboardingOpen(true)}
          >
            Start Free Audit
          </Button>
        </div>
      </section>

      <OnboardingModal
        open={isOnboardingOpen}
        onOpenChange={setIsOnboardingOpen}
        onSuccess={() => navigate('/dashboard')}
      />
    </div>
  );
};

export default Index;
