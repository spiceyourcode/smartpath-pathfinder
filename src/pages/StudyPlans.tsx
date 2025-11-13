import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Eye, Calendar, Clock, Target } from "lucide-react";

const mockActivePlans = [
  {
    id: "1",
    subject: "Mathematics",
    focusArea: "Calculus & Algebra",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    progress: 65,
    hoursPerDay: 2,
    priority: "High",
    status: "In Progress",
  },
  {
    id: "2",
    subject: "Chemistry",
    focusArea: "Organic Chemistry",
    startDate: "2024-01-20",
    endDate: "2024-03-20",
    progress: 45,
    hoursPerDay: 1.5,
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: "3",
    subject: "Biology",
    focusArea: "Cell Biology & Genetics",
    startDate: "2024-02-01",
    endDate: "2024-04-01",
    progress: 30,
    hoursPerDay: 1,
    priority: "Medium",
    status: "In Progress",
  },
];

const mockCompletedPlans = [
  {
    id: "4",
    subject: "Physics",
    focusArea: "Mechanics",
    completedDate: "2023-12-20",
    finalProgress: 100,
  },
];

const StudyPlans = () => {
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

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Study Plans</h1>
            <p className="text-muted-foreground mt-1">
              Manage your personalized study schedules
            </p>
          </div>
          <Link to="/study-plans/generate">
            <Button size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Generate New Plan
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Plans</CardDescription>
              <CardTitle className="text-3xl">{mockActivePlans.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Study Hours</CardDescription>
              <CardTitle className="text-3xl">42</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-3xl">8.5h</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Completed Plans</CardDescription>
              <CardTitle className="text-3xl">{mockCompletedPlans.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Active Plans */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Active Study Plans</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockActivePlans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-lg">{plan.subject}</CardTitle>
                      <CardDescription className="mt-1">{plan.focusArea}</CardDescription>
                    </div>
                    <Badge className={getPriorityColor(plan.priority)}>
                      {plan.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{plan.progress}%</span>
                    </div>
                    <Progress value={plan.progress} />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{plan.hoursPerDay}h/day</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{getDaysRemaining(plan.endDate)} days left</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(plan.status)} variant="outline">
                      {plan.status}
                    </Badge>
                    <Link to={`/study-plans/${plan.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed Plans */}
        {mockCompletedPlans.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Completed Plans</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockCompletedPlans.map((plan) => (
                <Card key={plan.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{plan.subject}</CardTitle>
                        <CardDescription className="mt-1">{plan.focusArea}</CardDescription>
                      </div>
                      <Badge className="bg-success/10 text-success">Completed</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Completed on {new Date(plan.completedDate).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudyPlans;
