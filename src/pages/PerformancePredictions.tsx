import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockPredictions = [
  {
    subject: "Mathematics",
    currentGrade: "A",
    currentGPA: 4.0,
    predictedGrade: "A",
    predictedGPA: 4.0,
    confidence: 95,
    factors: ["Consistent high performance", "Strong fundamentals", "Regular study habits"],
  },
  {
    subject: "English",
    currentGrade: "B+",
    currentGPA: 3.5,
    predictedGrade: "A-",
    predictedGPA: 3.7,
    confidence: 78,
    factors: ["Improving essay scores", "Better grammar", "More reading practice"],
  },
  {
    subject: "Chemistry",
    currentGrade: "B",
    currentGPA: 3.0,
    predictedGrade: "B",
    predictedGPA: 3.0,
    confidence: 65,
    factors: ["Struggling with organic chemistry", "Need more practice", "Lab work improving"],
  },
  {
    subject: "Biology",
    currentGrade: "A",
    currentGPA: 4.0,
    predictedGrade: "A",
    predictedGPA: 4.0,
    confidence: 92,
    factors: ["Excellent lab reports", "Strong understanding", "Active participation"],
  },
  {
    subject: "Physics",
    currentGrade: "B+",
    currentGPA: 3.5,
    predictedGrade: "A-",
    predictedGPA: 3.7,
    confidence: 72,
    factors: ["Better problem-solving", "Improved calculations", "More focused studying"],
  },
];

const PerformancePredictions = () => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-success";
    if (confidence >= 60) return "text-warning";
    return "text-destructive";
  };

  const getChangeIndicator = (current: number, predicted: number) => {
    if (predicted > current) return <TrendingUp className="w-4 h-4 text-success" />;
    if (predicted < current) return <AlertCircle className="w-4 h-4 text-destructive" />;
    return <CheckCircle className="w-4 h-4 text-muted-foreground" />;
  };

  const chartData = mockPredictions.map((pred) => ({
    subject: pred.subject,
    current: pred.currentGPA,
    predicted: pred.predictedGPA,
  }));

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
              <h1 className="text-3xl font-bold text-foreground">Performance Predictions</h1>
              <p className="text-muted-foreground mt-1">
                AI-powered predictions for next term
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Current vs Predicted GPA</CardTitle>
            <CardDescription>
              Compare your current grades with AI predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="subject" className="text-xs" />
                <YAxis domain={[0, 4]} className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="current" fill="hsl(var(--primary))" name="Current GPA" />
                <Bar dataKey="predicted" fill="hsl(var(--accent))" name="Predicted GPA" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Predictions Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Detailed Predictions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {mockPredictions.map((prediction) => (
              <Card key={prediction.subject} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{prediction.subject}</CardTitle>
                    {getChangeIndicator(prediction.currentGPA, prediction.predictedGPA)}
                  </div>
                  <CardDescription>Next term prediction</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Current</p>
                      <p className="text-2xl font-bold text-foreground">
                        {prediction.currentGrade}
                      </p>
                    </div>
                    <div className="text-center px-4">
                      <p className="text-muted-foreground">→</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Predicted</p>
                      <p className="text-2xl font-bold text-primary">
                        {prediction.predictedGrade}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Confidence Level</span>
                      <span className={`font-medium ${getConfidenceColor(prediction.confidence)}`}>
                        {prediction.confidence}%
                      </span>
                    </div>
                    <Progress value={prediction.confidence} />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Key Factors:</p>
                    <div className="space-y-1">
                      {prediction.factors.map((factor, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          <span>{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PerformancePredictions;
