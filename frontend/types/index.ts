export interface HealthResponse {
  status: string;
  service: string;
}

export interface CropAnalysisResult {
  is_identified: boolean;
  crop?: string | null;
  possible_condition?: string | null;
  confidence?: number | null;
  confidence_text?: string | null;
  severity?: "Healthy" | "Mild" | "Moderate" | "Severe" | "Unknown" | string;
  observations: string[];
  explanation: string;
  recommended_actions: string[];
  preventive_guidance: string[];
  additional_information_needed: string[];
  disclaimer: string;
  is_demo: boolean;
  error?: string | null;
}

export interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: string;
  description?: string;
}

export interface FarmerProfile {
  name: string;
  location: string;
  state: string;
  avatarText?: string;
}

export interface WeatherDemoData {
  temp: string;
  condition: string;
  rainProb: string;
  location: string;
}

export interface SoilDemoData {
  score: number;
  status: "Good" | "Fair" | "Needs Attention";
  lastTested: string;
}

export interface CropHealthDemoData {
  status: "Healthy" | "Attention" | "Diseased";
  cropName: string;
  lastChecked: string;
}

export interface MandiDemoData {
  commodity: string;
  price: string;
  unit: string;
  market: string;
  isDemo: boolean;
}

export interface FarmAlertItem {
  id: string;
  type: "info" | "warning" | "success" | "danger";
  title: string;
  description: string;
  time: string;
  isDemo: boolean;
}
