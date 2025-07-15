import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, X, Lightbulb, Target, Zap, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AITip {
  id: string;
  type: "grammar" | "keyword" | "impact" | "formatting" | "ats";
  title: string;
  description: string;
  suggestion: string;
  priority: "high" | "medium" | "low";
}

interface AIAssistantPanelProps {
  isVisible: boolean;
  onToggle: () => void;
  currentSection: string;
  content: string;
}

export const AIAssistantPanel = ({ 
  isVisible, 
  onToggle, 
  currentSection, 
  content 
}: AIAssistantPanelProps) => {
  const [tips, setTips] = useState<AITip[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Generate AI tips based on current content
  useEffect(() => {
    if (isVisible && content) {
      generateTips(currentSection, content);
    }
  }, [isVisible, currentSection, content]);

  const generateTips = async (section: string, text: string) => {
    setIsLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const allTips: AITip[] = [
        {
          id: "1",
          type: "impact",
          title: "Add Quantifiable Results",
          description: "Include specific numbers, percentages, or metrics to showcase your impact",
          suggestion: "Led team of 8 engineers → Led cross-functional team of 8 engineers, increasing productivity by 40%",
          priority: "high"
        },
        {
          id: "2",
          type: "keyword",
          title: "Industry Keywords Missing",
          description: "Add relevant keywords for your target role to improve ATS compatibility",
          suggestion: "Consider adding: JavaScript, React, Node.js, Agile, CI/CD",
          priority: "high"
        },
        {
          id: "3",
          type: "grammar",
          title: "Improve Action Verbs",
          description: "Start bullet points with strong action verbs to create more impact",
          suggestion: "Worked on → Spearheaded, Helped with → Collaborated on",
          priority: "medium"
        },
        {
          id: "4",
          type: "ats",
          title: "ATS Optimization",
          description: "Use standard section headers and avoid complex formatting",
          suggestion: "Use 'Work Experience' instead of 'Professional Journey'",
          priority: "medium"
        },
        {
          id: "5",
          type: "formatting",
          title: "Consistency Check",
          description: "Ensure consistent date formats and bullet point styles",
          suggestion: "Use consistent format: MM/YYYY - MM/YYYY",
          priority: "low"
        }
      ];

      // Filter tips based on section and content
      const relevantTips = allTips.filter(tip => {
        if (section === "experience" && (tip.type === "impact" || tip.type === "keyword")) return true;
        if (section === "skills" && tip.type === "keyword") return true;
        if (section === "personal" && tip.type === "formatting") return true;
        return tip.type === "ats" || tip.type === "grammar";
      });

      setTips(relevantTips.slice(0, 3));
      setIsLoading(false);
    }, 1500);
  };

  const applyTip = (tip: AITip) => {
    toast({
      title: "AI suggestion applied!",
      description: `Applied: ${tip.title}`,
    });
    
    // Remove the applied tip
    setTips(tips.filter(t => t.id !== tip.id));
  };

  const dismissTip = (tipId: string) => {
    setTips(tips.filter(t => t.id !== tipId));
  };

  const getIcon = (type: AITip["type"]) => {
    switch (type) {
      case "impact": return <Target className="w-4 h-4" />;
      case "keyword": return <Zap className="w-4 h-4" />;
      case "grammar": return <Lightbulb className="w-4 h-4" />;
      case "ats": return <CheckCircle className="w-4 h-4" />;
      case "formatting": return <Sparkles className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: AITip["priority"]) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  if (!isVisible) {
    return (
      <Button
        onClick={onToggle}
        variant="ai"
        size="sm"
        className="fixed bottom-6 right-6 z-50 shadow-lg"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        AI Assistant
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 max-h-[600px] z-50 shadow-xl border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Writing Assistant
          </CardTitle>
          <Button size="sm" variant="ghost" onClick={onToggle}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Analyzing your {currentSection} section...</p>
          </div>
        ) : tips.length > 0 ? (
          <>
            <div className="text-sm text-muted-foreground">
              Real-time suggestions for your <span className="font-medium capitalize">{currentSection}</span> section:
            </div>
            
            {tips.map((tip) => (
              <Card key={tip.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {getIcon(tip.type)}
                      <h4 className="font-medium text-sm">{tip.title}</h4>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getPriorityColor(tip.priority)}`}
                    >
                      {tip.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    {tip.description}
                  </p>
                  
                  <div className="bg-muted p-2 rounded text-xs">
                    <strong>Suggestion:</strong> {tip.suggestion}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ai" 
                      onClick={() => applyTip(tip)}
                      className="text-xs h-7"
                    >
                      Apply
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => dismissTip(tip.id)}
                      className="text-xs h-7"
                    >
                      Dismiss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
            <h3 className="font-medium mb-2">Great work!</h3>
            <p className="text-sm text-muted-foreground">
              Your {currentSection} section looks good. Keep writing to get more suggestions.
            </p>
          </div>
        )}
        
        <div className="pt-4 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs"
            onClick={() => generateTips(currentSection, content)}
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Get More Suggestions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};