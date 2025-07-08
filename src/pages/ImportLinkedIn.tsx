import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link as LinkIcon, Upload, User, CheckCircle, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ImportLinkedIn = () => {
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [uploadedPdf, setUploadedPdf] = useState<File | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStep, setConnectionStep] = useState<"input" | "processing" | "success">("input");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLinkedInConnect = async () => {
    if (!linkedInUrl.includes("linkedin.com")) {
      toast({
        title: "Invalid LinkedIn URL",
        description: "Please enter a valid LinkedIn profile URL.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    setConnectionStep("processing");

    // Simulate API connection
    setTimeout(() => {
      setConnectionStep("success");
      setIsConnecting(false);
      toast({
        title: "LinkedIn data imported successfully!",
        description: "Your profile information has been extracted and is ready for editing.",
      });
      
      setTimeout(() => {
        navigate("/editor", { state: { linkedInData: true } });
      }, 2000);
    }, 3000);
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setUploadedPdf(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file exported from LinkedIn.",
        variant: "destructive",
      });
    }
  };

  const processPdfImport = async () => {
    if (!uploadedPdf) return;
    
    setIsConnecting(true);
    setConnectionStep("processing");

    setTimeout(() => {
      setConnectionStep("success");
      setIsConnecting(false);
      toast({
        title: "LinkedIn PDF processed successfully!",
        description: "Your profile data has been extracted and is ready for editing.",
      });
      
      setTimeout(() => {
        navigate("/editor", { state: { linkedInPdf: uploadedPdf } });
      }, 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Import from LinkedIn</h1>
            <p className="text-xl text-muted-foreground">
              Connect your LinkedIn profile or upload your LinkedIn PDF to auto-fill your resume
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* LinkedIn URL Import */}
            <Card className="h-fit">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <LinkIcon className="w-6 h-6 text-primary" />
                  <CardTitle>Connect via LinkedIn URL</CardTitle>
                </div>
                <CardDescription>
                  Enter your LinkedIn profile URL and we'll extract your professional information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {connectionStep === "input" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin-url">LinkedIn Profile URL</Label>
                      <Input
                        id="linkedin-url"
                        placeholder="https://linkedin.com/in/yourprofile"
                        value={linkedInUrl}
                        onChange={(e) => setLinkedInUrl(e.target.value)}
                      />
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">What we'll extract:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Professional headline and summary</li>
                        <li>• Work experience and job titles</li>
                        <li>• Education and certifications</li>
                        <li>• Skills and endorsements</li>
                        <li>• Contact information</li>
                      </ul>
                    </div>
                    
                    <Button 
                      onClick={handleLinkedInConnect}
                      disabled={!linkedInUrl || isConnecting}
                      className="w-full"
                      variant="hero"
                    >
                      Connect LinkedIn Profile
                    </Button>
                  </>
                )}

                {connectionStep === "processing" && (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <div>
                      <h3 className="font-semibold">Connecting to LinkedIn...</h3>
                      <p className="text-sm text-muted-foreground">
                        This may take a few moments while we extract your data
                      </p>
                    </div>
                  </div>
                )}

                {connectionStep === "success" && (
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-16 h-16 text-success mx-auto" />
                    <div>
                      <h3 className="font-semibold text-success">Successfully Connected!</h3>
                      <p className="text-sm text-muted-foreground">
                        Redirecting to editor...
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* LinkedIn PDF Upload */}
            <Card className="h-fit">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Upload className="w-6 h-6 text-primary" />
                  <CardTitle>Upload LinkedIn PDF</CardTitle>
                </div>
                <CardDescription>
                  Export your LinkedIn profile as PDF and upload it here for parsing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    How to export from LinkedIn:
                  </h4>
                  <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                    <li>Go to your LinkedIn profile</li>
                    <li>Click "More" in your intro section</li>
                    <li>Select "Save to PDF"</li>
                    <li>Download the generated PDF</li>
                  </ol>
                </div>

                {!uploadedPdf ? (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary hover:bg-primary/5 transition-all duration-300">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Upload LinkedIn PDF</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select your exported LinkedIn PDF file
                    </p>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfUpload}
                      className="hidden"
                      id="linkedin-pdf"
                    />
                    <label htmlFor="linkedin-pdf">
                      <Button variant="outline" asChild>
                        <span className="cursor-pointer">Choose PDF File</span>
                      </Button>
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-success/10 border border-success/20 rounded-lg text-center">
                      <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                      <h3 className="font-semibold text-success">PDF Uploaded</h3>
                      <p className="text-sm text-muted-foreground">{uploadedPdf.name}</p>
                    </div>
                    
                    <Button 
                      onClick={processPdfImport}
                      disabled={isConnecting}
                      className="w-full"
                      variant="success"
                    >
                      {isConnecting ? "Processing PDF..." : "Process LinkedIn PDF"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Alternative Options */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-6 h-6 mr-2 text-primary" />
                Alternative Options
              </CardTitle>
              <CardDescription>
                Other ways to get started with your resume
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-16" asChild>
                  <a href="/upload" className="flex flex-col">
                    <Upload className="w-6 h-6 mb-1" />
                    <span className="text-sm">Upload Resume</span>
                  </a>
                </Button>
                <Button variant="outline" className="h-16" asChild>
                  <a href="/editor" className="flex flex-col">
                    <User className="w-6 h-6 mb-1" />
                    <span className="text-sm">Start from Scratch</span>
                  </a>
                </Button>
                <Button variant="outline" className="h-16" asChild>
                  <a href="/templates" className="flex flex-col">
                    <CheckCircle className="w-6 h-6 mb-1" />
                    <span className="text-sm">Browse Templates</span>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImportLinkedIn;