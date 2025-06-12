
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AskQuestionProps {
  onBack: () => void;
}

const AskQuestion = ({ onBack }: AskQuestionProps) => {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const categories = [
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim() || !category) {
      toast({
        title: "Please complete all fields",
        description: "Both question and category are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission - in real app, this would save to backend
    try {
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Question submitted successfully!",
        description: "Your anonymous question has been posted and will be visible to the community.",
      });
      
      setQuestion("");
      setCategory("");
      
      // Go back to home after successful submission
      setTimeout(() => {
        onBack();
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Error submitting question",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-gray via-background to-coral-light">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-6 text-navy hover:text-navy/80"
          >
            ← Back to Home
          </Button>

          <Card className="bg-card/50 backdrop-blur-sm border-2">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl mb-2 text-navy">Ask Your Question</CardTitle>
              <p className="text-muted-foreground">
                Share your question anonymously and get advice from experienced women in your field.
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-navy">
                    Category
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category for your question" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-navy">
                    Your Question
                  </label>
                  <Textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Share your question here... Be as detailed as you'd like. Remember, this is completely anonymous."
                    className="min-h-[150px] resize-none"
                    maxLength={1000}
                  />
                  <div className="text-right text-sm text-muted-foreground mt-1">
                    {question.length}/1000 characters
                  </div>
                </div>

                <div className="bg-coral-light/30 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-navy/80">
                    <strong>Privacy Note:</strong> Your question will be posted anonymously. 
                    No personal information will be shared or stored.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Question"}
                  {!isSubmitting && <ArrowUp className="ml-2 h-4 w-4 rotate-45" />}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
