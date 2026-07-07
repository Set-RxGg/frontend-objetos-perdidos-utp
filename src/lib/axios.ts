import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

import { setupMockAdapter } from '@/services/api/mock-adapter';
setupMockAdapter(api);
