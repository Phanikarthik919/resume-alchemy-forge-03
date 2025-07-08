import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Download, User, Settings, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Editor = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      summary: "Experienced software developer with 5+ years of experience in full-stack development."
    },
    experience: [
      {
        id: 1,
        title: "Senior Software Developer",
        company: "Tech Corp",
        location: "New York, NY",
        startDate: "2022-01",
        endDate: "Present",
        description: "Led development of web applications using React and Node.js. Improved system performance by 40%."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        school: "University of Technology",
        location: "New York, NY",
        graduationDate: "2019-05"
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS"]
  });

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Resume saved!",
      description: "Your resume has been saved successfully.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exporting resume...",
      description: "Your resume PDF will be ready shortly.",
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Resume Editor</h1>
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleSave} variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button onClick={handleExport} variant="hero">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" asChild>
              <a href="/templates">Change Template</a>
            </Button>
            <Button variant="ai" asChild>
              <a href="/assistant">AI Assistant</a>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={resumeData.personalInfo.name}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, name: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, email: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, phone: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={resumeData.personalInfo.location}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, location: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        rows={4}
                        value={resumeData.personalInfo.summary}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, summary: e.target.value }
                        })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Work Experience
                      </span>
                      <Button size="sm" variant="outline">Add Experience</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id} className="p-4 border rounded-lg space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Job Title</Label>
                            <Input value={exp.title} />
                          </div>
                          <div>
                            <Label>Company</Label>
                            <Input value={exp.company} />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label>Location</Label>
                            <Input value={exp.location} />
                          </div>
                          <div>
                            <Label>Start Date</Label>
                            <Input type="month" value={exp.startDate} />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input value={exp.endDate} />
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea rows={3} value={exp.description} />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Settings className="w-5 h-5 mr-2" />
                        Education
                      </span>
                      <Button size="sm" variant="outline">Add Education</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="p-4 border rounded-lg space-y-4">
                        <div>
                          <Label>Degree</Label>
                          <Input value={edu.degree} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>School</Label>
                            <Input value={edu.school} />
                          </div>
                          <div>
                            <Label>Location</Label>
                            <Input value={edu.location} />
                          </div>
                        </div>
                        <div>
                          <Label>Graduation Date</Label>
                          <Input type="month" value={edu.graduationDate} />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <Input placeholder="Add a new skill and press Enter" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="sticky top-24">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-8 border shadow-lg min-h-[600px] text-black">
                  {/* Resume Preview */}
                  <div className="space-y-6">
                    <div className="text-center border-b pb-4">
                      <h1 className="text-2xl font-bold">{resumeData.personalInfo.name}</h1>
                      <div className="text-sm text-gray-600 mt-2">
                        {resumeData.personalInfo.email} • {resumeData.personalInfo.phone}
                      </div>
                      <div className="text-sm text-gray-600">
                        {resumeData.personalInfo.location}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-bold mb-2">Professional Summary</h2>
                      <p className="text-sm">{resumeData.personalInfo.summary}</p>
                    </div>

                    <div>
                      <h2 className="text-lg font-bold mb-2">Experience</h2>
                      {resumeData.experience.map((exp) => (
                        <div key={exp.id} className="mb-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{exp.title}</h3>
                              <p className="text-sm text-gray-600">{exp.company} • {exp.location}</p>
                            </div>
                            <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
                          </div>
                          <p className="text-sm mt-2">{exp.description}</p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h2 className="text-lg font-bold mb-2">Education</h2>
                      {resumeData.education.map((edu) => (
                        <div key={edu.id} className="mb-2">
                          <h3 className="font-semibold">{edu.degree}</h3>
                          <p className="text-sm text-gray-600">{edu.school} • {edu.location}</p>
                          <span className="text-sm text-gray-500">{edu.graduationDate}</span>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h2 className="text-lg font-bold mb-2">Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, index) => (
                          <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;