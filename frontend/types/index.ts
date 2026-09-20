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

// Weather Intelligence Types
export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  temperature: number;
  feels_like: number;
  condition: string;
  weather_code: number;
  humidity: number;
  wind_speed: number;
  precipitation: number;
  is_day: number;
}

export interface TodayWeather {
  rain_probability: number;
  rainfall: number;
  min_temperature: number;
  max_temperature: number;
  uv_index_max?: number | null;
  sunrise?: string | null;
  sunset?: string | null;
}

export interface ForecastDay {
  date: string;
  day_name: string;
  condition: string;
  weather_code: number;
  min_temperature: number;
  max_temperature: number;
  rain_probability: number;
  rainfall: number;
  wind_speed: number;
}

export interface AgriculturalAlert {
  type: "rain" | "temperature" | "wind" | "humidity" | "spray_window" | "irrigation" | string;
  severity: "info" | "low" | "moderate" | "high" | string;
  title: string;
  message: string;
  timestamp: string;
}

export interface FarmOutlook {
  summary: string;
  spray_suitability: "Favorable" | "Caution" | "Unfavorable" | string;
  spray_recommendation: string;
  irrigation_advice: string;
}

export interface WeatherResponse {
  location: WeatherLocation;
  current: CurrentWeather;
  today: TodayWeather;
  forecast: ForecastDay[];
  farm_outlook: FarmOutlook;
  agricultural_alerts: AgriculturalAlert[];
  updated_at: string;
  provider: string;
  is_demo: boolean;
}

export interface LocationSearchResult {
  name: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
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

// Mandi Price Intelligence Types
export interface MandiQuery {
  commodity?: string | null;
  state?: string | null;
  district?: string | null;
  market?: string | null;
  limit?: number;
}

export interface MandiPriceRecord {
  market: string;
  district: string;
  state: string;
  commodity: string;
  variety?: string | null;
  grade?: string | null;
  min_price?: number | null;
  max_price?: number | null;
  modal_price?: number | null;
  unit: string;
  arrival_date?: string | null;
  reported_at?: string | null;
}

export interface MandiSource {
  name: string;
  url: string;
  description: string;
}

export interface MandiSummary {
  total_records: number;
  min_price_found?: number | null;
  max_price_found?: number | null;
  highest_modal_market?: string | null;
  highest_modal_price?: number | null;
  lowest_modal_market?: string | null;
  lowest_modal_price?: number | null;
  average_modal_price?: number | null;
}

export interface MandiPriceResponse {
  query: MandiQuery;
  data_status: "official" | "demo" | "unavailable" | string;
  is_demo: boolean;
  source: MandiSource;
  updated_at: string;
  summary: MandiSummary;
  records: MandiPriceRecord[];
}

export interface MandiFilterOptions {
  commodities: string[];
  states: string[];
  districts_by_state: Record<string, string[]>;
  markets_by_district: Record<string, string[]>;
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
