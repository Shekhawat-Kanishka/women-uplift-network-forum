import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, MessageCircle, ArrowUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AskQuestionProps {
  onBack: () => void;
}

// Mock data - in real app this would come from backend
const mockQuestions = [
  {
    id: 1,
    question: "How do I negotiate a salary increase when I've been in the same role for 3 years? I feel like I'm being underpaid but I'm not sure how to approach this conversation with my manager.",
    category: "Salary & Negotiations",
    timestamp: "2 hours ago",
    answerCount: 3,
    answers: [
      {
        id: 1,
        answer: "I was in a similar situation last year. I prepared by researching market rates and documenting my achievements. The key is to focus on your value contribution, not just time served. Schedule a formal meeting and present your case with data.",
        timestamp: "1 hour ago"
      },
      {
        id: 2,
        answer: "Before asking for a raise, I always recommend having a backup plan. Update your resume, maybe even explore other opportunities. This gives you confidence and leverage in the negotiation.",
        timestamp: "45 minutes ago"
      }
    ]
  },
  {
    id: 2,
    question: "I'm the only woman on my engineering team and often feel like my ideas aren't taken seriously. How can I assert myself more effectively in meetings without seeming aggressive?",
    category: "Workplace Challenges",
    timestamp: "5 hours ago",
    answerCount: 5,
    answers: [
      {
        id: 3,
        answer: "I've found that sending a follow-up email after meetings helps. Something like 'As discussed, I think we should consider...' This creates a paper trail and reinforces your contributions.",
        timestamp: "3 hours ago"
      }
    ]
  },
  {
    id: 3,
    question: "Should I pursue an MBA while working full-time? I'm worried about the time commitment but I feel like it might be necessary for career advancement.",
    category: "Career Progression",
    timestamp: "1 day ago",
    answerCount: 2,
    answers: []
  }
];

const BrowseQuestions = ({ onBack }: AskQuestionProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [newAnswers, setNewAnswers] = useState<{ [key: number]: string }>({});
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState<number | null>(null);
  const { toast } = useToast();

  const categories = [
    "all",
    "Career Progression",
    "Workplace Challenges", 
    "Leadership & Management",
    "Work-Life Balance",
    "Salary & Negotiations",
    "Networking",
    "Skills Development",
    "Industry Insights",
    "Mentorship",
    "Other"
  ];

  const filteredQuestions = selectedCategory === "all" 
    ? mockQuestions 
    : mockQuestions.filter(q => q.category === selectedCategory);

  const handleAnswerSubmit = async (questionId: number) => {
    const answer = newAnswers[questionId]?.trim();
    if (!answer) {
      toast({
        title: "Please write an answer",
        description: "Answer cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingAnswer(questionId);
    
    try {
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Answer submitted successfully!",
        description: "Your anonymous answer has been posted.",
      });
      
      // Clear the answer input
      setNewAnswers(prev => ({ ...prev, [questionId]: "" }));
      
    } catch (error) {
      toast({
        title: "Error submitting answer",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingAnswer(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-gray via-background to-navy-light">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-6 text-navy hover:text-navy/80"
          >
            ← Back to Home
          </Button>

          <div className="text-center mb-8">
            <div className="mx-auto mb-4 p-3 bg-navy/10 rounded-full w-fit">
              <Users className="h-8 w-8 text-navy" />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-navy">Browse & Answer Questions</h1>
            <p className="text-muted-foreground">
              Share your wisdom and learn from the community's collective experience.
            </p>
          </div>

          {/* Filter */}
          <div className="mb-8">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full max-w-xs mx-auto">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.slice(1).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {filteredQuestions.map((question) => (
              <Card key={question.id} className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {question.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {question.timestamp}
                        </span>
                      </div>
                      <p className="text-foreground leading-relaxed">
                        {question.question}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {question.answerCount} {question.answerCount === 1 ? 'answer' : 'answers'}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setExpandedQuestion(
                        expandedQuestion === question.id ? null : question.id
                      )}
                      className="border-primary/20 text-primary hover:bg-primary/5"
                    >
                      {expandedQuestion === question.id ? 'Hide' : 'View'} Answers & Respond
                    </Button>
                  </div>
                </CardHeader>

                {expandedQuestion === question.id && (
                  <CardContent className="border-t bg-warm-gray/20">
                    {/* Existing Answers */}
                    {question.answers.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-4 text-navy">Community Answers</h4>
                        <div className="space-y-4">
                          {question.answers.map((answer) => (
                            <div key={answer.id} className="bg-background/50 rounded-lg p-4 border">
                              <p className="text-foreground mb-2">{answer.answer}</p>
                              <span className="text-sm text-muted-foreground">{answer.timestamp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Add Answer Form */}
                    <div>
                      <h4 className="font-semibold mb-3 text-navy">Share Your Advice</h4>
                      <div className="space-y-4">
                        <Textarea
                          value={newAnswers[question.id] || ""}
                          onChange={(e) => setNewAnswers(prev => ({
                            ...prev,
                            [question.id]: e.target.value
                          }))}
                          placeholder="Share your experience and advice anonymously..."
                          className="min-h-[100px]"
                          maxLength={500}
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            {(newAnswers[question.id] || "").length}/500 characters
                          </span>
                          <Button
                            onClick={() => handleAnswerSubmit(question.id)}
                            disabled={isSubmittingAnswer === question.id}
                            className="bg-navy hover:bg-navy/90 text-white"
                          >
                            {isSubmittingAnswer === question.id ? "Submitting..." : "Submit Answer"}
                            {isSubmittingAnswer !== question.id && <ArrowUp className="ml-2 h-4 w-4 rotate-45" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}

            {filteredQuestions.length === 0 && (
              <Card className="text-center py-12 bg-card/50 backdrop-blur-sm">
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    No questions found in this category yet.
                  </p>
                  <Button onClick={onBack} variant="outline">
                    Ask the First Question
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseQuestions;
