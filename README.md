# Sistema de Objetos Perdidos UTP — Frontend

Aplicación web para la gestión de objetos perdidos en la Universidad Tecnológica de Panamá. Permite reportar objetos extraviados, consultar la lista de objetos encontrados y administrar las entregas a los reclamantes.

## Tecnologías

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Lenguaje:** TypeScript 5
- **UI:** Tailwind CSS v4, React Icons (Heroicons)
- **Estado del servidor:** TanStack React Query v5
- **Formularios:** React Hook Form + Zod v4
- **Peticiones HTTP:** Axios
- **Notificaciones:** Sonner
- **Compilador React:** React Compiler (experimental)

## Requisitos

- Node.js 20+
- pnpm 9+

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone <repo-url>
cd frontend-objetos-perdidos-utp

# Instalar dependencias
pnpm install

# Iniciar en modo desarrollo
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Comandos útiles

| Comando          | Descripción                                 |
| ---------------- | ------------------------------------------- |
| `pnpm dev`       | Inicia servidor de desarrollo con Turbopack |
| `pnpm build`     | Compila para producción                     |
| `pnpm start`     | Inicia servidor de producción               |
| `pnpm lint`      | Ejecuta ESLint                              |
| `pnpm typecheck` | Verifica tipos de TypeScript                |

## Variables de entorno

Copia el archivo `.env.example` a `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://11.111.11.111/
```

| Variable              | Descripción                               | Obligatorio |
| --------------------- | ----------------------------------------- | ----------- |
| `NEXT_PUBLIC_API_URL` | URL base del backend (con trailing slash) | Sí          |

## Credenciales de prueba

| Email          | Contraseña | Rol            |
| -------------- | ---------- | -------------- |
| admin@test.com | 12345678   | administrativo |

## Estructura del proyecto

```
src/
├── app/                    # Páginas (App Router)
│   ├── auth/
│   │   ├── login/         # Inicio de sesión
│   │   └── register/      # Registro de usuario
│   └── dashboard/
│       ├── objetos/        # Lista, detalle y edición de objetos
│       ├── reportar/       # Reportar objeto extraviado
│       ├── entregas/       # Gestión de entregas (admin)
│       └── perfil/         # Perfil del usuario
├── components/
│   ├── layout/             # Sidebar, Navbar
│   └── ui/                 # Card, Button, Input, Pagination, Breadcrumbs
├── features/
│   ├── auth/               # Autenticación (servicios, interfaces, hooks)
│   └── reportes/           # Reportes de objetos (servicios, interfaces, hooks)
├── lib/
│   ├── axios.ts            # Instancia de Axios con cookies
│   ├── cn.ts               # Utilidad clsx + tailwind-merge
│   └── get-initials.ts     # Iniciales del usuario
├── providers/
│   └── AuthProvider.tsx    # Contexto de autenticación
└── proxy.ts                # Middleware de protección de rutas
```

## Funcionamiento

### Autenticación

- El backend utiliza JWT con cookies httpOnly (`access_token` + `refresh_token`).
- El frontend envía las credenciales a `POST /api/auth/login`, el backend responde con las cookies y los datos del usuario.
- Las cookies se envían automáticamente en cada petición gracias al proxy de Next.js (`/api/*` → backend) y `withCredentials: true`.
- El middleware de Next.js (`proxy.ts`) protege las rutas `/dashboard/*` verificando la cookie `access_token`.

### Roles

- **usuario:** Puede ver objetos extraviados y reportar nuevos objetos.
- **administrativo:** Puede ver todos los objetos (incluyendo devueltos), editar reportes, marcar objetos como devueltos y eliminar reportes.

### Rutas públicas y privadas

| Ruta                             | Acceso          | Descripción                  |
| -------------------------------- | --------------- | ---------------------------- |
| `/`                              | Público         | Landing page                 |
| `/auth/login`                    | Público         | Inicio de sesión             |
| `/auth/register`                 | Público         | Registro de usuario          |
| `/dashboard`                     | Privado         | Panel principal              |
| `/dashboard/objetos`             | Privado         | Lista de objetos extraviados |
| `/dashboard/objetos/[id]`        | Privado         | Detalle del objeto           |
| `/dashboard/objetos/[id]/editar` | Privado (admin) | Editar reporte               |
| `/dashboard/reportar`            | Privado         | Reportar nuevo objeto        |
| `/dashboard/entregas`            | Privado (admin) | Gestión de entregas          |
| `/dashboard/perfil`              | Privado         | Perfil del usuario           |

Las rutas privadas están protegidas por el middleware `proxy.ts`, que verifica la cookie `access_token` en cada solicitud. Si un usuario no autenticado intenta acceder a una ruta privada, es redirigido automáticamente a `/auth/login`. Las rutas marcadas como `(admin)` además requieren el rol `administrativo` — el backend rechaza la petición con 403 si no es admin.

### Operaciones CRUD

| Operación    | Endpoint                                        | Descripción                         |
| ------------ | ----------------------------------------------- | ----------------------------------- |
| **Create**   | `POST /api/reportes`                            | Reportar un nuevo objeto extraviado |
| **Read**     | `GET /api/reportes` y `GET /api/reportes/admin` | Listar objetos (público y admin)    |
| **Update**   | `PUT /api/reportes/:id`                         | Editar datos de un reporte (admin)  |
| **Delete**   | `DELETE /api/reportes/:id`                      | Eliminar un reporte (admin)         |
| **Devolver** | `PATCH /api/reportes/:id/devolver`              | Marcar objeto como devuelto (admin) |

### Flujo principal

1. El usuario inicia sesión o se registra.
2. En el dashboard puede ver la lista de objetos extraviados.
3. Puede reportar un nuevo objeto perdido (con foto opcional).
4. Un administrativo puede gestionar entregas: selecciona un objeto extraviado, ingresa los datos del reclamante y confirma la devolución.
5. Los objetos devueltos aparecen en la sección de devueltos con los datos de la entrega.

### API

Las peticiones se redirigen mediante `next.config.ts`:

- `/api/auth/*` → `{NEXT_PUBLIC_API_URL}/auth/*`
- `/api/reportes/*` → `{NEXT_PUBLIC_API_URL}/reportes/*`

Esto evita problemas de CORS y permite que las cookies httpOnly funcionen correctamente.
