import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Calendar, Clock, Target, Edit, Plus, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockPlan = {
  id: "1",
  subject: "Mathematics",
  focusArea: "Calculus & Algebra",
  startDate: "2024-01-15",
  endDate: "2024-03-15",
  progress: 65,
  hoursPerDay: 2,
  priority: "High",
  status: "In Progress",
  strategy: "Focus on understanding fundamental concepts first, then practice problem-solving techniques. Review past exam papers weekly.",
  weeklySchedule: [
    { day: "Monday", topics: ["Limits & Continuity", "Differentiation Basics"], duration: 2, completed: true },
    { day: "Tuesday", topics: ["Integration Techniques"], duration: 2, completed: true },
    { day: "Wednesday", topics: ["Linear Algebra", "Matrices"], duration: 2, completed: true },
    { day: "Thursday", topics: ["Problem Solving Practice"], duration: 2, completed: false },
    { day: "Friday", topics: ["Quadratic Equations", "Functions"], duration: 2, completed: false },
    { day: "Saturday", topics: ["Past Papers Review"], duration: 2, completed: false },
    { day: "Sunday", topics: ["Rest & Light Review"], duration: 1, completed: false },
  ],
  sessions: [
    { date: "2024-01-15", duration: 120, topics: "Limits & Continuity", notes: "Good progress, need more practice", completed: true },
    { date: "2024-01-16", duration: 110, topics: "Integration", notes: "Challenging but manageable", completed: true },
    { date: "2024-01-17", duration: 130, topics: "Matrices", notes: "Excellent understanding", completed: true },
  ],
};

const StudyPlanDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [logSessionOpen, setLogSessionOpen] = useState(false);
  const [sessionDuration, setSessionDuration] = useState("120");
  const [sessionTopics, setSessionTopics] = useState("");
  const [sessionNotes, setSessionNotes] = useState("");

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-destructive/10 text-destructive";
      case "medium":
        return "bg-warning/10 text-warning";
      case "low":
        return "bg-success/10 text-success";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "bg-primary/10 text-primary";
      case "completed":
        return "bg-success/10 text-success";
      case "paused":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleLogSession = () => {
    toast({
      title: "Session Logged!",
      description: "Your study session has been recorded.",
    });
    setLogSessionOpen(false);
    setSessionDuration("120");
    setSessionTopics("");
    setSessionNotes("");
  };

  const handleUpdateStatus = (newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Study plan status changed to ${newStatus}.`,
    });
  };

  const totalHours = mockPlan.sessions.reduce((sum, s) => sum + s.duration, 0) / 60;
  const daysRemaining = Math.ceil(
    (new Date(mockPlan.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <Link to="/study-plans">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getPriorityColor(mockPlan.priority)}>
                  {mockPlan.priority} Priority
                </Badge>
                <Badge className={getStatusColor(mockPlan.status)} variant="outline">
                  {mockPlan.status}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-foreground">{mockPlan.subject}</h1>
              <p className="text-muted-foreground mt-1">{mockPlan.focusArea}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Select defaultValue={mockPlan.status} onValueChange={handleUpdateStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Plan
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Progress</CardDescription>
              <CardTitle className="text-3xl">{mockPlan.progress}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={mockPlan.progress} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Days Remaining</CardDescription>
              <CardTitle className="text-3xl">{daysRemaining}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Hours</CardDescription>
              <CardTitle className="text-3xl">{totalHours.toFixed(1)}h</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Sessions Logged</CardDescription>
              <CardTitle className="text-3xl">{mockPlan.sessions.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Study Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{mockPlan.strategy}</p>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Start Date</span>
                      <span className="font-medium">
                        {new Date(mockPlan.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">End Date</span>
                      <span className="font-medium">
                        {new Date(mockPlan.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Time Commitment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Daily Hours</span>
                      <span className="font-medium">{mockPlan.hoursPerDay}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weekly Hours</span>
                      <span className="font-medium">{mockPlan.hoursPerDay * 7}h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Weekly Schedule</h2>
              <Dialog open={logSessionOpen} onOpenChange={setLogSessionOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Log Session
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Log Study Session</DialogTitle>
                    <DialogDescription>
                      Record your study session details
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Duration (minutes)</label>
                      <Input
                        type="number"
                        value={sessionDuration}
                        onChange={(e) => setSessionDuration(e.target.value)}
                        placeholder="120"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Topics Covered</label>
                      <Input
                        value={sessionTopics}
                        onChange={(e) => setSessionTopics(e.target.value)}
                        placeholder="e.g., Differentiation, Integration"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Notes</label>
                      <Textarea
                        value={sessionNotes}
                        onChange={(e) => setSessionNotes(e.target.value)}
                        placeholder="Any observations or challenges..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setLogSessionOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleLogSession}>Save Session</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-3">
              {mockPlan.weeklySchedule.map((day, index) => (
                <Card key={index} className={day.completed ? "opacity-75" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {day.completed && <Check className="w-4 h-4 text-primary" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{day.day}</p>
                          <p className="text-sm text-muted-foreground">
                            {day.topics.join(", ")}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        {day.duration}h
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-4">
            <div className="space-y-3">
              {mockPlan.sessions.map((session, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{session.topics}</CardTitle>
                        <CardDescription>
                          {new Date(session.date).toLocaleDateString()} • {session.duration} minutes
                        </CardDescription>
                      </div>
                      <Badge className="bg-success/10 text-success">
                        <Check className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground">{session.notes}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudyPlanDetail;
