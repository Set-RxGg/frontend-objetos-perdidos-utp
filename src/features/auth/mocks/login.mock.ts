import type { LoginResponse } from '../interfaces';

export const adminLoginMock: LoginResponse = {
  status: 'success',
  data: {
    user: {
      _id: '1',
      cedula: '8-123-456',
      email: 'admin@test.com',
      nombre: 'Roderik',
      apellido: 'González',
      telefono: '6000-0000',
      rol: 'administrativo',
      activo: true,
    },
    expires_in: 900,
  },
};

export const userLoginMock: LoginResponse = {
  status: 'success',
  data: {
    user: {
      _id: '2',
      cedula: '8-456-789',
      email: 'user@test.com',
      nombre: 'María',
      apellido: 'Pérez',
      telefono: '6000-1111',
      rol: 'usuario',
      activo: true,
    },
    expires_in: 900,
  },
};
