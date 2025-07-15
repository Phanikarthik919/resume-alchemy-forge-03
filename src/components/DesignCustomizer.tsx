import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Palette, Type, Layout, Image, Moon, Sun } from "lucide-react";

interface DesignCustomizerProps {
  onDesignChange: (design: any) => void;
}

export const DesignCustomizer = ({ onDesignChange }: DesignCustomizerProps) => {
  const [design, setDesign] = useState({
    primaryColor: "#3b82f6",
    secondaryColor: "#64748b",
    accentColor: "#f59e0b",
    font: "Inter",
    fontSize: 14,
    lineHeight: 1.5,
    spacing: "normal",
    theme: "light",
    headerStyle: "minimal",
    showPhoto: false,
    photoPosition: "left",
    sectionSpacing: 16,
    borderRadius: 4,
    showIcons: true
  });

  const colorSchemes = [
    { name: "Professional Blue", primary: "#3b82f6", secondary: "#64748b", accent: "#f59e0b" },
    { name: "Modern Green", primary: "#10b981", secondary: "#6b7280", accent: "#f59e0b" },
    { name: "Creative Purple", primary: "#8b5cf6", secondary: "#64748b", accent: "#ec4899" },
    { name: "Corporate Navy", primary: "#1e40af", secondary: "#475569", accent: "#dc2626" },
    { name: "Tech Orange", primary: "#ea580c", secondary: "#64748b", accent: "#3b82f6" },
    { name: "Elegant Black", primary: "#111827", secondary: "#6b7280", accent: "#f59e0b" }
  ];

  const fonts = [
    { name: "Inter", class: "font-sans", description: "Modern and clean" },
    { name: "Roboto", class: "font-sans", description: "Professional and readable" },
    { name: "Open Sans", class: "font-sans", description: "Friendly and approachable" },
    { name: "Playfair Display", class: "font-serif", description: "Elegant and sophisticated" },
    { name: "Source Sans Pro", class: "font-sans", description: "Technical and precise" },
    { name: "Lato", class: "font-sans", description: "Humanist and warm" }
  ];

  const updateDesign = (updates: Partial<typeof design>) => {
    const newDesign = { ...design, ...updates };
    setDesign(newDesign);
    onDesignChange(newDesign);
  };

  const applyColorScheme = (scheme: typeof colorSchemes[0]) => {
    updateDesign({
      primaryColor: scheme.primary,
      secondaryColor: scheme.secondary,
      accentColor: scheme.accent
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Design Customization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-3 block">Quick Color Schemes</Label>
              <div className="grid grid-cols-2 gap-3">
                {colorSchemes.map((scheme, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-3 justify-start"
                    onClick={() => applyColorScheme(scheme)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: scheme.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: scheme.secondary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: scheme.accent }}
                        />
                      </div>
                      <span className="text-sm">{scheme.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="primary-color"
                    type="color"
                    value={design.primaryColor}
                    onChange={(e) => updateDesign({ primaryColor: e.target.value })}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={design.primaryColor}
                    onChange={(e) => updateDesign({ primaryColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="secondary-color"
                    type="color"
                    value={design.secondaryColor}
                    onChange={(e) => updateDesign({ secondaryColor: e.target.value })}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={design.secondaryColor}
                    onChange={(e) => updateDesign({ secondaryColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="accent-color">Accent Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="accent-color"
                    type="color"
                    value={design.accentColor}
                    onChange={(e) => updateDesign({ accentColor: e.target.value })}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={design.accentColor}
                    onChange={(e) => updateDesign({ accentColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-3 block">Font Family</Label>
              <div className="grid gap-2">
                {fonts.map((font, index) => (
                  <Button
                    key={index}
                    variant={design.font === font.name ? "default" : "outline"}
                    className="justify-between h-auto p-3"
                    onClick={() => updateDesign({ font: font.name })}
                  >
                    <div className="text-left">
                      <div className={font.class} style={{ fontFamily: font.name }}>
                        {font.name}
                      </div>
                      <div className="text-xs text-muted-foreground">{font.description}</div>
                    </div>
                    <Type className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Font Size: {design.fontSize}px</Label>
                <Slider
                  value={[design.fontSize]}
                  onValueChange={([value]) => updateDesign({ fontSize: value })}
                  max={18}
                  min={10}
                  step={1}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>Line Height: {design.lineHeight}</Label>
                <Slider
                  value={[design.lineHeight]}
                  onValueChange={([value]) => updateDesign({ lineHeight: value })}
                  max={2}
                  min={1}
                  step={0.1}
                  className="mt-2"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-3 block">Header Style</Label>
              <Select value={design.headerStyle} onValueChange={(value) => updateDesign({ headerStyle: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="centered">Centered</SelectItem>
                  <SelectItem value="sidebar">Sidebar</SelectItem>
                  <SelectItem value="banner">Banner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Profile Photo</Label>
                <p className="text-sm text-muted-foreground">Show profile picture on resume</p>
              </div>
              <Switch
                checked={design.showPhoto}
                onCheckedChange={(checked) => updateDesign({ showPhoto: checked })}
              />
            </div>

            {design.showPhoto && (
              <div>
                <Label>Photo Position</Label>
                <Select value={design.photoPosition} onValueChange={(value) => updateDesign({ photoPosition: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Section Spacing: {design.sectionSpacing}px</Label>
                <Slider
                  value={[design.sectionSpacing]}
                  onValueChange={([value]) => updateDesign({ sectionSpacing: value })}
                  max={32}
                  min={8}
                  step={2}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>Border Radius: {design.borderRadius}px</Label>
                <Slider
                  value={[design.borderRadius]}
                  onValueChange={([value]) => updateDesign({ borderRadius: value })}
                  max={12}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Section Icons</Label>
                <p className="text-sm text-muted-foreground">Show icons next to section headings</p>
              </div>
              <Switch
                checked={design.showIcons}
                onCheckedChange={(checked) => updateDesign({ showIcons: checked })}
              />
            </div>
          </TabsContent>

          <TabsContent value="theme" className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-3 block">Theme Mode</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={design.theme === "light" ? "default" : "outline"}
                  className="h-auto p-4"
                  onClick={() => updateDesign({ theme: "light" })}
                >
                  <div className="flex items-center gap-3">
                    <Sun className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">Light</div>
                      <div className="text-xs text-muted-foreground">Clean and professional</div>
                    </div>
                  </div>
                </Button>
                
                <Button
                  variant={design.theme === "dark" ? "default" : "outline"}
                  className="h-auto p-4"
                  onClick={() => updateDesign({ theme: "dark" })}
                >
                  <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">Dark</div>
                      <div className="text-xs text-muted-foreground">Modern and sleek</div>
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Spacing Style</Label>
              <Select value={design.spacing} onValueChange={(value) => updateDesign({ spacing: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact - More content per page</SelectItem>
                  <SelectItem value="normal">Normal - Balanced spacing</SelectItem>
                  <SelectItem value="spacious">Spacious - More whitespace</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Design Preview</h4>
              <div 
                className="border rounded p-4 text-sm"
                style={{
                  backgroundColor: design.theme === "dark" ? "#1f2937" : "#ffffff",
                  color: design.theme === "dark" ? "#f9fafb" : "#111827",
                  fontFamily: design.font,
                  fontSize: design.fontSize,
                  lineHeight: design.lineHeight
                }}
              >
                <div 
                  className="font-bold mb-2"
                  style={{ color: design.primaryColor }}
                >
                  John Doe
                </div>
                <div 
                  className="mb-2"
                  style={{ color: design.secondaryColor }}
                >
                  Software Engineer
                </div>
                <div className="text-xs">
                  This is how your resume text will appear with the current design settings.
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};