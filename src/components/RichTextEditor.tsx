import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bold, Italic, List, Type, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  aiSuggestions?: boolean;
  rows?: number;
}

export const RichTextEditor = ({ 
  value, 
  onChange, 
  placeholder = "Start typing...", 
  aiSuggestions = true,
  rows = 4 
}: RichTextEditorProps) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleBold = () => {
    const newValue = isBold ? value.replace(/\*\*(.*?)\*\*/g, '$1') : `**${value}**`;
    onChange(newValue);
    setIsBold(!isBold);
  };

  const handleItalic = () => {
    const newValue = isItalic ? value.replace(/\*(.*?)\*/g, '$1') : `*${value}*`;
    onChange(newValue);
    setIsItalic(!isItalic);
  };

  const handleBullets = () => {
    const lines = value.split('\n');
    const bulletLines = lines.map(line => 
      line.trim().startsWith('•') ? line : `• ${line}`
    );
    onChange(bulletLines.join('\n'));
  };

  const handleAiRewrite = async () => {
    if (!value.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const aiSuggestions = [
        "Led cross-functional team of 8 engineers to deliver scalable web applications, resulting in 40% performance improvement and 95% user satisfaction rating.",
        "Spearheaded development of microservices architecture, reducing deployment time by 60% and improving system reliability to 99.9% uptime.",
        "Implemented comprehensive testing strategies including unit, integration, and E2E testing, resulting in 70% reduction in production bugs.",
        "Collaborated with product managers and UX designers to deliver user-centric features, increasing customer engagement by 35%."
      ];
      
      const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
      onChange(randomSuggestion);
      setIsProcessing(false);
      
      toast({
        title: "AI rewrite applied!",
        description: "Content has been enhanced with professional language and quantifiable results.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-muted/30">
        <Button 
          size="sm" 
          variant={isBold ? "default" : "outline"}
          onClick={handleBold}
        >
          <Bold className="w-3 h-3" />
        </Button>
        <Button 
          size="sm" 
          variant={isItalic ? "default" : "outline"}
          onClick={handleItalic}
        >
          <Italic className="w-3 h-3" />
        </Button>
        <Button size="sm" variant="outline" onClick={handleBullets}>
          <List className="w-3 h-3" />
        </Button>
        <Button size="sm" variant="outline">
          <Type className="w-3 h-3" />
        </Button>
        
        {aiSuggestions && (
          <Button 
            size="sm" 
            variant="ai" 
            onClick={handleAiRewrite}
            disabled={isProcessing}
            className="ml-auto"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            {isProcessing ? "Rewriting..." : "AI Rewrite"}
          </Button>
        )}
      </div>
      
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="resize-none"
      />
    </div>
  );
};