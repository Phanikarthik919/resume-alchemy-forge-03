import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Edit, Calendar, User, Settings, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  
  const [resumes] = useState([
    {
      id: 1,
      name: "Software Engineer Resume",
      template: "Modern Professional",
      lastModified: "2024-01-15",
      status: "Complete",
      views: 24,
      downloads: 5
    },
    {
      id: 2,
      name: "Senior Developer Position",
      template: "Minimal Modern", 
      lastModified: "2024-01-10",
      status: "Draft",
      views: 12,
      downloads: 2
    },
    {
      id: 3,
      name: "Tech Lead Application",
      template: "Classic Professional",
      lastModified: "2024-01-05",
      status: "Complete",
      views: 8,
      downloads: 3
    }
  ]);

  const [recentActivity] = useState([
    {
      action: "Downloaded resume",
      resume: "Software Engineer Resume",
      date: "2 hours ago"
    },
    {
      action: "Updated work experience",
      resume: "Senior Developer Position", 
      date: "1 day ago"
    },
    {
      action: "Applied AI suggestions",
      resume: "Tech Lead Application",
      date: "3 days ago"
    },
    {
      action: "Changed template",
      resume: "Software Engineer Resume",
      date: "5 days ago"
    }
  ]);

  const handleEdit = (resumeId: number) => {
    toast({
      title: "Opening resume editor",
      description: "Redirecting to editor with your resume data.",
    });
  };

  const handleDownload = (resumeName: string) => {
    toast({
      title: "Download started",
      description: `${resumeName} is being prepared for download.`,
    });
  };

  const handleShare = (resumeId: number) => {
    const shareUrl = `${window.location.origin}/resume/${resumeId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Share link copied!",
      description: "Resume link has been copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Manage your resumes and track your progress</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <a href="/upload">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Resume
                </a>
              </Button>
              <Button variant="hero" asChild>
                <a href="/editor">
                  <FileText className="w-4 h-4 mr-2" />
                  Create New
                </a>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="resumes" className="space-y-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="resumes">My Resumes</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="resumes" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map((resume) => (
                  <Card key={resume.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{resume.name}</CardTitle>
                          <CardDescription className="mt-1">
                            Template: {resume.template}
                          </CardDescription>
                        </div>
                        <Badge variant={resume.status === "Complete" ? "default" : "secondary"}>
                          {resume.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm text-muted-foreground">
                        Last modified: {resume.lastModified}
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>{resume.views} views</span>
                        <span>{resume.downloads} downloads</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleEdit(resume.id)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownload(resume.name)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleShare(resume.id)}
                        >
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Create New Card */}
                <Card className="border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer group">
                  <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
                    <FileText className="w-12 h-12 text-muted-foreground group-hover:text-primary mb-4" />
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Create New Resume</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start building a new resume from scratch or use a template
                    </p>
                    <Button variant="outline" asChild>
                      <a href="/editor">Get Started</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Track your recent resume building activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.resume}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{activity.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">+1 from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">44</div>
                    <p className="text-xs text-muted-foreground">+12 from last week</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">10</div>
                    <p className="text-xs text-muted-foreground">+3 from last week</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">AI Suggestions Used</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15</div>
                    <p className="text-xs text-muted-foreground">+5 from last week</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>
                    Track how your resumes are performing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resumes.map((resume) => (
                      <div key={resume.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <h3 className="font-semibold">{resume.name}</h3>
                          <p className="text-sm text-muted-foreground">{resume.template}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{resume.views} views</div>
                          <div className="text-sm text-muted-foreground">{resume.downloads} downloads</div>
                        </div>
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

export default Dashboard;