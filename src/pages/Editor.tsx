import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Download, User, Settings, FileText, Plus, Trash2, Palette, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RichTextEditor } from "@/components/RichTextEditor";
import { DesignCustomizer } from "@/components/DesignCustomizer";
import { AIAssistantPanel } from "@/components/AIAssistantPanel";

const Editor = () => {
  const [currentTab, setCurrentTab] = useState("personal");
  const [showDesignPanel, setShowDesignPanel] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      website: "",
      linkedin: "",
      summary: "Experienced software developer with 5+ years of experience in full-stack development, specializing in React and Node.js applications."
    },
    experience: [
      {
        id: 1,
        title: "Senior Software Developer",
        company: "Tech Corp",
        location: "New York, NY",
        startDate: "2022-01",
        endDate: "Present",
        description: "Led development of web applications using React and Node.js. Improved system performance by 40% and reduced load times by 60%."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        school: "University of Technology",
        location: "New York, NY",
        graduationDate: "2019-05",
        gpa: "3.8"
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS"],
    projects: [
      {
        id: 1,
        name: "E-commerce Platform",
        description: "Built scalable e-commerce platform with React, Node.js, and MongoDB serving 10,000+ users",
        technologies: ["React", "Node.js", "MongoDB"],
        url: "https://github.com/example"
      }
    ],
    certifications: [
      {
        id: 1,
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2023-06",
        url: ""
      }
    ],
    customSections: []
  });

  const { toast } = useToast();

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: ""
    };
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExp]
    });
  };

  const removeExperience = (id: number) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      degree: "",
      school: "",
      location: "",
      graduationDate: "",
      gpa: ""
    };
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEdu]
    });
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: "",
      description: "",
      technologies: [],
      url: ""
    };
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject]
    });
  };

  const addCertification = () => {
    const newCert = {
      id: Date.now(),
      name: "",
      issuer: "",
      date: "",
      url: ""
    };
    setResumeData({
      ...resumeData,
      certifications: [...resumeData.certifications, newCert]
    });
  };

  const addSkill = (skill: string) => {
    if (skill && !resumeData.skills.includes(skill)) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, skill]
      });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter(skill => skill !== skillToRemove)
    });
  };

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
            <Button 
              variant="ai" 
              onClick={() => setShowAIAssistant(!showAIAssistant)}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowDesignPanel(!showDesignPanel)}
            >
              <Palette className="w-4 h-4 mr-2" />
              Customize Design
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            {showDesignPanel && (
              <DesignCustomizer 
                onDesignChange={(design) => {
                  toast({
                    title: "Design updated!",
                    description: "Your resume design has been customized.",
                  });
                }}
              />
            )}
            
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid grid-cols-6 w-full">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="certs">Certs</TabsTrigger>
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          placeholder="https://yourwebsite.com"
                          value={resumeData.personalInfo.website}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, website: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          placeholder="https://linkedin.com/in/yourprofile"
                          value={resumeData.personalInfo.linkedin}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, linkedin: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="summary">Professional Summary</Label>
                      <RichTextEditor
                        value={resumeData.personalInfo.summary}
                        onChange={(value) => setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, summary: value }
                        })}
                        placeholder="Write a compelling professional summary..."
                        rows={4}
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
                      <Button size="sm" variant="outline" onClick={addExperience}>
                        <Plus className="w-4 h-4 mr-1" />
                        Add Experience
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={exp.id} className="p-4 border rounded-lg space-y-4 relative">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Experience #{index + 1}</h4>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => removeExperience(exp.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Job Title</Label>
                            <Input 
                              value={exp.title}
                              onChange={(e) => {
                                const updatedExp = resumeData.experience.map(item => 
                                  item.id === exp.id ? { ...item, title: e.target.value } : item
                                );
                                setResumeData({ ...resumeData, experience: updatedExp });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Company</Label>
                            <Input 
                              value={exp.company}
                              onChange={(e) => {
                                const updatedExp = resumeData.experience.map(item => 
                                  item.id === exp.id ? { ...item, company: e.target.value } : item
                                );
                                setResumeData({ ...resumeData, experience: updatedExp });
                              }}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label>Location</Label>
                            <Input 
                              value={exp.location}
                              onChange={(e) => {
                                const updatedExp = resumeData.experience.map(item => 
                                  item.id === exp.id ? { ...item, location: e.target.value } : item
                                );
                                setResumeData({ ...resumeData, experience: updatedExp });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Start Date</Label>
                            <Input 
                              type="month" 
                              value={exp.startDate}
                              onChange={(e) => {
                                const updatedExp = resumeData.experience.map(item => 
                                  item.id === exp.id ? { ...item, startDate: e.target.value } : item
                                );
                                setResumeData({ ...resumeData, experience: updatedExp });
                              }}
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input 
                              value={exp.endDate}
                              placeholder="Present"
                              onChange={(e) => {
                                const updatedExp = resumeData.experience.map(item => 
                                  item.id === exp.id ? { ...item, endDate: e.target.value } : item
                                );
                                setResumeData({ ...resumeData, experience: updatedExp });
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <RichTextEditor
                            value={exp.description}
                            onChange={(value) => {
                              const updatedExp = resumeData.experience.map(item => 
                                item.id === exp.id ? { ...item, description: value } : item
                              );
                              setResumeData({ ...resumeData, experience: updatedExp });
                            }}
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                          />
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
                      <Button size="sm" variant="outline" onClick={addEducation}>
                        <Plus className="w-4 h-4 mr-1" />
                        Add Education
                      </Button>
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
                    <CardTitle>Skills & Technologies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            <span>{skill}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-auto p-0 w-4 h-4 hover:bg-destructive/20 hover:text-destructive"
                              onClick={() => removeSkill(skill)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Input 
                        placeholder="Add a new skill and press Enter"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addSkill(e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium mb-2">Popular skills for your role:</p>
                        <div className="flex flex-wrap gap-2">
                          {["TypeScript", "GraphQL", "Docker", "Kubernetes", "CI/CD", "Testing"].map(skill => (
                            <Button
                              key={skill}
                              size="sm"
                              variant="outline"
                              onClick={() => addSkill(skill)}
                              className="text-xs h-6"
                            >
                              + {skill}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Projects
                      <Button size="sm" variant="outline" onClick={addProject}>
                        <Plus className="w-4 h-4 mr-1" />
                        Add Project
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.projects.map((project, index) => (
                      <div key={project.id} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Project #{index + 1}</h4>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => {
                              setResumeData({
                                ...resumeData,
                                projects: resumeData.projects.filter(p => p.id !== project.id)
                              });
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Project Name</Label>
                            <Input 
                              value={project.name}
                              onChange={(e) => {
                                const updatedProjects = resumeData.projects.map(item => 
                                  item.id === project.id ? { ...item, name: e.target.value } : item
                                );
                                setResumeData({ ...resumeData, projects: updatedProjects });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Project URL</Label>
                            <Input 
                              value={project.url}
                              placeholder="https://github.com/username/project"
                              onChange={(e) => {
                                const updatedProjects = resumeData.projects.map(item => 
                                  item.id === project.id ? { ...item, url: e.target.value } : item
                                );
                                setResumeData({ ...resumeData, projects: updatedProjects });
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <RichTextEditor
                            value={project.description}
                            onChange={(value) => {
                              const updatedProjects = resumeData.projects.map(item => 
                                item.id === project.id ? { ...item, description: value } : item
                              );
                              setResumeData({ ...resumeData, projects: updatedProjects });
                            }}
                            placeholder="Describe your project and its impact..."
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Certifications
                      <Button size="sm" variant="outline" onClick={addCertification}>
                        <Plus className="w-4 h-4 mr-1" />
                        Add Certification
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.certifications.map((cert, index) => (
                      <div key={cert.id} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Certification #{index + 1}</h4>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => {
                              setResumeData({
                                ...resumeData,
                                certifications: resumeData.certifications.filter(c => c.id !== cert.id)
                              });
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Certification Name</Label>
                            <Input 
                              value={cert.name}
                              onChange={(e) => {
                                const updatedCerts = resumeData.certifications.map(item => 
                                  item.id === cert.id ? { ...item, name: e.target.value } : item
                                );
                                setResumeData({ ...resumeData, certifications: updatedCerts });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Issuing Organization</Label>
                            <Input 
                              value={cert.issuer}
                              onChange={(e) => {
                                const updatedCerts = resumeData.certifications.map(item => 
                                  item.id === cert.id ? { ...item, issuer: e.target.value } : item
                                );
                                setResumeData({ ...resumeData, certifications: updatedCerts });
                              }}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Date Obtained</Label>
                            <Input 
                              type="month"
                              value={cert.date}
                              onChange={(e) => {
                                const updatedCerts = resumeData.certifications.map(item => 
                                  item.id === cert.id ? { ...item, date: e.target.value } : item
                                );
                                setResumeData({ ...resumeData, certifications: updatedCerts });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Verification URL</Label>
                            <Input 
                              value={cert.url}
                              placeholder="https://verify.cert.com/abc123"
                              onChange={(e) => {
                                const updatedCerts = resumeData.certifications.map(item => 
                                  item.id === cert.id ? { ...item, url: e.target.value } : item
                                );
                                setResumeData({ ...resumeData, certifications: updatedCerts });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
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

                    {resumeData.projects.length > 0 && (
                      <div>
                        <h2 className="text-lg font-bold mb-2">Projects</h2>
                        {resumeData.projects.map((project) => (
                          <div key={project.id} className="mb-4">
                            <h3 className="font-semibold">{project.name}</h3>
                            <p className="text-sm mt-1">{project.description}</p>
                            {project.url && (
                              <a href={project.url} className="text-xs text-blue-600 hover:underline">
                                View Project
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {resumeData.certifications.length > 0 && (
                      <div>
                        <h2 className="text-lg font-bold mb-2">Certifications</h2>
                        {resumeData.certifications.map((cert) => (
                          <div key={cert.id} className="mb-2">
                            <h3 className="font-semibold">{cert.name}</h3>
                            <p className="text-sm text-gray-600">{cert.issuer}</p>
                            <span className="text-sm text-gray-500">{cert.date}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <AIAssistantPanel
          isVisible={showAIAssistant}
          onToggle={() => setShowAIAssistant(!showAIAssistant)}
          currentSection={currentTab}
          content={
            currentTab === "personal" ? resumeData.personalInfo.summary :
            currentTab === "experience" ? resumeData.experience[0]?.description || "" :
            currentTab === "skills" ? resumeData.skills.join(", ") :
            currentTab === "projects" ? resumeData.projects[0]?.description || "" :
            ""
          }
        />
      </div>
    </div>
  );
};

export default Editor;