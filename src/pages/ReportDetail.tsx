import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Calendar,
  Lightbulb,
  Target,
  AlertCircle,
} from "lucide-react";

const mockReportData = {
  id: "1",
  term: "Term 3",
  year: "2024",
  dateUploaded: "2024-01-15",
  overallGPA: 3.8,
  subjects: [
    { name: "Mathematics", grade: "A", gpa: 4.0, trend: "up" },
    { name: "English", grade: "A-", gpa: 3.7, trend: "up" },
    { name: "Kiswahili", grade: "B+", gpa: 3.3, trend: "stable" },
    { name: "Biology", grade: "A", gpa: 4.0, trend: "up" },
    { name: "Chemistry", grade: "A-", gpa: 3.7, trend: "stable" },
    { name: "Physics", grade: "B+", gpa: 3.3, trend: "down" },
    { name: "History", grade: "B", gpa: 3.0, trend: "stable" },
    { name: "Geography", grade: "A-", gpa: 3.7, trend: "up" },
  ],
  strongSubjects: ["Mathematics", "Biology"],
  weakSubjects: ["History", "Physics"],
  recommendations: [
    "Focus more time on Physics - consider joining study groups",
    "Maintain consistent performance in Mathematics and Biology",
    "Practice more History essays to improve analytical writing",
  ],
};

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getGradeColor = (gpa: number) => {
    if (gpa >= 3.5) return "text-success";
    if (gpa >= 2.5) return "text-warning";
    return "text-destructive";
  };

  const getGradeBadge = (gpa: number) => {
    if (gpa >= 3.5) return "default";
    if (gpa >= 2.5) return "secondary";
    return "destructive";
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

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/reports")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {mockReportData.term} {mockReportData.year}
              </h1>
              <p className="text-muted-foreground mt-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Uploaded on {new Date(mockReportData.dateUploaded).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>

        {/* Overall GPA */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Overall GPA</p>
              <p className="text-6xl font-bold text-primary">
                {mockReportData.overallGPA.toFixed(1)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {mockReportData.subjects.length} Subjects
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Grades Table */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Grades</CardTitle>
            <CardDescription>
              Detailed breakdown of your performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                  <TableHead className="text-center">GPA</TableHead>
                  <TableHead className="text-center">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReportData.subjects.map((subject) => (
                  <TableRow key={subject.name}>
                    <TableCell className="font-medium">
                      {subject.name}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={getGradeBadge(subject.gpa)}>
                        {subject.grade}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-center font-semibold ${getGradeColor(subject.gpa)}`}>
                      {subject.gpa.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-center">
                      {getTrendIcon(subject.trend)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Analysis Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Strong Subjects */}
          <Card className="border-success/20 bg-success/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <Target className="w-5 h-5" />
                Strong Subjects
              </CardTitle>
              <CardDescription>
                Keep up the excellent work in these areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mockReportData.strongSubjects.map((subject) => (
                  <li
                    key={subject}
                    className="flex items-center gap-2 text-foreground font-medium"
                  >
                    <TrendingUp className="w-4 h-4 text-success" />
                    {subject}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Weak Subjects */}
          <Card className="border-warning/20 bg-warning/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertCircle className="w-5 h-5" />
                Areas for Improvement
              </CardTitle>
              <CardDescription>
                Focus your efforts on these subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mockReportData.weakSubjects.map((subject) => (
                  <li
                    key={subject}
                    className="flex items-center gap-2 text-foreground font-medium"
                  >
                    <AlertCircle className="w-4 h-4 text-warning" />
                    {subject}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-accent" />
              AI-Powered Recommendations
            </CardTitle>
            <CardDescription>
              Personalized insights to help you improve
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mockReportData.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-semibold text-accent">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-foreground">{rec}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Separator />

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Button size="lg" variant="default">
            Generate Study Plan
          </Button>
          <Button size="lg" variant="outline">
            View Career Recommendations
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportDetail;
