import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, FileText, User, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Assistant = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [currentText, setCurrentText] = useState("");
  const [improvedText, setImprovedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleImprove = async (type: string) => {
    if (!currentText.trim()) {
      toast({
        title: "Please enter text to improve",
        description: "Add some content to get AI suggestions.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const improvements = {
        rewrite: "Led cross-functional team of 8 engineers to deliver scalable web applications, resulting in 40% performance improvement and 95% user satisfaction rating.",
        keywords: "Experienced Full-Stack Developer with expertise in React, Node.js, Python, and cloud technologies. Proven track record in agile development, CI/CD implementation, and database optimization.",
        grammar: "Developed and maintained responsive web applications using modern JavaScript frameworks, ensuring optimal user experience across multiple browsers and devices."
      };
      
      setImprovedText(improvements[type as keyof typeof improvements] || currentText);
      setIsProcessing(false);
      
      toast({
        title: "AI suggestions ready!",
        description: "Review the improved content and apply changes if needed.",
      });
    }, 2000);
  };

  const applyImprovement = () => {
    setCurrentText(improvedText);
    toast({
      title: "Improvement applied!",
      description: "The suggested changes have been applied to your text.",
    });
  };

  const weeklyTips = [
    {
      day: "Monday",
      tip: "Use action verbs to start each bullet point (Led, Developed, Implemented, Achieved)",
      category: "Writing"
    },
    {
      day: "Tuesday", 
      tip: "Quantify your achievements with numbers and percentages whenever possible",
      category: "Content"
    },
    {
      day: "Wednesday",
      tip: "Tailor your resume keywords to match the job description for better ATS compatibility",
      category: "ATS"
    },
    {
      day: "Thursday",
      tip: "Keep your resume to 1-2 pages maximum, prioritizing most relevant experience",
      category: "Format"
    },
    {
      day: "Friday",
      tip: "Use consistent formatting and fonts throughout your resume for professional appearance",
      category: "Design"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              AI Resume Assistant
            </h1>
            <p className="text-xl text-muted-foreground">
              Get intelligent suggestions to improve your resume content and increase your chances of getting interviews
            </p>
          </div>

          <Tabs defaultValue="improve" className="space-y-8">
            <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
              <TabsTrigger value="improve">Improve</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="tips">Tips</TabsTrigger>
              <TabsTrigger value="analyzer">Analyzer</TabsTrigger>
            </TabsList>

            <TabsContent value="improve" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Content Improver
                    </CardTitle>
                    <CardDescription>
                      Paste any text from your resume and get AI-powered improvements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="current-text">Current Text</Label>
                      <Textarea
                        id="current-text"
                        placeholder="Paste your resume text here..."
                        rows={6}
                        value={currentText}
                        onChange={(e) => setCurrentText(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        variant="ai" 
                        size="sm"
                        onClick={() => handleImprove("rewrite")}
                        disabled={isProcessing}
                      >
                        Rewrite
                      </Button>
                      <Button 
                        variant="ai" 
                        size="sm"
                        onClick={() => handleImprove("keywords")}
                        disabled={isProcessing}
                      >
                        Add Keywords
                      </Button>
                      <Button 
                        variant="ai" 
                        size="sm"
                        onClick={() => handleImprove("grammar")}
                        disabled={isProcessing}
                      >
                        Fix Grammar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Suggestions</CardTitle>
                    <CardDescription>
                      Review and apply the AI-improved version
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="improved-text">Improved Text</Label>
                      <Textarea
                        id="improved-text"
                        rows={6}
                        value={improvedText}
                        readOnly
                        className="bg-success/5 border-success/20"
                      />
                    </div>
                    
                    {improvedText && (
                      <Button 
                        onClick={applyImprovement}
                        variant="success"
                        className="w-full"
                      >
                        Apply Improvement
                      </Button>
                    )}
                    
                    {isProcessing && (
                      <div className="text-center">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-sm text-muted-foreground">AI is analyzing your content...</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="keywords" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Job-Specific Keywords
                  </CardTitle>
                  <CardDescription>
                    Enter your target job title to get relevant keywords for your resume
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="job-title">Target Job Title</Label>
                      <Input
                        id="job-title"
                        placeholder="e.g., Senior Software Engineer"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button variant="ai">Generate Keywords</Button>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-primary">Technical Skills</h3>
                      <div className="space-y-2">
                        {["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"].map((skill) => (
                          <div key={skill} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span className="text-sm">{skill}</span>
                            <Button size="sm" variant="outline">Add</Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3 text-secondary">Soft Skills</h3>
                      <div className="space-y-2">
                        {["Leadership", "Team Collaboration", "Problem Solving", "Communication", "Project Management"].map((skill) => (
                          <div key={skill} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span className="text-sm">{skill}</span>
                            <Button size="sm" variant="outline">Add</Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3 text-success">Industry Terms</h3>
                      <div className="space-y-2">
                        {["Agile Development", "CI/CD", "Microservices", "DevOps", "API Design"].map((skill) => (
                          <div key={skill} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span className="text-sm">{skill}</span>
                            <Button size="sm" variant="outline">Add</Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tips" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Weekly Resume Tips
                  </CardTitle>
                  <CardDescription>
                    Daily insights to continuously improve your resume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyTips.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-muted rounded-lg">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                          {tip.day.slice(0, 3)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{tip.day}</h3>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {tip.category}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{tip.tip}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analyzer" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Resume Analyzer
                  </CardTitle>
                  <CardDescription>
                    Get a comprehensive analysis of your resume's strengths and areas for improvement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload Your Resume for Analysis</h3>
                    <p className="text-muted-foreground mb-4">
                      Get personalized feedback on formatting, content, and ATS compatibility
                    </p>
                    <Button variant="ai">Upload Resume</Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">What We Analyze:</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                          ATS compatibility score
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                          Keyword optimization
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                          Content quality and impact
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                          Format and design assessment
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                          Industry-specific recommendations
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">You'll Receive:</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                          Overall resume score (1-100)
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                          Detailed improvement suggestions
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                          Missing skills and keywords
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                          Formatting recommendations
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                          Personalized action plan
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Assistant;