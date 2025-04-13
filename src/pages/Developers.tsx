import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Brain, Github, Linkedin, Mail, MapPin, Twitter, Globe, Code, Heart } from "lucide-react";
import Navbar from "@/components/navbar";

// Developer information - replace with your actual info
interface Developer {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  location: string;
  github: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  website?: string;
  skills: string[];
}

const developers: Developer[] = [
  {
    name: "Developer One",
    role: "Frontend Developer",
    bio: "Passionate about creating intuitive and accessible user interfaces with React and TypeScript.",
    avatarUrl: "https://github.com/developer-one.png", // Replace with GitHub username
    location: "Patna, India",
    github: "developer-one",
    linkedin: "developer-one",
    twitter: "developer_one",
    email: "developer.one@example.com",
    website: "https://developer-one.dev",
    skills: ["React", "TypeScript", "TailwindCSS", "Next.js", "UI/UX"]
  },
  {
    name: "Developer Two",
    role: "Backend Developer & AI Specialist",
    bio: "Focused on building robust backend systems and implementing AI solutions for mental health applications.",
    avatarUrl: "https://github.com/developer-two.png", // Replace with GitHub username
    location: "Patna, India",
    github: "developer-two",
    linkedin: "developer-two",
    email: "developer.two@example.com",
    skills: ["Python", "Node.js", "AI/ML", "Azure", "API Design"]
  }
];

// GitHub API interface
interface GitHubUserData {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  html_url: string;
  location: string;
}

const Developers = () => {
  const [githubData, setGithubData] = useState<Record<string, GitHubUserData>>({});
  const [loading, setLoading] = useState(true);

  // Fetch GitHub profiles
  useEffect(() => {
    const fetchGitHubProfiles = async () => {
      const profiles: Record<string, GitHubUserData> = {};
      
      try {
        for (const dev of developers) {
          try {
            const response = await fetch(`https://api.github.com/users/${dev.github}`);
            if (response.ok) {
              const data = await response.json();
              profiles[dev.github] = data;
            }
          } catch (error) {
            console.error(`Error fetching GitHub data for ${dev.github}:`, error);
          }
        }
        
        setGithubData(profiles);
      } catch (error) {
        console.error("Error fetching GitHub profiles:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGitHubProfiles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      
      <div className="pt-20 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-7xl font-bold mb-4 text-gray-900 dark:text-gray-50">सह-<span className="text-yellow-500">AI</span>-यक</h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              Meet the Team
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The developers behind सह-AI-यक are passionate about using technology to improve mental health accessibility and support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {developers.map((developer) => {
              const githubUser = githubData[developer.github];
              
              return (
                <Card key={developer.github} className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
                  <CardHeader className="pb-0">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4 items-center">
                        <Avatar className="h-16 w-16 border-2 border-white dark:border-gray-800 shadow-md">
                          <AvatarImage 
                            src={githubUser?.avatar_url || developer.avatarUrl} 
                            alt={developer.name} 
                          />
                          <AvatarFallback>{developer.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{githubUser?.name || developer.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
                            {githubUser?.location || developer.location}
                          </CardDescription>
                        </div>
                      </div>
                      
                      {githubUser && (
                        <div className="flex flex-col items-end">
                          <div className="flex gap-2">
                            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                              {githubUser.public_repos} repos
                            </Badge>
                            <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                              {githubUser.followers} followers
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-1">{developer.role}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {githubUser?.bio || developer.bio}
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Skills & Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {developer.skills.map(skill => (
                          <Badge key={skill} className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="py-3">
                    <div className="flex gap-2 items-center">
                      <Button size="sm" variant="outline" className="gap-1" asChild>
                        <a href={`https://github.com/${developer.github}`} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          <span>GitHub</span>
                        </a>
                      </Button>
                      
                      {developer.linkedin && (
                        <Button size="sm" variant="outline" className="gap-1" asChild>
                          <a href={`https://linkedin.com/in/${developer.linkedin}`} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4" />
                            <span className="sr-only">LinkedIn</span>
                          </a>
                        </Button>
                      )}
                      
                      {developer.twitter && (
                        <Button size="sm" variant="outline" className="gap-1" asChild>
                          <a href={`https://twitter.com/${developer.twitter}`} target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-4 w-4" />
                            <span className="sr-only">Twitter</span>
                          </a>
                        </Button>
                      )}
                      
                      {developer.email && (
                        <Button size="sm" variant="outline" className="gap-1" asChild>
                          <a href={`mailto:${developer.email}`}>
                            <Mail className="h-4 w-4" />
                            <span className="sr-only">Email</span>
                          </a>
                        </Button>
                      )}
                      
                      {developer.website && (
                        <Button size="sm" variant="outline" className="gap-1" asChild>
                          <a href={developer.website} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4" />
                            <span className="sr-only">Website</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          
          <div className="mt-12 text-center">
            <p className="flex justify-center items-center text-sm text-gray-500 dark:text-gray-400 gap-1">
              <Code className="h-4 w-4" />
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-500 mx-1" />
              <span>for HackVita 3.0</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;
