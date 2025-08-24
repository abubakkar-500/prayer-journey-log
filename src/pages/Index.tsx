import { useState } from "react";
import { Dashboard } from "./Dashboard";
import { WeeklyReport } from "@/components/WeeklyReport";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState<"dashboard" | "report">("dashboard");

  if (currentView === "report") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setCurrentView("dashboard")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Weekly Prayer Report
            </h1>
          </div>
          <WeeklyReport />
        </div>
      </div>
    );
  }

  return (
    <Dashboard onNavigateToReport={() => setCurrentView("report")} />
  );
};

export default Index;