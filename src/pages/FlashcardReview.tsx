import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check, X, Eye, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockCard = {
  id: "1",
  question: "What is the Pythagorean theorem and when is it used?",
  answer: "The Pythagorean theorem states that in a right-angled triangle, the square of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the other two sides. Formula: a² + b² = c². It is used to find the length of any side of a right triangle when the other two sides are known.",
  subject: "Mathematics",
};

const FlashcardReview = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const progress = 40; // Mock progress

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleCorrect = () => {
    toast({
      title: "Great job!",
      description: "Your answer was marked as correct.",
    });
    // Navigate to next card
  };

  const handleIncorrect = () => {
    toast({
      title: "Keep practicing!",
      description: "This card will be reviewed again soon.",
      variant: "destructive",
    });
    // Navigate to next card
  };

  const handleEvaluate = () => {
    if (!userAnswer.trim()) {
      toast({
        title: "No answer provided",
        description: "Please type your answer first.",
        variant: "destructive",
      });
      return;
    }

    setIsEvaluating(true);
    
    // Simulate AI evaluation
    setTimeout(() => {
      setFeedback(
        "Your answer demonstrates a good understanding of the Pythagorean theorem! You correctly identified the formula and its application. To improve, try to mention that it specifically applies to right-angled triangles. Overall, excellent work!"
      );
      setIsEvaluating(false);
      setShowAnswer(true);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/flashcards">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{mockCard.subject}</h1>
              <p className="text-sm text-muted-foreground">Card 1 of 5</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Progress</p>
            <p className="text-lg font-bold">{progress}%</p>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} />

        {/* Question Card */}
        <Card className="border-2">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Question</p>
                <h2 className="text-2xl font-bold">{mockCard.question}</h2>
              </div>

              {!showAnswer && (
                <Button onClick={handleShowAnswer} size="lg" className="w-full">
                  <Eye className="w-5 h-5 mr-2" />
                  Show Answer
                </Button>
              )}

              {showAnswer && (
                <div className="space-y-4">
                  <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Answer</p>
                    <p className="text-foreground leading-relaxed">{mockCard.answer}</p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleCorrect}
                      className="flex-1 bg-success hover:bg-success/90"
                      size="lg"
                    >
                      <Check className="w-5 h-5 mr-2" />
                      I Got It Right
                    </Button>
                    <Button
                      onClick={handleIncorrect}
                      variant="destructive"
                      className="flex-1"
                      size="lg"
                    >
                      <X className="w-5 h-5 mr-2" />
                      I Got It Wrong
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* User Answer Section */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Type Your Answer (Optional)
                </label>
                <Textarea
                  placeholder="Write your answer here for AI evaluation..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  rows={4}
                  disabled={showAnswer}
                />
              </div>

              {!showAnswer && userAnswer && (
                <Button
                  onClick={handleEvaluate}
                  disabled={isEvaluating}
                  className="w-full"
                  size="lg"
                >
                  {isEvaluating ? (
                    <>Evaluating...</>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Evaluate My Answer
                    </>
                  )}
                </Button>
              )}

              {feedback && (
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <p className="text-sm font-medium text-primary mb-2">AI Feedback</p>
                  <p className="text-sm text-foreground leading-relaxed">{feedback}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" disabled>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FlashcardReview;
