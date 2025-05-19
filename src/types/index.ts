/**
 * Resume analysis result from Gemini API
 */
export interface ResumeAnalysisResult {
  /** List of skills extracted from the resume */
  ExtractedSkills: string[];
  
  /** Suggestions for enhancing existing skills */
  SkillEnhancementSuggestions: Record<string, string>;
  
  /** Additional skills recommended to learn */
  RecommendedSkills: string[];
  
  /** Suggested job roles based on the resume */
  SuggestedJobRoles: string[];
  
  /** Summary of the candidate's profile */
  ProfileSummary: string;
}