import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Award,
  BookOpen,
  Upload,
  Brain,
  Compass,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your academic performance
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Overall GPA
              </CardTitle>
              <Award className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">3.85</div>
              <div className="flex items-center text-sm text-success mt-1">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span>0.12 from last term</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Subjects
              </CardTitle>
              <BookOpen className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">8</div>
              <p className="text-sm text-muted-foreground mt-1">Active this term</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Strong Subjects
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">5</div>
              <p className="text-sm text-muted-foreground mt-1">A or B+ grade</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Weak Subjects
              </CardTitle>
              <ArrowDownRight className="w-4 h-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">2</div>
              <p className="text-sm text-muted-foreground mt-1">Need attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Reports */}
          <Card className="lg:col-span-2 border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recent Reports</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { term: "Term 3", year: 2024, gpa: 3.92, subjects: 8, trend: "up" },
                { term: "Term 2", year: 2024, gpa: 3.80, subjects: 8, trend: "up" },
                { term: "Term 1", year: 2024, gpa: 3.65, subjects: 8, trend: "down" },
              ].map((report, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {report.term} {report.year}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {report.subjects} subjects
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-foreground">{report.gpa}</div>
                    <Badge variant={report.trend === "up" ? "default" : "secondary"} className="mt-1">
                      {report.trend === "up" ? "↑" : "↓"} GPA
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start h-auto py-4" 
                variant="outline"
                onClick={() => navigate("/reports/upload")}
              >
                <Upload className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Upload Report</div>
                  <div className="text-xs text-muted-foreground">Add your latest grades</div>
                </div>
              </Button>
              <Button 
                className="w-full justify-start h-auto py-4" 
                variant="outline"
                onClick={() => navigate("/flashcards/generate")}
              >
                <Brain className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Generate Flashcards</div>
                  <div className="text-xs text-muted-foreground">Study smarter</div>
                </div>
              </Button>
              <Button 
                className="w-full justify-start h-auto py-4" 
                variant="outline"
                onClick={() => navigate("/career")}
              >
                <Compass className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Career Recommendations</div>
                  <div className="text-xs text-muted-foreground">Explore your future</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Performance Trend & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Subject Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { subject: "Mathematics", grade: "A", progress: 92, color: "bg-success" },
                { subject: "English", grade: "A-", progress: 88, color: "bg-success" },
                { subject: "Physics", grade: "B+", progress: 82, color: "bg-info" },
                { subject: "Chemistry", grade: "B", progress: 75, color: "bg-info" },
                { subject: "Biology", grade: "C+", progress: 68, color: "bg-warning" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{item.subject}</span>
                    <Badge variant="outline">{item.grade}</Badge>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  type: "Feedback",
                  message: "Great progress in Mathematics! Keep up the excellent work.",
                  color: "bg-success/10 text-success",
                },
                {
                  type: "Tip",
                  message: "Try dedicating 30 minutes daily to Biology revision.",
                  color: "bg-info/10 text-info",
                },
                {
                  type: "Recommendation",
                  message: "Based on your performance, consider exploring STEM careers.",
                  color: "bg-primary/10 text-primary",
                },
              ].map((insight, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <Badge className={cn("mb-2", insight.color)}>{insight.type}</Badge>
                  <p className="text-sm text-foreground">{insight.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
