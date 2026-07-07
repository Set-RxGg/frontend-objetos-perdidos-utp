export function getInitials(nombre: string, apellido: string): string {
  const first = nombre?.charAt(0) ?? '';
  const last = apellido?.charAt(0) ?? '';
  return (first + last).toUpperCase();
}
