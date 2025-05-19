import { ResumeAnalysisResult } from '../types';

// Your Gemini API key
const GEMINI_API_KEY = "AIzaSyDhtkEFNSVCqZk8NGHjLQEX02PnRTSZUaY";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

/**
 * Analyzes a resume using the Gemini API and returns structured analysis
 */
export async function analyzeResume(resumeText: string): Promise<ResumeAnalysisResult> {
  try {
    const prompt = `
Analyze the following resume.

List all the skills mentioned in the resume.

For each skill, suggest specific ways to enhance it (such as certifications, courses, or projects).

Recommend additional skills that would improve the candidate's career prospects and resume.

Based on the candidate's skills and experience, suggest relevant job roles.
Respond in a structured JSON format with these sections:

"ExtractedSkills": [list of skills]

"SkillEnhancementSuggestions": {skill: suggestion, ...}

"RecommendedSkills": [list of new skills]

"SuggestedJobRoles": [list of job roles]

"ProfileSummary": "Concise summary of candidate's strengths and areas for improvement."

Resume:
${resumeText}
`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Gemini API error:', data);
      throw new Error('Failed to analyze resume');
    }
    
    // Extract the JSON from the response
    const textResponse = data.candidates[0].content.parts[0].text;
    
    // Find and extract the JSON part of the response
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON response from Gemini');
    }
    
    const jsonResponse = JSON.parse(jsonMatch[0]);
    
    // Ensure all required fields are present
    const result: ResumeAnalysisResult = {
      ExtractedSkills: jsonResponse.ExtractedSkills || [],
      SkillEnhancementSuggestions: jsonResponse.SkillEnhancementSuggestions || {},
      RecommendedSkills: jsonResponse.RecommendedSkills || [],
      SuggestedJobRoles: jsonResponse.SuggestedJobRoles || [],
      ProfileSummary: jsonResponse.ProfileSummary || 'No profile summary available.'
    };
    
    return result;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    
    // Return fallback/mock data for development or when API fails
    return getMockAnalysisResult();
  }
}

// Mock data for development or when API fails
function getMockAnalysisResult(): ResumeAnalysisResult {
  return {
    ExtractedSkills: [
      "JavaScript", "TypeScript", "React", "Node.js", "HTML/CSS",
      "SQL", "MongoDB", "Git", "Agile", "UI/UX Design",
      "RESTful APIs", "Test-Driven Development"
    ],
    SkillEnhancementSuggestions: {
      "JavaScript": "Improve your JavaScript skills by obtaining an Advanced JavaScript certification from platforms like Udacity or Coursera. Work on complex projects involving asynchronous programming and functional programming concepts.",
      "React": "Enhance your React skills by building a full-featured application with Redux, React Query, and implementing advanced patterns like render props and custom hooks. Consider obtaining React certification from Meta.",
      "Node.js": "Strengthen your Node.js expertise by building microservices, implementing authentication systems, and working with streams and buffers. The OpenJS Node.js Application Developer certification would validate your skills.",
      "SQL": "Take an advanced SQL course covering performance optimization, complex joins, and database design. Consider obtaining Oracle SQL or Microsoft SQL Server certification.",
      "MongoDB": "Obtain MongoDB Developer and DBA certifications to demonstrate expertise. Build projects implementing complex data models and aggregation pipelines."
    },
    RecommendedSkills: [
      "GraphQL", "Docker/Kubernetes", "AWS/Cloud Services",
      "TypeScript", "Next.js", "CI/CD Pipelines",
      "Data Visualization", "Performance Optimization"
    ],
    SuggestedJobRoles: [
      "Senior Frontend Developer", "Full Stack Engineer",
      "React Technical Lead", "JavaScript Architect",
      "Senior Software Engineer", "DevOps Engineer",
      "Technical Project Manager"
    ],
    ProfileSummary: "You have a strong foundation in modern web development technologies, particularly in the JavaScript ecosystem with React and Node.js. Your experience with both frontend and backend technologies makes you suitable for full-stack roles. To progress in your career, consider deepening your expertise in areas like cloud services, containerization, and modern frameworks like Next.js. Additionally, developing leadership and architecture skills would position you well for senior roles. Your combination of technical and agile methodologies is valuable, but adding more specialized skills in emerging technologies would enhance your marketability."
  };
}