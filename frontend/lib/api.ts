import { HealthResponse } from "@/types";

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
 * Generic fetch wrapper for KisanMitra API
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
      const errorBody = await response.text();
      return {
        data: null,
        error: errorBody || `API request failed with status ${status}`,
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
      error: err.message || "Network error or server unreachable",
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

export { API_BASE_URL };
