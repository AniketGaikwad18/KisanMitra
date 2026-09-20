import { HealthResponse, CropAnalysisResult } from "@/types";

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
      // Note: do NOT set Content-Type header manually so the browser sets the multipart boundary
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

export { API_BASE_URL };
