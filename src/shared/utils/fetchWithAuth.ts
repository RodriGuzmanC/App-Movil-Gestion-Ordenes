
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
    let headers: Record<string, string> = {};

    // primero añadimos los headers que pasen desde options (si existen)
    if (options.headers) {
      headers = { ...headers, ...(options.headers as Record<string, string>) };
    }

    // luego añadimos el Authorization si hay token
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // solo agregamos Content-Type si no es FormData
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    console.log(headers)

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
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
