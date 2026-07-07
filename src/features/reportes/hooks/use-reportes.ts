import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { reportesService } from '../services/reportes.service';
import type {
  CreateReporteRequest,
  DevolverReporteRequest,
} from '../interfaces';

export const reportesQueryKeys = {
  all: ['reportes'] as const,
  admin: ['reportes', 'admin'] as const,
};

export function useReportes() {
  return useQuery({
    queryKey: reportesQueryKeys.all,
    queryFn: () => reportesService.getAll(),
  });
}

export function useReportesAdmin() {
  return useQuery({
    queryKey: reportesQueryKeys.admin,
    queryFn: () => reportesService.getAllAdmin(),
  });
}

export function useReporte(id: string) {
  return useQuery({
    queryKey: [...reportesQueryKeys.all, id],
    queryFn: () => reportesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateReporte() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReporteRequest) =>
      reportesService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reportesQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: reportesQueryKeys.admin });
      toast.success('Objeto reportado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al reportar objeto');
    },
  });
}

export function useDevolverReporte() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: DevolverReporteRequest }) =>
      reportesService.devolver(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reportesQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: reportesQueryKeys.admin });
      toast.success('Objeto marcado como devuelto');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al marcar como devuelto');
    },
  });
}

export function useUpdateReporte() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateReporteRequest }) =>
      reportesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reportesQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: reportesQueryKeys.admin });
      toast.success('Reporte actualizado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al actualizar reporte');
    },
  });
}

export function useDeleteReporte() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => reportesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reportesQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: reportesQueryKeys.admin });
      toast.success('Reporte eliminado exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al eliminar reporte');
    },
  });
}
