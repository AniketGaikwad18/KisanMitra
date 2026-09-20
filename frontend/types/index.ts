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

export interface SoilAnalysisRequest {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organic_matter?: number | null;
  crop?: string;
  location?: string;
}

export interface SoilParameterResult {
  value: number;
  unit: string;
  status: string;
  severity: "normal" | "moderate" | "warning" | string;
  rating_score: number;
}

export interface SoilParameters {
  ph: SoilParameterResult;
  nitrogen: SoilParameterResult;
  phosphorus: SoilParameterResult;
  potassium: SoilParameterResult;
  organic_matter?: SoilParameterResult | null;
}

export interface CropContext {
  crop_name: string;
  suitable_ph_range: string;
  is_ph_suitable: boolean;
  primary_focus: string;
  soil_notes: string;
  considerations: string[];
}

export interface SoilAnalysisResponse {
  overall_score: number;
  rating: "Needs Attention" | "Fair" | "Good" | "Very Good" | string;
  parameters: SoilParameters;
  observations: string[];
  recommendations: string[];
  crop_context?: CropContext | null;
  data_quality_notes: string[];
  disclaimer: string;
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
