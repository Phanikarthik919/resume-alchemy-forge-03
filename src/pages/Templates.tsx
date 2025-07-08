import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Templates = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const templates = [
    {
      id: "classic",
      name: "Classic Professional",
      description: "Traditional layout perfect for corporate environments and conservative industries",
      preview: "bg-white border-2 border-gray-200",
      features: ["ATS-Friendly", "Conservative Design", "Two-Column Layout"],
      recommended: ["Finance", "Law", "Healthcare"]
    },
    {
      id: "minimal",
      name: "Minimal Modern",
      description: "Clean, minimalist design with plenty of white space and modern typography",
      preview: "bg-gradient-to-br from-gray-50 to-white border border-gray-100",
      features: ["Clean Design", "Modern Typography", "Single Column"],
      recommended: ["Tech", "Design", "Startups"]
    },
    {
      id: "modern",
      name: "Modern Professional",
      description: "Contemporary design with subtle colors and professional appearance",
      preview: "bg-gradient-to-br from-blue-50 to-white border border-blue-100",
      features: ["Color Accents", "Professional", "Balanced Layout"],
      recommended: ["Marketing", "Consulting", "Sales"]
    },
    {
      id: "creative",
      name: "Creative Impact",
      description: "Eye-catching design for creative professionals while maintaining ATS compatibility",
      preview: "bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100",
      features: ["Creative Elements", "Visual Appeal", "ATS-Compatible"],
      recommended: ["Design", "Marketing", "Media"]
    }
  ];

  const handleSelectTemplate = (templateId: string, templateName: string) => {
    toast({
      title: `${templateName} selected!`,
      description: "Redirecting to editor with your chosen template.",
    });
    
    setTimeout(() => {
      navigate("/editor", { state: { selectedTemplate: templateId } });
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Choose Your Resume Template</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              All templates are ATS-friendly and optimized for applicant tracking systems. 
              Choose the one that best fits your industry and personal style.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {templates.map((template) => (
              <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{template.name}</CardTitle>
                      <CardDescription className="mt-2">{template.description}</CardDescription>
                    </div>
                    <FileText className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Template Preview */}
                  <div className={`${template.preview} rounded-lg p-6 h-48 flex flex-col justify-between`}>
                    <div>
                      <div className="h-6 bg-gray-800 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-400 rounded w-1/2 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-300 rounded w-full"></div>
                        <div className="h-2 bg-gray-300 rounded w-4/5"></div>
                        <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature, index) => (
                        <span
                          key={index}
                          className="flex items-center text-xs bg-success/10 text-success px-2 py-1 rounded-full"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Industries */}
                  <div>
                    <h4 className="font-semibold mb-2">Recommended for:</h4>
                    <div className="flex flex-wrap gap-2">
                      {template.recommended.map((industry, index) => (
                        <span
                          key={index}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        toast({
                          title: "Preview coming soon!",
                          description: "Full preview functionality will be available in the next update.",
                        });
                      }}
                    >
                      Preview
                    </Button>
                    <Button 
                      variant="hero" 
                      className="flex-1"
                      onClick={() => handleSelectTemplate(template.id, template.name)}
                    >
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Template Benefits */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-center">Why Our Templates Work</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">ATS-Optimized</h3>
                  <p className="text-sm text-muted-foreground">
                    All templates are designed to pass through Applicant Tracking Systems successfully
                  </p>
                </div>
                <div>
                  <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Professional Design</h3>
                  <p className="text-sm text-muted-foreground">
                    Carefully crafted layouts that make a strong first impression with recruiters
                  </p>
                </div>
                <div>
                  <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Industry-Tested</h3>
                  <p className="text-sm text-muted-foreground">
                    Templates tested across various industries and proven to increase interview rates
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Templates;