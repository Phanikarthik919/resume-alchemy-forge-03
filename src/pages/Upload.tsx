import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload as UploadIcon, FileText, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setUploadedFile(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOC file.",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const processResume = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      toast({
        title: "Resume processed successfully!",
        description: "Your resume data has been extracted and is ready for editing.",
      });
      setIsProcessing(false);
      navigate("/editor", { state: { uploadedFile } });
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Upload Your Existing Resume</h1>
            <p className="text-xl text-muted-foreground">
              Upload your PDF or DOC resume and we'll extract all the information automatically
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Step 1: Upload Your Resume</CardTitle>
              <CardDescription>
                We support PDF and DOC formats. Our AI will extract your personal information, 
                work experience, education, and skills automatically.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                  isDragOver
                    ? "border-primary bg-primary/5"
                    : uploadedFile
                    ? "border-success bg-success/5"
                    : "border-muted-foreground/25 hover:border-primary hover:bg-primary/5"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {uploadedFile ? (
                  <div className="space-y-4">
                    <CheckCircle className="w-16 h-16 text-success mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-success">File uploaded successfully!</h3>
                      <p className="text-muted-foreground">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <UploadIcon className="w-16 h-16 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Drag and drop your resume here
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        or click to browse files
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label htmlFor="resume-upload">
                        <Button variant="outline" asChild>
                          <span className="cursor-pointer">Choose File</span>
                        </Button>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {uploadedFile && (
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Process Your Resume</CardTitle>
                <CardDescription>
                  Our AI will analyze your resume and extract all relevant information 
                  to populate the resume editor.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-muted rounded-lg">
                      <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold">Extract Text</h4>
                      <p className="text-sm text-muted-foreground">Parse document content</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold">Identify Sections</h4>
                      <p className="text-sm text-muted-foreground">Categorize information</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <UploadIcon className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold">Populate Editor</h4>
                      <p className="text-sm text-muted-foreground">Fill resume form</p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={processResume}
                    disabled={isProcessing}
                    className="w-full"
                    variant="hero"
                    size="lg"
                  >
                    {isProcessing ? "Processing Resume..." : "Process Resume & Continue to Editor"}
                  </Button>
                  
                  {isProcessing && (
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full animate-pulse w-3/4"></div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;