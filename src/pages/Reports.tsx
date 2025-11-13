import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Search,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  Trash2,
} from "lucide-react";

const mockReports = [
  {
    id: "1",
    term: "Term 3",
    year: "2024",
    overallGPA: 3.8,
    dateUploaded: "2024-01-15",
    subjectCount: 8,
    trend: "up",
  },
  {
    id: "2",
    term: "Term 2",
    year: "2024",
    overallGPA: 3.6,
    dateUploaded: "2023-09-10",
    subjectCount: 8,
    trend: "stable",
  },
  {
    id: "3",
    term: "Term 1",
    year: "2024",
    overallGPA: 3.5,
    dateUploaded: "2023-05-20",
    subjectCount: 8,
    trend: "down",
  },
];

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState("all");

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

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Reports</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your academic reports
            </p>
          </div>
          <Link to="/reports/upload">
            <Button size="lg" className="w-full md:w-auto">
              <Upload className="w-5 h-5 mr-2" />
              Upload Report
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reports Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockReports.map((report) => (
            <Card
              key={report.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      {report.term} {report.year}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Uploaded on {new Date(report.dateUploaded).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  {getTrendIcon(report.trend)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Overall GPA
                  </span>
                  <span className={`text-2xl font-bold ${getGradeColor(report.overallGPA)}`}>
                    {report.overallGPA.toFixed(1)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Subjects
                  </span>
                  <Badge variant="secondary">{report.subjectCount}</Badge>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link to={`/reports/${report.id}`} className="flex-1">
                    <Button variant="default" size="sm" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {mockReports.length === 0 && (
          <Card className="py-12">
            <CardContent className="text-center space-y-4">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">No reports yet</h3>
                <p className="text-muted-foreground mt-1">
                  Upload your first report to get started
                </p>
              </div>
              <Link to="/reports/upload">
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Report
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Reports;
