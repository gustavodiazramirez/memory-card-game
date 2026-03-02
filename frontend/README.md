# Frontend - Memory Card Game

Aplicación web del juego de memoria de Rick and Morty desarrollada con Next.js.

## Descripción

Frontend del juego que consume la API de Rick and Morty para obtener personajes y la API del backend para autenticación de usuarios.

## Arquitectura Modular

El proyecto utiliza un enfoque tipo microfrontend con separación clara de responsabilidades:

### Estructura de Carpetas

```
frontend/
├── app/                 # Páginas y rutas (App Router)
├── core/                # Componentes y servicios compartidos
│   ├── components/     # Componentes reutilizables
│   ├── services/       # Servicios HTTP
│   └── types/          # Tipos TypeScript globales
└── features/            # Módulos funcionales independientes
    ├── auth/           # Autenticación y protección de rutas
    ├── gallery/        # Galería de personajes
    └── game/           # Lógica del juego de memoria
```

### Enfoque Microfrontend

Cada feature es autocontenida e incluye:

- **components**: Componentes específicos de la feature
- **hooks**: Lógica de negocio
- **services**: Llamadas a APIs específicas
- **types**: Tipos TypeScript de la feature
- **context**: Estado global de la feature (cuando aplica)

**Ventajas**:

- Desacoplamiento entre módulos
- Reutilización de componentes core
- Fácil extensión con nuevas features
- Preparado para separación en aplicaciones independientes

### Componentes Reutilizables

El directorio `core/components` contiene componentes agnósticos reutilizados en múltiples features:

- `action-button`: Botones de acción primarios
- `text-button`: Botones de texto secundarios
- `form-input`: Inputs de formularios
- `character-card`: Tarjeta de personaje
- `paginator`: Componente de paginación
- `page-header`: Encabezado de página
- `loading`: Estado de carga
- `error-state`: Estado de error
- `logout-button`: Botón de logout

Esta organización permite consistencia visual y facilita el mantenimiento.

## Funcionalidades

### Autenticación

- Registro de usuarios
- Login con credenciales
- Protección de rutas con HOC
- Gestión de tokens (access y refresh)
- Renovación automática de tokens
- Context API para estado de autenticación

### Galería

- Visualización de personajes de Rick and Morty
- Paginación de resultados
- Consumo de API pública de Rick and Morty

### Juego

- Selección de personajes para el juego
- Mecánica de memoria (voltear cartas)
- Contador de intentos
- Modal de victoria

## Ejecución

### Prerequisitos

- Node.js 20+
- Backend corriendo en `http://localhost:3001`

### Instalación y Ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en modo desarrollo:

```bash
npm run dev
```

3. Abrir navegador en `http://localhost:3000`

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilar para producción
npm run start    # Ejecutar versión de producción
npm run lint     # Ejecutar linter
```

## Configuración

La configuración de la API del backend se encuentra en `core/config/api.config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001',
  ENDPOINTS: {
    LOGIN: '/users/login',
    REGISTER: '/users/register',
    REFRESH_TOKEN: '/sessions/refresh',
  },
};
```

## Stack Tecnológico

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- lucide-react (iconos)
