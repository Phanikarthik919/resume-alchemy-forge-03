import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Star, Palette, Briefcase, Code, Rocket, Target, Heart, Zap, Crown } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  features: string[];
  recommended: string[];
  icon: any;
  isPremium?: boolean;
}

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export const TemplateSelector = ({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) => {
  const templates: Template[] = [
    {
      id: "classic",
      name: "Classic Professional",
      description: "Traditional layout perfect for corporate environments",
      category: "Professional",
      preview: "bg-white border-2 border-gray-200",
      features: ["ATS-Friendly", "Conservative Design", "Two-Column Layout"],
      recommended: ["Finance", "Law", "Healthcare"],
      icon: Briefcase
    },
    {
      id: "minimal",
      name: "Minimal Modern",
      description: "Clean, minimalist design with plenty of white space",
      category: "Modern",
      preview: "bg-gradient-to-br from-gray-50 to-white border border-gray-100",
      features: ["Clean Design", "Modern Typography", "Single Column"],
      recommended: ["Tech", "Design", "Startups"],
      icon: Target
    },
    {
      id: "modern",
      name: "Modern Professional",
      description: "Contemporary design with subtle colors",
      category: "Professional",
      preview: "bg-gradient-to-br from-blue-50 to-white border border-blue-100",
      features: ["Color Accents", "Professional", "Balanced Layout"],
      recommended: ["Marketing", "Consulting", "Sales"],
      icon: Star
    },
    {
      id: "creative",
      name: "Creative Impact",
      description: "Eye-catching design for creative professionals",
      category: "Creative",
      preview: "bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100",
      features: ["Creative Elements", "Visual Appeal", "ATS-Compatible"],
      recommended: ["Design", "Marketing", "Media"],
      icon: Palette
    },
    {
      id: "tech",
      name: "Tech Developer",
      description: "Code-inspired design for developers and engineers",
      category: "Tech",
      preview: "bg-gradient-to-br from-green-50 to-blue-50 border border-green-100",
      features: ["Monospace Fonts", "Code Sections", "Project Showcase"],
      recommended: ["Software Engineering", "DevOps", "Data Science"],
      icon: Code
    },
    {
      id: "startup",
      name: "Startup Innovator",
      description: "Bold design for entrepreneurs and startup professionals",
      category: "Modern",
      preview: "bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100",
      features: ["Bold Typography", "Achievement Focus", "Innovation Highlight"],
      recommended: ["Startups", "Product Management", "Innovation"],
      icon: Rocket
    },
    {
      id: "executive",
      name: "Executive Leader",
      description: "Premium design for C-level and senior executives",
      category: "Premium",
      preview: "bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100",
      features: ["Executive Summary", "Leadership Focus", "Premium Layout"],
      recommended: ["C-Level", "VP", "Director"],
      icon: Crown,
      isPremium: true
    },
    {
      id: "academic",
      name: "Academic Research",
      description: "Structured layout for researchers and academics",
      category: "Academic",
      preview: "bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100",
      features: ["Publication Lists", "Research Focus", "Academic Format"],
      recommended: ["Research", "Academia", "PhD"],
      icon: FileText
    },
    {
      id: "healthcare",
      name: "Healthcare Professional",
      description: "Clean, professional design for medical professionals",
      category: "Professional",
      preview: "bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100",
      features: ["Certification Highlight", "Clean Layout", "Professional"],
      recommended: ["Healthcare", "Medical", "Nursing"],
      icon: Heart
    },
    {
      id: "sales",
      name: "Sales Champion",
      description: "Results-focused design for sales professionals",
      category: "Sales",
      preview: "bg-gradient-to-br from-red-50 to-pink-50 border border-red-100",
      features: ["Metrics Focus", "Achievement Highlight", "Result-Driven"],
      recommended: ["Sales", "Business Development", "Account Management"],
      icon: Zap
    }
  ];

  const categories = [...new Set(templates.map(t => t.category))];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Template</h2>
        <p className="text-muted-foreground">
          All templates are ATS-friendly and professionally designed
        </p>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {category === "Premium" && <Crown className="w-5 h-5 text-amber-500" />}
            {category} Templates
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates
              .filter(template => template.category === category)
              .map((template) => {
                const Icon = template.icon;
                const isSelected = selectedTemplate === template.id;
                
                return (
                  <Card 
                    key={template.id} 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      isSelected ? 'ring-2 ring-primary shadow-lg' : ''
                    }`}
                    onClick={() => onSelectTemplate(template.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-primary" />
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                        </div>
                        {template.isPremium && (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Template Preview */}
                      <div className={`${template.preview} rounded-lg p-4 h-32 flex flex-col justify-between`}>
                        <div>
                          <div className="h-3 bg-gray-800 rounded w-3/4 mb-1"></div>
                          <div className="h-2 bg-gray-400 rounded w-1/2 mb-3"></div>
                          <div className="space-y-1">
                            <div className="h-1.5 bg-gray-300 rounded w-full"></div>
                            <div className="h-1.5 bg-gray-300 rounded w-4/5"></div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                          <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1">
                        {template.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {template.features.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.features.length - 2} more
                          </Badge>
                        )}
                      </div>

                      {/* Recommended Industries */}
                      <div className="text-xs text-muted-foreground">
                        Best for: {template.recommended.slice(0, 2).join(", ")}
                        {template.recommended.length > 2 && "..."}
                      </div>

                      <Button 
                        variant={isSelected ? "default" : "outline"} 
                        size="sm" 
                        className="w-full"
                      >
                        {isSelected ? "Selected" : "Select Template"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};