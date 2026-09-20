export interface HealthResponse {
  status: string;
  service: string;
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
