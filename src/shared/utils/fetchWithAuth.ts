// src/shared/utils/fetchWithAuth.ts

const API_BASE_URL = process.env.EXPO_PUBLIC_DEV_API_URL;
//const API_BASE_URL = "https://sistema-gestion-de-inventario.vercel.app/api/";

export interface FetchOptions extends RequestInit {
  token?: string; // opcional si ya tienes el token en otro lado
}

export const fetchWithAuth = async (
  endpoint: string,
  options: FetchOptions = {}
): Promise<any> => {
  try {
    const token = options.token || ''; // puedes reemplazar con lectura de AsyncStorage si lo deseas

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al realizar la petición');
    }

    return await response.json();
  } catch (error: any) {
    console.error(`[fetchWithAuth] ${error.message}`);
    throw error;
  }
};
