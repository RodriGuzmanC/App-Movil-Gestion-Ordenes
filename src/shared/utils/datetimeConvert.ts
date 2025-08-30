export const ajustarFechaSinZona = (date: Date) => {
  // Asegura que la fecha tenga hora fija para evitar desplazamientos
  const newDate = new Date(date);
  newDate.setHours(12, 0, 0, 0); // Mediodía
  return newDate;
};

export function formatearFechaAmigable(fechaString: string): string {
  try {
    const fecha = new Date(fechaString)

    // Verifica si es una fecha válida
    if (isNaN(fecha.getTime())) {
      return 'Fecha inválida'
    }

    // Opciones de formato personalizado
    const opciones: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }

    return new Intl.DateTimeFormat('es-PE', opciones).format(fecha)
  } catch (error) {
    return 'Error al formatear'
  }
}
