import type { Reporte } from '../interfaces';

export const reportesMock: Reporte[] = [
  {
    _id: '1',
    nombre_objeto: 'Celular Samsung Galaxy',
    descripcion:
      'Celular Samsung Galaxy S23 color negro con funda transparente. Se encontró en el edificio de aulas.',
    ubicacion: 'Edificio A, Salón 101',
    lugar_entrega: 'GARITA_SEGURIDAD',
    estado: 'extraviado',
    reportado_por: '2',
    createdAt: '2026-06-01T10:00:00Z',
    updatedAt: '2026-06-01T10:00:00Z',
  },
  {
    _id: '2',
    nombre_objeto: 'Carpeta de documentos',
    descripcion:
      'Carpeta color verde con documentos de inscripción. Incluye certificados de notas.',
    ubicacion: 'Biblioteca, segundo piso',
    lugar_entrega: 'LABORATORIO_FISC',
    estado: 'devuelto',
    reportado_por: '1',
    devuelto_a_nombre: 'Carlos Mendoza',
    devuelto_a_cedula: '8-765-432',
    devuelto_a_telefono: '6000-2222',
    fecha_devolucion: '2026-05-29T09:00:00Z',
    administrativo_id: '1',
    createdAt: '2026-05-28T14:30:00Z',
    updatedAt: '2026-05-29T09:00:00Z',
  },
  {
    _id: '3',
    nombre_objeto: 'Chaqueta azul',
    descripcion:
      'Chaqueta impermeable color azul marino, marca North Face. Se dejó en el comedor.',
    ubicacion: 'Cafetería',
    lugar_entrega: 'GARITA_SEGURIDAD',
    estado: 'extraviado',
    reportado_por: '2',
    createdAt: '2026-05-25T12:00:00Z',
    updatedAt: '2026-05-25T12:00:00Z',
  },
  {
    _id: '4',
    nombre_objeto: 'Laptop HP Pavilion',
    descripcion:
      'Laptop HP Pavilion color plata, tiene una calcomanía de un panda en la tapa.',
    ubicacion: 'Laboratorio de cómputo',
    lugar_entrega: 'LABORATORIO_FISC',
    estado: 'extraviado',
    reportado_por: '1',
    createdAt: '2026-05-20T16:00:00Z',
    updatedAt: '2026-05-20T16:00:00Z',
  },
  {
    _id: '5',
    nombre_objeto: 'Lentes de sol',
    descripcion:
      'Lentes de sol Ray-Ban color negro. Se encontraron cerca de la entrada principal.',
    ubicacion: 'Entrada principal',
    lugar_entrega: 'GARITA_SEGURIDAD',
    estado: 'extraviado',
    reportado_por: '1',
    createdAt: '2026-06-02T08:00:00Z',
    updatedAt: '2026-06-02T08:00:00Z',
  },
  {
    _id: '6',
    nombre_objeto: 'Calculadora científica',
    descripcion:
      'Calculadora Casio fx-991LAX. Se encontró en el salón de matemáticas.',
    ubicacion: 'Edificio B, Salón 205',
    lugar_entrega: 'GARITA_SEGURIDAD',
    estado: 'extraviado',
    reportado_por: '2',
    createdAt: '2026-05-30T11:00:00Z',
    updatedAt: '2026-05-30T11:00:00Z',
  },
];

let nextId = 7;

export function generateMockId(): string {
  return String(nextId++);
}
