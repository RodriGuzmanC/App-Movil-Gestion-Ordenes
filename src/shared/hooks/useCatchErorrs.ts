import { AlertService } from "../utils/AlertService";

export function useCatchErrors() {

  async function catchErrors<T>(func: () => Promise<T>): Promise<T | undefined> {
    try {
      return await func();
    } catch (error: any) {
      const mensaje = error?.msg || error?.message || "Ocurrió un error inesperado";
      AlertService.show(mensaje, 'error');
      console.error("Error capturado:", error);
      return undefined;
    }
  }

  return { catchErrors };
}
