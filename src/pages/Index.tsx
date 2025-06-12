
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Users, ArrowUp } from "lucide-react";
import AskQuestion from "@/components/AskQuestion";
import BrowseQuestions from "@/components/BrowseQuestions";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'ask' | 'browse'>('home');

  if (currentView === 'ask') {
    return <AskQuestion onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'browse') {
    return <BrowseQuestions onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-light via-background to-coral-light gradient-shift">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-editorial text-[120px] md:text-[150px] font-bold mb-6 bg-gradient-to-r from-primary to-pink bg-clip-text text-transparent float-animation leading-none">
            Echo Room
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-satoshi">
            A safe, anonymous space for women to share career advice, ask questions, and support each other's professional growth.
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <Card 
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 bg-card/50 backdrop-blur-sm pulse-glow hover:pulse-glow"
            onClick={() => setCurrentView('ask')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors float-animation">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl mb-2 font-editorial">Ask a Question</CardTitle>
              <CardDescription className="text-base font-satoshi">
                Get anonymous advice from experienced women in your field. Whether it's about career progression, workplace challenges, or professional development.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 font-satoshi">
                Start Your Question
                <ArrowUp className="ml-2 h-4 w-4 rotate-45" />
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-pink/50 bg-card/50 backdrop-blur-sm pulse-glow hover:pulse-glow"
            onClick={() => setCurrentView('browse')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-pink/10 rounded-full w-fit group-hover:bg-pink/20 transition-colors float-animation" style={{ animationDelay: '2s' }}>
                <Users className="h-8 w-8 text-pink" />
              </div>
              <CardTitle className="text-2xl mb-2 font-editorial">Browse & Answer</CardTitle>
              <CardDescription className="text-base font-satoshi">
                Share your experience and wisdom. Help other women by answering questions anonymously and reading insights from the community.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full bg-pink hover:bg-pink/90 text-white font-semibold py-3 font-satoshi">
                Explore Questions
                <ArrowUp className="ml-2 h-4 w-4 rotate-45" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Feature Highlights */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 font-editorial text-primary">Why Echo Room?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="p-4 float-animation" style={{ animationDelay: '1s' }}>
              <div className="text-primary font-semibold mb-2 font-satoshi">100% Anonymous</div>
              <p className="text-muted-foreground font-satoshi">Share and receive advice without revealing your identity</p>
            </div>
            <div className="p-4 float-animation" style={{ animationDelay: '3s' }}>
              <div className="text-primary font-semibold mb-2 font-satoshi">Expert Insights</div>
              <p className="text-muted-foreground font-satoshi">Learn from experienced women across different industries</p>
            </div>
            <div className="p-4 float-animation" style={{ animationDelay: '5s' }}>
              <div className="text-primary font-semibold mb-2 font-satoshi">Safe Space</div>
              <p className="text-muted-foreground font-satoshi">A supportive environment designed for women's professional growth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
