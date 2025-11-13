import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, Eye, Trash2, Calendar } from "lucide-react";

const mockFlashcards = [
  {
    id: "1",
    question: "What is the Pythagorean theorem?",
    subject: "Mathematics",
    difficulty: "Medium",
    reviewCount: 5,
    mastery: 85,
    nextReview: "2024-02-01",
    reviewed: true,
  },
  {
    id: "2",
    question: "Define photosynthesis and its main stages",
    subject: "Biology",
    difficulty: "Hard",
    reviewCount: 3,
    mastery: 60,
    nextReview: "2024-01-28",
    reviewed: false,
  },
  {
    id: "3",
    question: "What are the three states of matter?",
    subject: "Chemistry",
    difficulty: "Easy",
    reviewCount: 8,
    mastery: 95,
    nextReview: "2024-02-05",
    reviewed: true,
  },
  {
    id: "4",
    question: "Explain Newton's First Law of Motion",
    subject: "Physics",
    difficulty: "Medium",
    reviewCount: 4,
    mastery: 70,
    nextReview: "2024-01-30",
    reviewed: true,
  },
];

const Flashcards = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-success/10 text-success";
      case "medium":
        return "bg-warning/10 text-warning";
      case "hard":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return "bg-success";
    if (mastery >= 50) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Flashcards</h1>
            <p className="text-muted-foreground mt-1">
              Study smarter with AI-generated flashcards
            </p>
          </div>
          <Link to="/flashcards/generate">
            <Button size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Generate New
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Cards</CardDescription>
              <CardTitle className="text-3xl">{mockFlashcards.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Average Mastery</CardDescription>
              <CardTitle className="text-3xl text-success">78%</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Due Today</CardDescription>
              <CardTitle className="text-3xl text-warning">2</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Reviews</CardDescription>
              <CardTitle className="text-3xl">20</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search flashcards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Difficulties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Flashcards Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockFlashcards.map((card) => (
            <Card key={card.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline">{card.subject}</Badge>
                  <Badge className={getDifficultyColor(card.difficulty)}>
                    {card.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-base line-clamp-2">
                  {card.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Mastery Level</span>
                    <span className="font-medium">{card.mastery}%</span>
                  </div>
                  <Progress value={card.mastery} className={getMasteryColor(card.mastery)} />
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{card.reviewCount} reviews</span>
                  </div>
                  <span className="text-xs">
                    Next: {new Date(card.nextReview).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link to={`/flashcards/review/${card.id}`} className="flex-1">
                    <Button variant="default" size="sm" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      Review
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
      </div>
    </DashboardLayout>
  );
};

export default Flashcards;
