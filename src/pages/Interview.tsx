import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, User, FileText, CheckCircle } from "lucide-react";

const Interview = () => {
  const [selectedRole, setSelectedRole] = useState("");

  const dailyTips = [
    {
      title: "Research the Company Culture",
      description: "Spend time understanding the company's values, mission, and recent news. This shows genuine interest and helps you ask thoughtful questions.",
      category: "Preparation"
    },
    {
      title: "Practice the STAR Method",
      description: "Structure your behavioral answers using Situation, Task, Action, Result format. This ensures clear and compelling responses.",
      category: "Technique"
    },
    {
      title: "Prepare Your Questions",
      description: "Have 3-5 thoughtful questions ready about the role, team, and company. This demonstrates your engagement and helps you evaluate the opportunity.",
      category: "Engagement"
    }
  ];

  const behavioralQuestions = [
    {
      question: "Tell me about a time when you had to work with a difficult team member.",
      tips: ["Focus on your communication and problem-solving skills", "Show how you maintained professionalism", "Highlight the positive outcome"]
    },
    {
      question: "Describe a situation where you had to meet a tight deadline.",
      tips: ["Explain your time management approach", "Mention any tools or methods you used", "Emphasize the successful delivery"]
    },
    {
      question: "Give an example of when you had to learn something new quickly.",
      tips: ["Show your adaptability and learning process", "Mention resources you used", "Explain how you applied the new knowledge"]
    },
    {
      question: "Tell me about a time you failed and how you handled it.",
      tips: ["Be honest but focus on lessons learned", "Show accountability and growth", "Explain how you prevent similar issues now"]
    }
  ];

  const technicalQuestions = {
    "Software Engineer": [
      "Explain the difference between stack and heap memory.",
      "How would you optimize a database query?",
      "Describe your approach to debugging a production issue.",
      "What are the principles of good API design?"
    ],
    "Product Manager": [
      "How do you prioritize features in a product roadmap?",
      "Describe your process for gathering user requirements.",
      "How do you measure product success?",
      "Walk me through launching a new feature."
    ],
    "Data Scientist": [
      "Explain overfitting and how to prevent it.",
      "How do you handle missing data in a dataset?",
      "Describe your approach to A/B testing.",
      "What metrics would you use to evaluate a machine learning model?"
    ],
    "Marketing Manager": [
      "How do you measure the success of a marketing campaign?",
      "Describe your approach to target audience research.",
      "How do you optimize conversion rates?",
      "Walk me through developing a go-to-market strategy."
    ]
  };

  const interviewStages = [
    {
      stage: "Phone/Video Screening",
      duration: "30 minutes",
      focus: "Basic qualifications and culture fit",
      tips: [
        "Prepare a clear elevator pitch",
        "Research the interviewer on LinkedIn",
        "Test your technology beforehand",
        "Have your resume readily available"
      ]
    },
    {
      stage: "Technical Interview",
      duration: "45-60 minutes", 
      focus: "Skills assessment and problem solving",
      tips: [
        "Practice coding problems on whiteboard",
        "Think out loud during problem solving",
        "Ask clarifying questions",
        "Discuss trade-offs in your solutions"
      ]
    },
    {
      stage: "Behavioral Interview",
      duration: "45 minutes",
      focus: "Past experiences and soft skills",
      tips: [
        "Prepare STAR format stories",
        "Show leadership and initiative",
        "Demonstrate cultural alignment",
        "Ask thoughtful questions about the role"
      ]
    },
    {
      stage: "Final Interview",
      duration: "60 minutes",
      focus: "Cultural fit and final assessment",
      tips: [
        "Meet with senior team members",
        "Discuss long-term career goals",
        "Show enthusiasm for the opportunity",
        "Negotiate offer if extended"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Interview Preparation Hub</h1>
            <p className="text-xl text-muted-foreground">
              Master your interviews with daily tips, practice questions, and proven strategies
            </p>
          </div>

          <Tabs defaultValue="tips" className="space-y-8">
            <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
              <TabsTrigger value="tips">Daily Tips</TabsTrigger>
              <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
            </TabsList>

            <TabsContent value="tips" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Today's Interview Tips
                  </CardTitle>
                  <CardDescription>
                    Daily insights to improve your interview performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {dailyTips.map((tip, index) => (
                      <div key={index} className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold">{tip.title}</h3>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {tip.category}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{tip.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Before Interview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        Research company and role thoroughly
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        Prepare specific examples and stories
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        Plan your outfit and route
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        Get a good night's sleep
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">During Interview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        Arrive 10-15 minutes early
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        Maintain eye contact and smile
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        Listen actively and ask questions
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        Take notes when appropriate
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">After Interview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        Send thank you email within 24 hours
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        Reflect on what went well
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        Follow up appropriately
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        Continue job search activities
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="behavioral" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Behavioral Interview Questions
                  </CardTitle>
                  <CardDescription>
                    Practice common behavioral questions with the STAR method
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {behavioralQuestions.map((item, index) => (
                      <div key={index} className="p-6 border rounded-lg">
                        <h3 className="font-semibold text-lg mb-4">{item.question}</h3>
                        <div>
                          <h4 className="font-medium mb-2 text-primary">Answer Tips:</h4>
                          <ul className="space-y-1">
                            {item.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="text-sm text-muted-foreground flex items-start">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button variant="outline" size="sm" className="mt-4">
                          Practice Answer
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technical" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Technical Interview Questions
                  </CardTitle>
                  <CardDescription>
                    Role-specific technical questions to help you prepare
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your target role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                        <SelectItem value="Product Manager">Product Manager</SelectItem>
                        <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                        <SelectItem value="Marketing Manager">Marketing Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedRole && technicalQuestions[selectedRole as keyof typeof technicalQuestions] && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Common {selectedRole} Questions:</h3>
                      <div className="grid gap-4">
                        {technicalQuestions[selectedRole as keyof typeof technicalQuestions].map((question, index) => (
                          <div key={index} className="p-4 bg-muted rounded-lg">
                            <p className="font-medium">{question}</p>
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" variant="outline">
                                Practice
                              </Button>
                              <Button size="sm" variant="outline">
                                View Solution
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="process" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interview Process Guide</CardTitle>
                  <CardDescription>
                    Understand what to expect at each stage of the interview process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {interviewStages.map((stage, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <h3 className="font-semibold text-lg">{stage.stage}</h3>
                              <span className="text-sm bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                                {stage.duration}
                              </span>
                            </div>
                            <p className="text-muted-foreground mb-4">{stage.focus}</p>
                            <div className="grid md:grid-cols-2 gap-2">
                              {stage.tips.map((tip, tipIndex) => (
                                <div key={tipIndex} className="flex items-start text-sm">
                                  <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                                  {tip}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {index < interviewStages.length - 1 && (
                          <div className="w-0.5 h-6 bg-border ml-4 mt-4"></div>
                        )}
                      </div>
                    ))}
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

export default Interview;