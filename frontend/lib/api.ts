import {
  HealthResponse,
  CropAnalysisResult,
  SoilAnalysisRequest,
  SoilAnalysisResponse,
  WeatherResponse,
  LocationSearchResult,
  MandiQuery,
  MandiPriceResponse,
  MandiFilterOptions,
  SchemeResponse,
  SchemeDetail,
  SchemeFilterMeta,
  CropGuideResponse,
  CropListResponse,
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

/**
 * Fetch APMC mandi market arrival and modal price records
 */
export async function getMandiPrices(
  params?: MandiQuery
): Promise<ApiResponse<MandiPriceResponse>> {
  const queryParts: string[] = [];
  if (params?.commodity) {
    queryParts.push(`commodity=${encodeURIComponent(params.commodity)}`);
  }
  if (params?.state) {
    queryParts.push(`state=${encodeURIComponent(params.state)}`);
  }
  if (params?.district) {
    queryParts.push(`district=${encodeURIComponent(params.district)}`);
  }
  if (params?.market) {
    queryParts.push(`market=${encodeURIComponent(params.market)}`);
  }
  if (params?.limit) {
    queryParts.push(`limit=${encodeURIComponent(params.limit)}`);
  }

  const query = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
  return fetchApi<MandiPriceResponse>(`/api/mandi/prices${query}`);
}

/**
 * Fetch dropdown filter options for commodities, states, and districts
 */
export async function getMandiFilters(): Promise<ApiResponse<MandiFilterOptions>> {
  return fetchApi<MandiFilterOptions>("/api/mandi/filters");
}

/**
 * Fetch verified government agricultural schemes
 */
export async function getSchemes(params?: {
  category?: string;
  state?: string;
  search?: string;
}): Promise<ApiResponse<SchemeResponse>> {
  const queryParts: string[] = [];
  if (params?.category) {
    queryParts.push(`category=${encodeURIComponent(params.category)}`);
  }
  if (params?.state) {
    queryParts.push(`state=${encodeURIComponent(params.state)}`);
  }
  if (params?.search) {
    queryParts.push(`search=${encodeURIComponent(params.search)}`);
  }

  const query = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
  return fetchApi<SchemeResponse>(`/api/schemes${query}`);
}

/**
 * Fetch scheme metadata filters (categories & states)
 */
export async function getSchemeFilters(): Promise<ApiResponse<SchemeFilterMeta>> {
  return fetchApi<SchemeFilterMeta>("/api/schemes/meta/filters");
}

/**
 * Fetch detailed scheme info by ID
 */
export async function getSchemeById(
  id: string
): Promise<ApiResponse<SchemeDetail>> {
  return fetchApi<SchemeDetail>(`/api/schemes/${encodeURIComponent(id)}`);
}

/**
 * Fetch list of all supported crop profiles
 */
export async function getCropGuideList(): Promise<ApiResponse<CropListResponse>> {
  return fetchApi<CropListResponse>("/api/crop-guide/crops");
}

/**
 * Fetch comprehensive agronomic crop guide
 */
export async function getCropGuide(params?: {
  crop?: string;
  location?: string;
}): Promise<ApiResponse<CropGuideResponse>> {
  const queryParts: string[] = [];
  if (params?.crop) {
    queryParts.push(`crop=${encodeURIComponent(params.crop)}`);
  }
  if (params?.location) {
    queryParts.push(`location=${encodeURIComponent(params.location)}`);
  }

  const query = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
  return fetchApi<CropGuideResponse>(`/api/crop-guide${query}`);
}

/**
 * Fetch crop guide by crop slug ID
 */
export async function getCropGuideById(
  id: string,
  location?: string
): Promise<ApiResponse<CropGuideResponse>> {
  const query = location ? `?location=${encodeURIComponent(location)}` : "";
  return fetchApi<CropGuideResponse>(
    `/api/crop-guide/${encodeURIComponent(id)}${query}`
  );
}

export { API_BASE_URL };



