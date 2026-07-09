import { api } from '@/lib/axios';

import type {
  Reporte,
  CreateReporteRequest,
  DevolverReporteRequest,
} from '../interfaces';

class ReportesService {
  async getAll(): Promise<{ status: string; data: Reporte[] }> {
    const { data } = await api.get<{ status: string; data: Reporte[] }>(
      '/reportes',
    );
    return data;
  }

  async getAllAdmin(): Promise<{ status: string; data: Reporte[] }> {
    const { data } = await api.get<{ status: string; data: Reporte[] }>(
      '/reportes/admin',
    );
    return data;
  }

  async getById(id: string): Promise<{ status: string; data: Reporte }> {
    try {
      const { data } = await api.get<{ status: string; data: Reporte }>(
        `/reportes/${id}`,
      );
      return data;
    } catch {
      // single endpoint failed — fall through to list search
    }

    try {
      const { data } = await api.get<{ status: string; data: Reporte[] }>(
        '/reportes/admin',
      );
      const found = data.data.find((r) => r._id === id);
      if (found) return { status: 'success', data: found };
    } catch {
      // not admin or network error — fall through to public list
    }

    const { data } = await api.get<{ status: string; data: Reporte[] }>(
      '/reportes',
    );
    const found = data.data.find((r) => r._id === id);
    if (found) return { status: 'success', data: found };

    throw new Error('Reporte no encontrado');
  }

  async create(
    payload: CreateReporteRequest,
  ): Promise<{ status: string; data: Reporte }> {
    const formData = new FormData();
    formData.append('nombre_objeto', payload.nombre_objeto);
    formData.append('descripcion', payload.descripcion);
    formData.append('ubicacion', payload.ubicacion);
    formData.append('lugar_entrega', payload.lugar_entrega);
    if (payload.foto) {
      formData.append('foto', payload.foto);
    }

    const { data } = await api.post<{ status: string; data: Reporte }>(
      '/reportes',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return data;
  }

  async devolver(
    id: string,
    payload: DevolverReporteRequest,
  ): Promise<{ status: string; data: Reporte }> {
    const { data } = await api.patch<{ status: string; data: Reporte }>(
      `/reportes/${id}/devolver`,
      payload,
    );
    return data;
  }

  async update(
    id: string,
    payload: CreateReporteRequest,
  ): Promise<{ status: string; data: Reporte }> {
    const formData = new FormData();
    formData.append('nombre_objeto', payload.nombre_objeto);
    formData.append('descripcion', payload.descripcion);
    formData.append('ubicacion', payload.ubicacion);
    formData.append('lugar_entrega', payload.lugar_entrega);
    if (payload.foto) {
      formData.append('foto', payload.foto);
    }

    const { data } = await api.put<{ status: string; data: Reporte }>(
      `/reportes/${id}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return data;
  }

  async delete(id: string): Promise<{ status: string; message: string }> {
    const { data } = await api.delete<{ status: string; message: string }>(
      `/reportes/${id}`,
    );
    return data;
  }
}

export const reportesService = new ReportesService();
