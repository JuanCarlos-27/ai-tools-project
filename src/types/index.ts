export interface Tool {
  Tool_ID: string;
  Tool_Name: string;
  AI_Category: string;
  Primary_Task: string;
  Secondary_Tasks: string;
  Modality: string;
  Industry_Use: string;
  Core_Technology: string;
  Open_Source: string;
  Pricing_Model: string;
  Popular_Among: string;
  Skill_Level: string;
  Deployment_Type: string;
  Region_Origin: string;
  Release_Year: string;
  Company_or_Organization: string;
  Integration_Support: string;
  Common_Use_Cases: string;
  Strengths: string;
  Limitations: string;
  Website_Category: string;
}

export interface FilterState {
  category: string;
  pricingModel: string;
  industryUse: string;
  skillLevel: string;
  openSource: string;
  searchQuery: string;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface CategoryStats {
  category: string;
  count: number;
  percentage: number;
}
