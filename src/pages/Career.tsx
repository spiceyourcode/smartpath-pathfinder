import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileQuestion, RefreshCw, Star, ArrowRight, TrendingUp } from "lucide-react";

const mockRecommendations = [
  {
    id: "1",
    career: "Software Engineer",
    matchScore: 95,
    description: "Design, develop, and maintain software applications and systems",
    universities: ["University of Nairobi", "Strathmore University", "JKUAT"],
    reasoning: "Strong mathematics and problem-solving skills",
  },
  {
    id: "2",
    career: "Data Scientist",
    matchScore: 88,
    description: "Analyze complex data to help organizations make better decisions",
    universities: ["Strathmore University", "USIU", "Multimedia University"],
    reasoning: "Excellent in mathematics and analytical thinking",
  },
  {
    id: "3",
    career: "Biomedical Engineer",
    matchScore: 82,
    description: "Apply engineering principles to medicine and biology",
    universities: ["University of Nairobi", "Technical University of Kenya", "Moi University"],
    reasoning: "Strong performance in biology and physics",
  },
  {
    id: "4",
    career: "Environmental Scientist",
    matchScore: 78,
    description: "Study the environment and develop solutions to environmental problems",
    universities: ["Kenyatta University", "Egerton University", "Maseno University"],
    reasoning: "Interest in biology and chemistry",
  },
  {
    id: "5",
    career: "Mechanical Engineer",
    matchScore: 75,
    description: "Design, develop, and test mechanical devices and systems",
    universities: ["JKUAT", "Technical University of Mombasa", "Masinde Muliro University"],
    reasoning: "Strong physics and mathematics foundation",
  },
];

const Career = () => {
  const getMatchColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Career Recommendations</h1>
            <p className="text-muted-foreground mt-1">
              AI-powered career suggestions based on your performance
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/career/quiz">
              <Button size="lg">
                <FileQuestion className="w-5 h-5 mr-2" />
                Take Career Quiz
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              <RefreshCw className="w-5 h-5 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Your Top Career Matches</h3>
                <p className="text-sm text-muted-foreground">
                  These recommendations are based on your academic performance, strong subjects, and areas of interest. 
                  Take the career quiz to get more personalized suggestions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockRecommendations.map((rec) => (
            <Card key={rec.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{rec.career}</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription className="line-clamp-2">
                  {rec.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Match Score</span>
                    <span className={`font-bold text-lg ${getMatchColor(rec.matchScore)}`}>
                      {rec.matchScore}%
                    </span>
                  </div>
                  <Progress value={rec.matchScore} />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Why recommended:</p>
                  <p className="text-sm text-foreground">{rec.reasoning}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Top Universities:</p>
                  <div className="flex flex-wrap gap-1">
                    {rec.universities.slice(0, 2).map((uni) => (
                      <Badge key={uni} variant="secondary" className="text-xs">
                        {uni}
                      </Badge>
                    ))}
                    {rec.universities.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{rec.universities.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                <Link to={`/career/${rec.id}`}>
                  <Button variant="outline" className="w-full" size="sm">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Career;
