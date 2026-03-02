# Backend - Authentication API

API de autenticación para el juego de memoria de Rick and Morty.

## Descripción

Backend desarrollado con NestJS que proporciona autenticación de usuarios mediante JWT. Gestiona usuarios registrados y sus sesiones activas.

## Estructura de Base de Datos

**Tabla users**:
- `id`: UUID único
- `username`: Nombre de usuario único
- `password`: Contraseña hasheada con bcrypt
- `role`: Rol del usuario (admin/user)

**Tabla sessions**:
- `id`: UUID único  
- `user_id`: Referencia a usuario
- `refresh_token`: Token de refresco hasheado
- `is_active`: Estado de la sesión
- `expires_at`: Fecha de expiración
- `created_at`: Fecha de creación

## Autenticación

Sistema de autenticación basado en JWT con dos tipos de tokens:

**Access Token**: 
- Duración: 15 minutos
- Uso: Autenticación de peticiones a la API

**Refresh Token**:
- Duración: 7 días  
- Uso: Renovación de access tokens
- Almacenamiento: Base de datos (tabla sessions)

## Endpoints

### Usuarios

```
POST /users/register
Body: { username, password }
Respuesta: { access_token, refresh_token }

POST /users/login
Body: { username, password }
Respuesta: { access_token, refresh_token }
```

### Sesiones

```
POST /sessions/refresh
Body: { refresh_token }
Respuesta: { access_token }
```

## Ejecución

### Con Docker

1. Configurar variables de entorno:
```bash
cp .env.example .env.docker
```

2. Editar `.env.docker` con tus credenciales de base de datos

3. Levantar servicios:
```bash
docker-compose up
```

El backend estará disponible en `http://localhost:3001`
PostgreSQL en `localhost:5432`

### Local

1. Asegurar tener PostgreSQL instalado y corriendo

2. Configurar variables de entorno:
```bash
cp .env.example .env.local
```

3. Editar `.env.local`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=memory_game
BACKEND_PORT=3001

JWT_SECRET=tu-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=tu-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=7d
```

4. Instalar dependencias:
```bash
npm install
```

5. Ejecutar aplicación:
```bash
npm run start:local
```

El backend estará disponible en `http://localhost:3001`

## Scripts Disponibles

```bash
npm run start:local      # Desarrollo local
npm run start:docker     # Desarrollo con Docker
npm run build            # Compilar para producción
npm run lint             # Ejecutar linter
docker-compose up        # Levantar Docker
docker-compose down      # Detener Docker
```

## Stack Tecnológico

- NestJS 11
- TypeORM
- PostgreSQL
- Passport JWT
- bcryptjs
- class-validator
- class-transformer

## Estructura del Código

```
src/
├── common/              # Guards y decoradores compartidos
├── config/              # Configuraciones (DB, JWT)
├── user/                # Módulo de usuarios
│   ├── dto/            # DTOs de validación
│   ├── entities/       # Entidad User
│   └── jwt.strategy.ts # Estrategia de autenticación
└── session/             # Módulo de sesiones
    ├── dto/            # DTOs de validación
    └── entities/       # Entidad Session
```
