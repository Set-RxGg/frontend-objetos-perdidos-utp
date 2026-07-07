import type { LoginResponse } from '../interfaces';

export const registerMock: LoginResponse = {
  status: 'success',
  data: {
    user: {
      _id: '3',
      cedula: '8-456-789',
      email: 'estudiante@utp.ac.pa',
      nombre: 'María',
      apellido: 'Pérez',
      telefono: '6000-1111',
      rol: 'usuario',
      activo: true,
    },
    expires_in: 900,
  },
};
