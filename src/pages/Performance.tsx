import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus, Target, BarChart3, LineChart } from "lucide-react";

const mockSubjects = [
  { name: "Mathematics", grade: "A", gpa: 4.0, strength: 92, trend: "up", weaknesses: ["Calculus", "Statistics"] },
  { name: "English", grade: "B+", gpa: 3.5, strength: 85, trend: "stable", weaknesses: ["Essay Writing"] },
  { name: "Kiswahili", grade: "A-", gpa: 3.7, strength: 88, trend: "up", weaknesses: ["Poetry Analysis"] },
  { name: "Biology", grade: "A", gpa: 4.0, strength: 90, trend: "up", weaknesses: [] },
  { name: "Chemistry", grade: "B", gpa: 3.0, strength: 75, trend: "down", weaknesses: ["Organic Chemistry", "Equations"] },
  { name: "Physics", grade: "B+", gpa: 3.5, strength: 82, trend: "stable", weaknesses: ["Electromagnetism"] },
  { name: "History", grade: "A-", gpa: 3.7, strength: 87, trend: "up", weaknesses: ["Dates & Events"] },
  { name: "Geography", grade: "B+", gpa: 3.5, strength: 83, trend: "stable", weaknesses: ["Map Reading"] },
];

const Performance = () => {
  const overallGPA = 3.6;
  const totalSubjects = mockSubjects.length;
  const trend = "improving";

  const getGradeColor = (gpa: number) => {
    if (gpa >= 3.5) return "text-success";
    if (gpa >= 2.5) return "text-warning";
    return "text-destructive";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStrengthColor = (strength: number) => {
    if (strength >= 85) return "bg-success";
    if (strength >= 70) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Performance Overview</h1>
            <p className="text-muted-foreground mt-1">
              Track your academic progress across all subjects
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/performance/trends">
              <Button variant="outline" size="lg">
                <LineChart className="w-5 h-5 mr-2" />
                View Trends
              </Button>
            </Link>
            <Link to="/performance/predictions">
              <Button variant="outline" size="lg">
                <Target className="w-5 h-5 mr-2" />
                Predictions
              </Button>
            </Link>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription>Overall GPA</CardDescription>
              <CardTitle className={`text-4xl ${getGradeColor(overallGPA)}`}>
                {overallGPA.toFixed(1)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Based on {totalSubjects} subjects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Total Subjects</CardDescription>
              <CardTitle className="text-4xl">{totalSubjects}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Actively tracked
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Performance Trend</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-success" />
                {trend.charAt(0).toUpperCase() + trend.slice(1)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Compared to last term
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Subject Performance Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Subject Performance</h2>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Compare All
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockSubjects.map((subject) => (
              <Card key={subject.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{subject.name}</CardTitle>
                      <CardDescription className="mt-1">
                        Strength Score: {subject.strength}/100
                      </CardDescription>
                    </div>
                    {getTrendIcon(subject.trend)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Grade</span>
                    <Badge className={getGradeColor(subject.gpa)}>
                      {subject.grade}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Strength</span>
                      <span className="font-medium">{subject.strength}%</span>
                    </div>
                    <Progress value={subject.strength} className={getStrengthColor(subject.strength)} />
                  </div>

                  {subject.weaknesses.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">
                        Areas to Improve:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {subject.weaknesses.map((weakness) => (
                          <Badge key={weakness} variant="outline" className="text-xs">
                            {weakness}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Performance;
