# Memory Card Game - Rick and Morty

Juego de memoria basado en personajes de Rick and Morty con autenticación de usuarios.

## Arquitectura del Proyecto

### Separación Frontend/Backend

El proyecto utiliza una arquitectura desacoplada con dos aplicaciones independientes:

**Backend (NestJS)**: API RESTful responsable exclusivamente de la autenticación y gestión de usuarios. Esta separación permite escalabilidad independiente, despliegue flexible y mantenimiento aislado de la lógica de negocio.

**Frontend (Next.js)**: Aplicación cliente que consume tanto la API de autenticación del backend como la API pública de Rick and Morty para obtener los datos del juego.

### Enfoque Microfrontend

El frontend está estructurado con un enfoque modular que permite escalabilidad futura del juego:

```
frontend/
├── app/              # Rutas y páginas Next.js
├── core/             # Componentes y servicios reutilizables
├── features/         # Módulos funcionales independientes
│   ├── auth/         # Sistema de autenticación
│   ├── gallery/      # Galería de personajes
│   └── game/         # Lógica del juego de memoria
```

**Ventajas del enfoque**:

- Cada feature es autocontenida con sus componentes, hooks y tipos
- Componentes core reutilizables en múltiples features
- Fácil integración de nuevas funcionalidades sin afectar código existente
- Preparado para extracción a microfrontends independientes en el futuro

### Sistema de Autenticación

1. **Access Token**: JWT de corta duración (15 minutos) que se envía en cada petición autenticada
2. **Refresh Token**: Token de larga duración (7 días) almacenado en base de datos para renovar access tokens

**Flujo de autenticación**:

```
Usuario → Login → Backend genera Access Token (15m) + Refresh Token (7d)
                → Refresh Token se guarda en tabla sessions
                → Frontend almacena tokens en localStorage
                → Peticiones incluyen Access Token en headers
                → Access Token expira → Frontend solicita renovación con Refresh Token
                → Backend valida Refresh Token en tabla sessions
                → Si válido → Genera nuevo Access Token
```

**Decisiones técnicas**:

- Access tokens cortos minimizan ventana de exposición en caso de compromiso
- Refresh tokens en BD permiten revocación inmediata de sesiones
- Tabla de sesiones independiente permite auditoría y control de sesiones activas
- Estrategia permite logout remoto invalidando refresh tokens

### Base de Datos

PostgreSQL con dos entidades principales:

**users**: Almacena credenciales de usuarios con bcrypt para hashing de contraseñas
**sessions**: Gestiona refresh tokens activos con relación many-to-one con users

TypeORM como ORM proporciona:

- Migraciones controladas
- Type-safety en queries
- Abstracción de base de datos

### Comunicación Frontend-Backend

**Patrón de comunicación**:

1. Frontend realiza peticiones HTTP a backend en `http://localhost:3001`
2. Servicio `http-client.ts` centraliza configuración de peticiones
3. Interceptor automático agrega Access Token en header `Authorization`
4. En caso de error 401, intenta renovar token con Refresh Token
5. Si renovación falla, redirige a login

**Separación de concerns**:

- Backend no conoce lógica del juego
- Frontend no maneja persistencia de usuarios
- APIs externas (Rick and Morty) consumidas directamente por frontend
- Backend solo expone endpoints de autenticación y gestión de sesiones

## Estructura del Monorepo

```
memory-card-game/
├── backend/          # API de autenticación (NestJS)
│   └── src/
│       ├── user/     # Gestión de usuarios
│       └── session/  # Gestión de sesiones
├── frontend/         # Aplicación del juego (Next.js)
│   ├── core/         # Componentes compartidos
│   └── features/     # Módulos funcionales
└── README.md         # Este archivo
```

## Ejecución del Proyecto

### Backend

Ver instrucciones detalladas en [backend/README.md](backend/README.md)

Frontend

Ver instrucciones detalladas en [frontend/README.md](frontend/README.md)
