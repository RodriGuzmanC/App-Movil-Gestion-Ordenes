import { useState } from "react";
import { fetchWithAuth } from "../utils/fetchWithAuth";

interface UploadResponse {
  url: string;
  public_id?: string;
  [key: string]: any;
}

export const useCldUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (fileUri: string): Promise<UploadResponse | null> => {
    try {
      setLoading(true);
      setError(null);

      const filename = fileUri.split('/').pop() || `upload.jpg`;
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      const fileData = {
        uri: fileUri,
        name: filename,
        type,
      };

      // Este objeto se enviará como JSON, tu API debe manejarlo
      const formData = {
        file: fileData,
      };

      const response = await fetchWithAuth(`/products/image`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Error al subir la imagen');

      const data = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message || 'Error al subir la imagen');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadImage,
    loading,
    error,
  };
};