import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, MessageSquare, TrendingUp, Target, Heart, Eye } from "lucide-react";

const mockInsights = [
  {
    id: "1",
    type: "Feedback",
    title: "Excellent Progress in Mathematics",
    content: "Your consistent performance in Mathematics is outstanding! You've maintained an A grade for three consecutive terms.",
    timestamp: "2024-01-15T10:30:00",
    read: false,
    icon: MessageSquare,
  },
  {
    id: "2",
    type: "Tips",
    title: "Study Technique for Chemistry",
    content: "Try using concept maps to visualize organic chemistry reactions. This can help you understand the relationships between different compounds.",
    timestamp: "2024-01-14T15:20:00",
    read: true,
    icon: Lightbulb,
  },
  {
    id: "3",
    type: "Analysis",
    title: "Performance Trend Analysis",
    content: "Your overall GPA has improved by 15% over the last term. Keep up the great work with your study schedule!",
    timestamp: "2024-01-13T09:15:00",
    read: false,
    icon: TrendingUp,
  },
  {
    id: "4",
    type: "Recommendations",
    title: "Focus Area Suggestion",
    content: "Based on your recent test results, consider spending more time on Electromagnetism in Physics. Practice more numerical problems.",
    timestamp: "2024-01-12T14:45:00",
    read: true,
    icon: Target,
  },
  {
    id: "5",
    type: "Motivation",
    title: "You're Making Great Progress!",
    content: "Your dedication to learning is inspiring. You've completed 85% of your flashcard reviews this week. Keep pushing forward!",
    timestamp: "2024-01-11T08:00:00",
    read: false,
    icon: Heart,
  },
  {
    id: "6",
    type: "Feedback",
    title: "Biology Lab Report Excellence",
    content: "Your latest biology lab report showed exceptional understanding of cell division. Your diagrams were particularly well-labeled.",
    timestamp: "2024-01-10T16:30:00",
    read: true,
    icon: MessageSquare,
  },
];

const Insights = () => {
  const [selectedTab, setSelectedTab] = useState("all");

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "feedback":
        return "bg-primary/10 text-primary";
      case "tips":
        return "bg-accent/10 text-accent";
      case "analysis":
        return "bg-success/10 text-success";
      case "recommendations":
        return "bg-warning/10 text-warning";
      case "motivation":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredInsights = selectedTab === "all" 
    ? mockInsights 
    : mockInsights.filter(i => i.type.toLowerCase() === selectedTab);

  const unreadCount = mockInsights.filter(i => !i.read).length;

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Insights</h1>
            <p className="text-muted-foreground mt-1">
              AI-powered feedback and learning tips
            </p>
          </div>
          {unreadCount > 0 && (
            <Badge variant="outline" className="w-fit">
              {unreadCount} Unread
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Insights</CardDescription>
              <CardTitle className="text-3xl">{mockInsights.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-3xl">5</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Unread</CardDescription>
              <CardTitle className="text-3xl text-primary">{unreadCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Action Items</CardDescription>
              <CardTitle className="text-3xl">2</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Suggestions</TabsTrigger>
            <TabsTrigger value="motivation">Motivation</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="space-y-4 mt-6">
            {filteredInsights.map((insight) => {
              const Icon = insight.icon;
              return (
                <Card 
                  key={insight.id} 
                  className={`hover:shadow-lg transition-shadow ${!insight.read ? 'border-primary/50' : ''}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={getTypeColor(insight.type)} variant="outline">
                              {insight.type}
                            </Badge>
                            {!insight.read && (
                              <Badge className="bg-primary/20 text-primary">New</Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {new Date(insight.timestamp).toLocaleString()}
                          </CardDescription>
                        </div>
                      </div>
                      <Link to={`/insights/${insight.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground leading-relaxed">{insight.content}</p>
                  </CardContent>
                </Card>
              );
            })}

            {filteredInsights.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Lightbulb className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No insights yet</h3>
                  <p className="text-muted-foreground">
                    Check back later for personalized feedback and tips
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Insights;
