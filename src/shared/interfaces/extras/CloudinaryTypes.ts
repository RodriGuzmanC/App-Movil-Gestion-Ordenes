interface CloudinaryUploadResponse {
  asset_id: string;
  public_id: string;
  version: number;
  url: string;
  secure_url: string;
  display_name: string; // por si quieres permitir campos extra
}

interface CloudinaryErrorResponse {
  error: {
    message: string;
  };
}

export type CloudinaryResponse = CloudinaryUploadResponse | CloudinaryErrorResponse;


