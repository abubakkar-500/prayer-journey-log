import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrayerCardProps {
  name: string;
  time: string;
  status?: "alone" | "imam" | "missed" | null;
  onStatusChange: (status: "alone" | "imam" | "missed") => void;
  isCurrentPrayer?: boolean;
}

export function PrayerCard({ 
  name, 
  time, 
  status, 
  onStatusChange,
  isCurrentPrayer = false 
}: PrayerCardProps) {
  const getStatusBadge = () => {
    if (!status) return null;
    
    const variants = {
      alone: { icon: CheckCircle, text: "Prayed Alone", className: "bg-prayer-alone text-white" },
      imam: { icon: MapPin, text: "With Imam", className: "bg-prayer-imam text-white" },
      missed: { icon: X, text: "Missed", className: "bg-prayer-missed text-white" }
    };
    
    const variant = variants[status];
    const Icon = variant.icon;
    
    return (
      <Badge className={cn("gap-1.5 px-3 py-1", variant.className)}>
        <Icon className="w-3 h-3" />
        {variant.text}
      </Badge>
    );
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-lg border-2",
      isCurrentPrayer ? "border-primary bg-gradient-to-br from-primary/5 to-primary-glow/5 shadow-md" : "border-border",
      status && "border-opacity-30"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-3 h-3 rounded-full transition-colors",
              isCurrentPrayer ? "bg-primary animate-pulse" : "bg-muted"
            )} />
            <div>
              <CardTitle className="text-lg font-semibold">{name}</CardTitle>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-3 h-3" />
                {time}
              </div>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={status === "alone" ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusChange("alone")}
            className={cn(
              "h-9 text-xs font-medium transition-all",
              status === "alone" 
                ? "bg-prayer-alone hover:bg-prayer-alone/90 text-white border-prayer-alone" 
                : "hover:bg-prayer-alone/10 hover:text-prayer-alone hover:border-prayer-alone"
            )}
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Alone
          </Button>
          
          <Button
            variant={status === "imam" ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusChange("imam")}
            className={cn(
              "h-9 text-xs font-medium transition-all",
              status === "imam" 
                ? "bg-prayer-imam hover:bg-prayer-imam/90 text-white border-prayer-imam" 
                : "hover:bg-prayer-imam/10 hover:text-prayer-imam hover:border-prayer-imam"
            )}
          >
            <MapPin className="w-3 h-3 mr-1" />
            Imam
          </Button>
          
          <Button
            variant={status === "missed" ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusChange("missed")}
            className={cn(
              "h-9 text-xs font-medium transition-all",
              status === "missed" 
                ? "bg-prayer-missed hover:bg-prayer-missed/90 text-white border-prayer-missed" 
                : "hover:bg-prayer-missed/10 hover:text-prayer-missed hover:border-prayer-missed"
            )}
          >
            <X className="w-3 h-3 mr-1" />
            Missed
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}