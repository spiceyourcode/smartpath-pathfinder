import { Link, useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Star, Share2, BookOpen, TrendingUp, Briefcase } from "lucide-react";

const mockCareerDetail = {
  id: "1",
  career: "Software Engineer",
  matchScore: 95,
  description: "Software engineers design, develop, test, and maintain software applications and systems. They work with programming languages, frameworks, and tools to create solutions that meet user needs and solve real-world problems.",
  reasoning: [
    "Exceptional performance in Mathematics (GPA: 4.0)",
    "Strong logical and problem-solving skills",
    "Interest in technology and innovation",
    "Ability to work with complex abstract concepts",
  ],
  marketOutlook: "The demand for software engineers in Kenya is growing rapidly, with tech hubs in Nairobi (Silicon Savannah) attracting both local and international companies. Average starting salary ranges from KES 80,000 to KES 150,000 per month.",
  universities: [
    {
      name: "University of Nairobi",
      course: "Bachelor of Science in Computer Science",
      minGrade: "B+ (10 points)",
      requirements: "Mathematics (B+), English/Kiswahili (C+), Physics or Chemistry (C+)",
    },
    {
      name: "Strathmore University",
      course: "Bachelor of Business Science in Computing",
      minGrade: "B (8 points)",
      requirements: "Mathematics (B), English (C+), Any science subject (C+)",
    },
    {
      name: "JKUAT",
      course: "Bachelor of Science in Software Engineering",
      minGrade: "B (8 points)",
      requirements: "Mathematics (B), English/Kiswahili (C+), Physics (C+)",
    },
    {
      name: "Multimedia University",
      course: "Bachelor of Technology in Software Engineering",
      minGrade: "C+ (7 points)",
      requirements: "Mathematics (C+), English (C), Any science subject (C)",
    },
  ],
};

const CareerDetail = () => {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <Link to="/career">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{mockCareerDetail.career}</h1>
              <p className="text-muted-foreground mt-1">
                Detailed career information and requirements
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Star className="w-4 h-4 mr-2" />
              Save Favorite
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Match Score Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Your Match Score</p>
                <p className="text-4xl font-bold text-success">{mockCareerDetail.matchScore}%</p>
                <p className="text-sm text-muted-foreground">Excellent match for your profile</p>
              </div>
              <Progress value={mockCareerDetail.matchScore} className="w-1/2" />
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              About This Career
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{mockCareerDetail.description}</p>
          </CardContent>
        </Card>

        {/* Why Recommended */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Why This Career Matches You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mockCareerDetail.reasoning.map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Badge className="mt-1">✓</Badge>
                  <span className="text-foreground">{reason}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Job Market Outlook */}
        <Card>
          <CardHeader>
            <CardTitle>Job Market Outlook in Kenya</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{mockCareerDetail.marketOutlook}</p>
          </CardContent>
        </Card>

        {/* University Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              University Programs & Requirements
            </CardTitle>
            <CardDescription>
              Kenyan universities offering relevant programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>University</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Min. Grade</TableHead>
                  <TableHead>Subject Requirements</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCareerDetail.universities.map((uni, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{uni.name}</TableCell>
                    <TableCell>{uni.course}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{uni.minGrade}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{uni.requirements}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Link to="/study-plans/generate" className="flex-1">
            <Button className="w-full" size="lg">
              <BookOpen className="w-5 h-5 mr-2" />
              Generate Study Plan
            </Button>
          </Link>
          <Link to="/career/quiz" className="flex-1">
            <Button variant="outline" className="w-full" size="lg">
              Explore More Careers
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CareerDetail;
