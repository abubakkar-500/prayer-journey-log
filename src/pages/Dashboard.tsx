import { useState } from "react";
import { PrayerCard } from "@/components/PrayerCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Moon, Sun, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Prayer {
  id: string;
  name: string;
  time: string;
  status?: "alone" | "imam" | "missed" | null;
}

const initialPrayers: Prayer[] = [
  { id: "fajr", name: "Fajr", time: "05:30 AM" },
  { id: "dhuhr", name: "Dhuhr", time: "12:45 PM" },
  { id: "asr", name: "Asr", time: "04:15 PM" },
  { id: "maghrib", name: "Maghrib", time: "06:30 PM" },
  { id: "isha", name: "Isha", time: "08:00 PM" },
];

interface DashboardProps {
  onNavigateToReport: () => void;
}

export function Dashboard({ onNavigateToReport }: DashboardProps) {
  const [prayers, setPrayers] = useState<Prayer[]>(initialPrayers);
  const { toast } = useToast();

  const getCurrentPrayerIndex = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const prayerTimes = [
      { id: "fajr", minutes: 5 * 60 + 30 },
      { id: "dhuhr", minutes: 12 * 60 + 45 },
      { id: "asr", minutes: 16 * 60 + 15 },
      { id: "maghrib", minutes: 18 * 60 + 30 },
      { id: "isha", minutes: 20 * 60 + 0 },
    ];

    for (let i = 0; i < prayerTimes.length; i++) {
      if (currentTime < prayerTimes[i].minutes) {
        return i;
      }
    }
    return 0; // Next day's Fajr
  };

  const currentPrayerIndex = getCurrentPrayerIndex();

  const handleStatusChange = (prayerId: string, status: "alone" | "imam" | "missed") => {
    setPrayers(prev => prev.map(prayer => 
      prayer.id === prayerId ? { ...prayer, status } : prayer
    ));

    const prayerName = prayers.find(p => p.id === prayerId)?.name;
    const statusText = status === "alone" ? "Prayed Alone" : status === "imam" ? "With Imam" : "Missed";
    
    toast({
      title: "Prayer Logged",
      description: `${prayerName} marked as: ${statusText}`,
    });
  };

  const resetAllPrayers = () => {
    setPrayers(prev => prev.map(prayer => ({ ...prayer, status: null })));
    toast({
      title: "Reset Complete",
      description: "All prayer statuses have been cleared for today",
    });
  };

  const completedPrayers = prayers.filter(p => p.status && p.status !== "missed").length;
  const missedPrayers = prayers.filter(p => p.status === "missed").length;

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">Prayer Tracker</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">
            Daily Prayers
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <CalendarDays className="w-4 h-4" />
            <span>{getCurrentDate()}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary-glow/5">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{completedPrayers}/5</div>
              <div className="text-sm text-muted-foreground">Completed Today</div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-prayer-missed/20 bg-gradient-to-r from-prayer-missed/5 to-destructive/5">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-prayer-missed mb-1">{missedPrayers}</div>
              <div className="text-sm text-muted-foreground">Missed Today</div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-accent/20 bg-gradient-to-r from-accent/5 to-secondary/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent-foreground mb-1">
                {Math.round((completedPrayers / 5) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Prayer Cards */}
        <div className="space-y-4 mb-8">
          {prayers.map((prayer, index) => (
            <PrayerCard
              key={prayer.id}
              name={prayer.name}
              time={prayer.time}
              status={prayer.status}
              onStatusChange={(status) => handleStatusChange(prayer.id, status)}
              isCurrentPrayer={index === currentPrayerIndex}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={resetAllPrayers}
            className="px-6 py-3 h-auto"
          >
            <Moon className="w-4 h-4 mr-2" />
            Reset Day
          </Button>
          
          <Button
            onClick={onNavigateToReport}
            className="px-6 py-3 h-auto bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Weekly Report
          </Button>
        </div>
      </div>
    </div>
  );
}