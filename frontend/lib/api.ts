import {
  HealthResponse,
  CropAnalysisResult,
  SoilAnalysisRequest,
  SoilAnalysisResponse,
  WeatherResponse,
  LocationSearchResult,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Universal API response wrapper
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

/**
 * Generic fetch wrapper for JSON endpoints
 */
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const status = response.status;

    if (!response.ok) {
      let errorMsg = `API request failed with status ${status}`;
      try {
        const errorJson = await response.json();
        errorMsg = errorJson.detail || errorJson.error || errorMsg;
      } catch {
        const text = await response.text();
        if (text) errorMsg = text;
      }
      return {
        data: null,
        error: errorMsg,
        status,
      };
    }

    const data: T = await response.json();
    return {
      data,
      error: null,
      status,
    };
  } catch (err: any) {
    return {
      data: null,
      error: err.message || "Network error or backend service unreachable",
      status: 0,
    };
  }
}

/**
 * Check backend health status
 */
export async function getBackendHealth(): Promise<ApiResponse<HealthResponse>> {
  return fetchApi<HealthResponse>("/api/health");
}

/**
 * Upload and analyze crop image via Gemini Vision endpoint
 */
export async function analyzeCropImage(
  file: File
): Promise<ApiResponse<CropAnalysisResult>> {
  const url = `${API_BASE_URL}/api/crop/analyze`;

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const status = response.status;

    if (!response.ok) {
      let errorMsg = `Diagnosis request failed with status ${status}`;
      try {
        const errorJson = await response.json();
        errorMsg = errorJson.detail || errorJson.error || errorMsg;
      } catch {
        const text = await response.text();
        if (text) errorMsg = text;
      }
      return {
        data: null,
        error: errorMsg,
        status,
      };
    }

    const data: CropAnalysisResult = await response.json();
    return {
      data,
      error: null,
      status,
    };
  } catch (err: any) {
    return {
      data: null,
      error: err.message || "Could not connect to the crop diagnosis service.",
      status: 0,
    };
  }
}

/**
 * Submit soil test parameters for deterministic health intelligence assessment
 */
export async function analyzeSoil(
  payload: SoilAnalysisRequest
): Promise<ApiResponse<SoilAnalysisResponse>> {
  return fetchApi<SoilAnalysisResponse>("/api/soil/analyze", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Fetch agricultural weather intelligence and forecasts for a location
 */
export async function getWeather(params?: {
  latitude?: number;
  longitude?: number;
  location?: string;
}): Promise<ApiResponse<WeatherResponse>> {
  const queryParts: string[] = [];
  if (params?.latitude !== undefined) {
    queryParts.push(`latitude=${encodeURIComponent(params.latitude)}`);
  }
  if (params?.longitude !== undefined) {
    queryParts.push(`longitude=${encodeURIComponent(params.longitude)}`);
  }
  if (params?.location) {
    queryParts.push(`location=${encodeURIComponent(params.location)}`);
  }

  const query = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
  return fetchApi<WeatherResponse>(`/api/weather${query}`);
}

/**
 * Search locations/cities for weather geocoding
 */
export async function searchWeatherLocations(
  query: string
): Promise<ApiResponse<LocationSearchResult[]>> {
  if (!query || query.trim().length < 2) {
    return { data: [], error: null, status: 200 };
  }
  return fetchApi<LocationSearchResult[]>(
    `/api/weather/search?q=${encodeURIComponent(query.trim())}`
  );
}

export { API_BASE_URL };

