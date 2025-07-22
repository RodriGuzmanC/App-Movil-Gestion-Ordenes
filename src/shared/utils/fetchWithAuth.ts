
const API_BASE_URL = process.env.EXPO_PUBLIC_DEV_API_URL;

export interface FetchOptions extends RequestInit {
  token?: string;
}

export const fetchWithAuth = async (
  endpoint: string,
  options: FetchOptions = {}
): Promise<any> => {
  try {
    const token = options.token || ''; 
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); // en caso el error no tenga cuerpo
      throw new Error(errorData.message || 'Error al realizar la petición');
    }

    if (response.status === 204) {
      return { success: true }; // o lo que desees retornar como confirmación
    }
    

    return await response.json();
  } catch (error: any) {
    console.error(`[fetchWithAuth] ${error.message}`, error);
    throw error;
  }
};
