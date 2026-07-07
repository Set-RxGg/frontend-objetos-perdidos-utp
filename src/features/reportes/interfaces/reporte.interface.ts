export type ReporteEstado = 'extraviado' | 'devuelto';

export type LugarEntrega = 'GARITA_SEGURIDAD' | 'LABORATORIO_FISC';

export interface Reporte {
  _id: string;
  nombre_objeto: string;
  descripcion: string;
  ubicacion: string;
  lugar_entrega: LugarEntrega;
  estado: ReporteEstado;
  foto_key?: string;
  foto_url?: string | null;
  reportado_por?: string;
  devuelto_a_nombre?: string;
  devuelto_a_cedula?: string;
  devuelto_a_telefono?: string;
  fecha_devolucion?: string;
  administrativo_id?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReporteRequest {
  nombre_objeto: string;
  descripcion: string;
  ubicacion: string;
  lugar_entrega: LugarEntrega;
  estado?: ReporteEstado;
  foto?: File;
}

export interface DevolverReporteRequest {
  devuelto_a_nombre: string;
  devuelto_a_cedula: string;
  devuelto_a_telefono?: string;
}
