import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, User, FileText, Settings, Download, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  const features = [
    {
      icon: Upload,
      title: "Upload Existing Resume",
      description: "Upload your PDF or DOC resume and we'll automatically extract all information",
      link: "/upload"
    },
    {
      icon: User,
      title: "Import from LinkedIn",
      description: "Connect your LinkedIn profile to auto-fill your resume with professional data",
      link: "/import-linkedin"
    },
    {
      icon: FileText,
      title: "Smart Editor",
      description: "Real-time editing with live preview and professional templates",
      link: "/editor"
    },
    {
      icon: Settings,
      title: "AI Assistant",
      description: "Get AI-powered suggestions to improve your resume content and keywords",
      link: "/assistant"
    },
    {
      icon: Download,
      title: "Export & Save",
      description: "Download as PDF, save multiple versions, and share with employers",
      link: "/export"
    },
    {
      icon: Calendar,
      title: "Interview Prep",
      description: "Access interview tips and practice questions tailored to your role",
      link: "/interview"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted to-accent">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Build Your Perfect{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    AI Resume
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Create ATS-friendly resumes with AI assistance. Upload existing resumes, 
                  import from LinkedIn, or build from scratch with intelligent suggestions.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/editor">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    Start Building Now
                  </Button>
                </Link>
                <Link to="/upload">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Upload Existing Resume
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  ATS-Friendly
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  AI-Powered
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  Free to Start
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="AI Resume Builder Interface" 
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-secondary to-success rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Build the Perfect Resume
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From upload to export, our comprehensive platform guides you through 
              every step of creating a professional, ATS-optimized resume.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.link}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl text-white/90">
              Join thousands of professionals who've improved their job prospects with our AI-powered resume builder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/editor">
                <Button variant="glass" size="lg" className="w-full sm:w-auto">
                  Build Resume Now
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
                  View Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;