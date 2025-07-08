import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, FileText } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/upload", label: "Upload Resume" },
    { path: "/import-linkedin", label: "Import LinkedIn" },
    { path: "/editor", label: "Editor" },
    { path: "/templates", label: "Templates" },
    { path: "/assistant", label: "AI Assistant" },
    { path: "/interview", label: "Interview Tips" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ResumeAI
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.path)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link to="/editor">
            <Button variant="hero" size="sm">
              Start Building
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;