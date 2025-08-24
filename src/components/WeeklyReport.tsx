import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, X, TrendingUp, Calendar } from "lucide-react";

interface WeeklyStats {
  prayer: string;
  alone: number;
  imam: number;
  missed: number;
  total: number;
}

const mockWeeklyData: WeeklyStats[] = [
  { prayer: "Fajr", alone: 3, imam: 2, missed: 2, total: 7 },
  { prayer: "Dhuhr", alone: 4, imam: 1, missed: 2, total: 7 },
  { prayer: "Asr", alone: 2, imam: 3, missed: 2, total: 7 },
  { prayer: "Maghrib", alone: 1, imam: 4, missed: 2, total: 7 },
  { prayer: "Isha", alone: 3, imam: 1, missed: 3, total: 7 },
];

export function WeeklyReport() {
  const totalPrayers = mockWeeklyData.reduce((sum, stat) => sum + stat.total, 0);
  const totalPrayed = mockWeeklyData.reduce((sum, stat) => sum + stat.alone + stat.imam, 0);
  const completionRate = Math.round((totalPrayed / totalPrayers) * 100);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary-glow/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold text-primary">{completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-prayer-imam/20 bg-gradient-to-br from-prayer-imam/5 to-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-prayer-imam/10 rounded-lg">
                <MapPin className="w-5 h-5 text-prayer-imam" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">With Imam</p>
                <p className="text-2xl font-bold text-prayer-imam">
                  {mockWeeklyData.reduce((sum, stat) => sum + stat.imam, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-prayer-alone/20 bg-gradient-to-br from-prayer-alone/5 to-primary-glow/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-prayer-alone/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-prayer-alone" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Prayed Alone</p>
                <p className="text-2xl font-bold text-prayer-alone">
                  {mockWeeklyData.reduce((sum, stat) => sum + stat.alone, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Report */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <CardTitle>Weekly Prayer Report</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-semibold">Prayer</th>
                  <th className="text-center py-3 px-2 font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      <CheckCircle className="w-4 h-4 text-prayer-alone" />
                      Alone
                    </div>
                  </th>
                  <th className="text-center py-3 px-2 font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      <MapPin className="w-4 h-4 text-prayer-imam" />
                      With Imam
                    </div>
                  </th>
                  <th className="text-center py-3 px-2 font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      <X className="w-4 h-4 text-prayer-missed" />
                      Missed
                    </div>
                  </th>
                  <th className="text-center py-3 px-2 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {mockWeeklyData.map((stat, index) => (
                  <tr key={stat.prayer} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-2">
                      <div className="font-medium">{stat.prayer}</div>
                    </td>
                    <td className="text-center py-4 px-2">
                      <Badge variant="outline" className="bg-prayer-alone/10 text-prayer-alone border-prayer-alone/30">
                        {stat.alone}
                      </Badge>
                    </td>
                    <td className="text-center py-4 px-2">
                      <Badge variant="outline" className="bg-prayer-imam/10 text-prayer-imam border-prayer-imam/30">
                        {stat.imam}
                      </Badge>
                    </td>
                    <td className="text-center py-4 px-2">
                      <Badge variant="outline" className="bg-prayer-missed/10 text-prayer-missed border-prayer-missed/30">
                        {stat.missed}
                      </Badge>
                    </td>
                    <td className="text-center py-4 px-2">
                      <span className="font-medium">{stat.total}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}