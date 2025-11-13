import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, ArrowLeft } from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const mockTrendsData = [
  { term: "Term 1 2023", Mathematics: 3.3, English: 3.0, Biology: 3.5, Chemistry: 2.7, Physics: 3.0 },
  { term: "Term 2 2023", Mathematics: 3.5, English: 3.2, Biology: 3.7, Chemistry: 2.9, Physics: 3.2 },
  { term: "Term 3 2023", Mathematics: 3.7, English: 3.3, Biology: 3.8, Chemistry: 3.0, Physics: 3.5 },
  { term: "Term 1 2024", Mathematics: 3.8, English: 3.5, Biology: 4.0, Chemistry: 3.0, Physics: 3.5 },
  { term: "Term 2 2024", Mathematics: 4.0, English: 3.5, Biology: 4.0, Chemistry: 3.0, Physics: 3.5 },
];

const subjects = ["All Subjects", "Mathematics", "English", "Biology", "Chemistry", "Physics"];
const timeRanges = ["Last Term", "Last Year", "All Time"];

const PerformanceTrends = () => {
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [timeRange, setTimeRange] = useState("All Time");

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link to="/performance">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Performance Trends</h1>
              <p className="text-muted-foreground mt-1">
                Track your grade progression over time
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Time Range</label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5 text-primary" />
              Grade Trends
            </CardTitle>
            <CardDescription>
              {selectedSubject === "All Subjects" 
                ? "Showing GPA trends for all subjects"
                : `Showing GPA trend for ${selectedSubject}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RechartsLineChart data={mockTrendsData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="term" className="text-xs" />
                <YAxis domain={[0, 4]} className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                {selectedSubject === "All Subjects" ? (
                  <>
                    <Line type="monotone" dataKey="Mathematics" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="English" stroke="hsl(var(--success))" strokeWidth={2} />
                    <Line type="monotone" dataKey="Biology" stroke="hsl(var(--accent))" strokeWidth={2} />
                    <Line type="monotone" dataKey="Chemistry" stroke="hsl(var(--warning))" strokeWidth={2} />
                    <Line type="monotone" dataKey="Physics" stroke="hsl(var(--destructive))" strokeWidth={2} />
                  </>
                ) : (
                  <Line 
                    type="monotone" 
                    dataKey={selectedSubject} 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', r: 5 }}
                  />
                )}
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription>Average GPA</CardDescription>
              <CardTitle className="text-3xl text-primary">3.6</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Across all terms</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Best Performance</CardDescription>
              <CardTitle className="text-3xl text-success">4.0</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Mathematics - Term 2 2024</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Improvement Rate</CardDescription>
              <CardTitle className="text-3xl text-accent">+18%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Since Term 1 2023</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PerformanceTrends;
