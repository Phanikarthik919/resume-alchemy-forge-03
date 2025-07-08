import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Link as LinkIcon, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Export = () => {
  const [exportFormat, setExportFormat] = useState("pdf");
  const [shareableLink, setShareableLink] = useState("");
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Exporting resume...",
      description: `Your resume is being exported as ${exportFormat.toUpperCase()}. Download will start shortly.`,
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export completed!",
        description: "Your resume has been downloaded successfully.",
      });
    }, 2000);
  };

  const generateShareLink = () => {
    const link = `${window.location.origin}/resume/share/${Math.random().toString(36).substr(2, 9)}`;
    setShareableLink(link);
    navigator.clipboard.writeText(link);
    
    toast({
      title: "Shareable link created!",
      description: "Link has been copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Export & Share Your Resume</h1>
            <p className="text-xl text-muted-foreground">
              Download your resume or create shareable links for easy distribution
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Export Options */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="w-5 h-5 mr-2" />
                    Download Resume
                  </CardTitle>
                  <CardDescription>
                    Export your resume in various formats for job applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium">Export Format</label>
                    <Select value={exportFormat} onValueChange={setExportFormat}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF (Recommended)</SelectItem>
                        <SelectItem value="docx">Microsoft Word (.docx)</SelectItem>
                        <SelectItem value="txt">Plain Text (.txt)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF is recommended for best formatting preservation
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Export Features:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• High-quality formatting preservation</li>
                      <li>• ATS-compatible file structure</li>
                      <li>• Professional print-ready quality</li>
                      <li>• Optimized file size</li>
                    </ul>
                  </div>

                  <Button onClick={handleExport} className="w-full" variant="hero" size="lg">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LinkIcon className="w-5 h-5 mr-2" />
                    Share Resume
                  </CardTitle>
                  <CardDescription>
                    Create shareable links for easy distribution to employers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Sharing Benefits:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Always up-to-date with latest changes</li>
                      <li>• Professional online presence</li>
                      <li>• Easy to include in email signatures</li>
                      <li>• Track who views your resume</li>
                    </ul>
                  </div>

                  {shareableLink ? (
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Your Shareable Link:</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={shareableLink}
                          readOnly
                          className="flex-1 px-3 py-2 border rounded-md bg-muted text-sm"
                        />
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(shareableLink);
                            toast({ title: "Link copied!" });
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={generateShareLink} className="w-full" variant="outline">
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Generate Shareable Link
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Final Preview
                  </CardTitle>
                  <CardDescription>
                    Review your resume before exporting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border shadow-lg rounded-lg p-8 min-h-[500px]">
                    {/* Resume Preview */}
                    <div className="space-y-6 text-black">
                      <div className="text-center border-b pb-4">
                        <h1 className="text-2xl font-bold">John Doe</h1>
                        <div className="text-sm text-gray-600 mt-2">
                          john.doe@email.com • +1 (555) 123-4567
                        </div>
                        <div className="text-sm text-gray-600">New York, NY</div>
                      </div>

                      <div>
                        <h2 className="text-lg font-bold mb-2">Professional Summary</h2>
                        <p className="text-sm">
                          Experienced software developer with 5+ years of experience in full-stack development.
                        </p>
                      </div>

                      <div>
                        <h2 className="text-lg font-bold mb-2">Experience</h2>
                        <div className="mb-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">Senior Software Developer</h3>
                              <p className="text-sm text-gray-600">Tech Corp • New York, NY</p>
                            </div>
                            <span className="text-sm text-gray-500">2022-01 - Present</span>
                          </div>
                          <p className="text-sm mt-2">
                            Led development of web applications using React and Node.js. Improved system performance by 40%.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-lg font-bold mb-2">Education</h2>
                        <div>
                          <h3 className="font-semibold">Bachelor of Science in Computer Science</h3>
                          <p className="text-sm text-gray-600">University of Technology • New York, NY</p>
                          <span className="text-sm text-gray-500">2019-05</span>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-lg font-bold mb-2">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                          {["JavaScript", "React", "Node.js", "Python", "SQL", "AWS"].map((skill) => (
                            <span key={skill} className="text-sm bg-gray-100 px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Export Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Include contact QR code</label>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Watermark-free export</label>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">High-resolution images</label>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 text-center">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-16" asChild>
                    <a href="/editor" className="flex flex-col">
                      <FileText className="w-6 h-6 mb-1" />
                      <span className="text-sm">Edit Resume</span>
                    </a>
                  </Button>
                  <Button variant="outline" className="h-16" asChild>
                    <a href="/templates" className="flex flex-col">
                      <Settings className="w-6 h-6 mb-1" />
                      <span className="text-sm">Change Template</span>
                    </a>
                  </Button>
                  <Button variant="outline" className="h-16" asChild>
                    <a href="/dashboard" className="flex flex-col">
                      <LinkIcon className="w-6 h-6 mb-1" />
                      <span className="text-sm">View Dashboard</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Export;