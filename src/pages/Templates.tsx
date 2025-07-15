import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { TemplateSelector } from "@/components/TemplateSelector";

const Templates = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState("classic");

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    toast({
      title: "Template selected!",
      description: "Use the 'Continue to Editor' button to start editing.",
    });
  };

  const proceedToEditor = () => {
    navigate("/editor", { state: { selectedTemplate } });
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

          <TemplateSelector 
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleSelectTemplate}
          />

          <div className="text-center mt-8">
            <Button 
              variant="hero" 
              size="lg"
              onClick={proceedToEditor}
              disabled={!selectedTemplate}
            >
              Continue to Editor
            </Button>
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