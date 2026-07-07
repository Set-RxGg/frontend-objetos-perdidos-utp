import type { AxiosInstance, AxiosResponse } from 'axios';

import {
  adminLoginMock,
  userLoginMock,
  registerMock,
} from '@/features/auth/mocks';
import { reportesMock, generateMockId } from '@/features/reportes/mocks';
import type {
  Reporte,
  DevolverReporteRequest,
} from '@/features/reportes/interfaces';

function getJsonBody(config: {
  data?: string | FormData;
}): Record<string, unknown> {
  if (config.data instanceof FormData) {
    const obj: Record<string, unknown> = {};
    config.data.forEach((value, key) => {
      if (typeof value === 'string') obj[key] = value;
    });
    return obj;
  }
  try {
    return JSON.parse((config.data as string) || '{}');
  } catch {
    return {};
  }
}

function findId(url: string, position: number): string {
  return url?.split('/').filter(Boolean).reverse()[position] || '';
}

type MockResult = { data: unknown; status: number };

interface RouteHandler {
  pattern: RegExp;
  handler: (config: {
    data?: string | FormData;
    url?: string;
    params?: Record<string, string>;
  }) => MockResult;
}

const routes: RouteHandler[] = [
  {
    pattern: /^POST \/api\/auth\/login$/,
    handler: (config) => {
      const body = getJsonBody(config);
      if (body.email === 'admin@test.com' && body.password === '12345678') {
        return { data: adminLoginMock, status: 200 };
      }
      if (body.email === 'user@test.com' && body.password === '12345678') {
        return { data: userLoginMock, status: 200 };
      }
      return {
        data: { status: 'error', message: 'Credenciales inválidas' },
        status: 401,
      };
    },
  },
  {
    pattern: /^POST \/api\/auth\/register$/,
    handler: () => ({ data: registerMock, status: 201 }),
  },
  {
    pattern: /^GET \/api\/auth\/me$/,
    handler: () => ({
      data: { status: 'error', message: 'No autenticado' },
      status: 401,
    }),
  },
  {
    pattern: /^POST \/api\/auth\/logout$/,
    handler: () => ({
      data: { status: 'success', message: 'Sesión cerrada' },
      status: 200,
    }),
  },
  {
    pattern: /^GET \/api\/reportes\/admin$/,
    handler: () => ({
      data: { status: 'success', data: reportesMock },
      status: 200,
    }),
  },
  {
    pattern: /^GET \/api\/reportes$/,
    handler: () => ({
      data: {
        status: 'success',
        data: reportesMock.filter((r) => r.estado === 'extraviado'),
      },
      status: 200,
    }),
  },
  {
    pattern: /^POST \/api\/reportes$/,
    handler: (config) => {
      const body = getJsonBody(config);
      const newReporte: Reporte = {
        _id: generateMockId(),
        nombre_objeto: (body.nombre_objeto as string) || 'Objeto mock',
        descripcion: (body.descripcion as string) || '',
        ubicacion: (body.ubicacion as string) || '',
        lugar_entrega:
          (body.lugar_entrega as 'GARITA_SEGURIDAD' | 'LABORATORIO_FISC') ||
          'GARITA_SEGURIDAD',
        estado: 'extraviado',
        reportado_por: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      reportesMock.push(newReporte);
      return { data: { status: 'success', data: newReporte }, status: 201 };
    },
  },
  {
    pattern: /^GET \/api\/reportes\/([a-f0-9]+)$/,
    handler: (config) => {
      const id = findId(config.url || '', 0);
      const reporte = reportesMock.find((r) => r._id === id);
      if (reporte) {
        return { data: { status: 'success', data: reporte }, status: 200 };
      }
      return {
        data: { status: 'error', message: 'Reporte no encontrado' },
        status: 404,
      };
    },
  },
  {
    pattern: /^PUT \/api\/reportes\/([a-f0-9]+)$/,
    handler: (config) => {
      const id = findId(config.url || '', 0);
      const body = getJsonBody(config);
      const idx = reportesMock.findIndex((r) => r._id === id);
      if (idx === -1) {
        return {
          data: { status: 'error', message: 'Reporte no encontrado' },
          status: 404,
        };
      }
      reportesMock[idx] = {
        ...reportesMock[idx],
        nombre_objeto:
          (body.nombre_objeto as string) || reportesMock[idx].nombre_objeto,
        descripcion:
          (body.descripcion as string) || reportesMock[idx].descripcion,
        ubicacion: (body.ubicacion as string) || reportesMock[idx].ubicacion,
        updatedAt: new Date().toISOString(),
      };
      return {
        data: { status: 'success', data: reportesMock[idx] },
        status: 200,
      };
    },
  },
  {
    pattern: /^PATCH \/api\/reportes\/([a-f0-9]+)\/devolver$/,
    handler: (config) => {
      const id = findId(config.url || '', 1);
      const body = getJsonBody(config);
      const idx = reportesMock.findIndex((r) => r._id === id);
      if (idx === -1) {
        return {
          data: { status: 'error', message: 'Reporte no encontrado' },
          status: 404,
        };
      }
      reportesMock[idx] = {
        ...reportesMock[idx],
        estado: 'devuelto',
        devuelto_a_nombre: (body.devuelto_a_nombre as string) || '',
        devuelto_a_cedula: (body.devuelto_a_cedula as string) || '',
        devuelto_a_telefono: (body.devuelto_a_telefono as string) || '',
        fecha_devolucion: new Date().toISOString(),
        administrativo_id: '1',
      };
      return {
        data: { status: 'success', data: reportesMock[idx] },
        status: 200,
      };
    },
  },
  {
    pattern: /^DELETE \/api\/reportes\/([a-f0-9]+)$/,
    handler: (config) => {
      const id = findId(config.url || '', 0);
      const idx = reportesMock.findIndex((r) => r._id === id);
      if (idx !== -1) reportesMock.splice(idx, 1);
      return {
        data: { status: 'success', message: 'Reporte eliminado' },
        status: 200,
      };
    },
  },
];

export function setupMockAdapter(api: AxiosInstance): void {
  const useMocks =
    typeof process !== 'undefined' &&
    process.env.NEXT_PUBLIC_USE_MOCKS === 'true';
  if (!useMocks) return;

  api.interceptors.request.use((config) => {
    const method = (config.method || 'get').toUpperCase();
    const path = config.url || '';
    const key = `${method} /api${path.startsWith('/') ? '' : '/'}${path}`;

    const match = routes.find((r) => r.pattern.test(key));
    if (!match) return config;

    const params: Record<string, string> = {};
    const execResult = match.pattern.exec(key);
    if (execResult?.groups) {
      Object.assign(params, execResult.groups);
    }

    config.adapter = () => {
      const result = match.handler({ ...config, params });
      return Promise.resolve({
        data: result.data,
        status: result.status,
        statusText:
          result.status === 200
            ? 'OK'
            : result.status === 201
              ? 'Created'
              : 'Error',
        headers: { 'content-type': 'application/json' },
        config,
      } as AxiosResponse);
    };

    return config;
  });
}
