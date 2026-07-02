---
title: RedAntisocial
emoji: 🐳
colorFrom: blue
colorTo: green
sdk: docker
app_port: 7860
pinned: false
---

# Instalación

## Requisitos previos

- Node 11 o superior
- Docker y Docker compose

## Variables de entorno

El `.env`, el cual hay que crearlo, debe tener las siguientes variables disponibles:

| Variable             | Ejemplo                  | Descripción                                       |
| -------------------- | ------------------------ | ------------------------------------------------- |
| `PORT`               | `3000`                   | Puerto donde escucha la app.                      |
| `MONGO_ROOT_USERNAME`| `mi-mongo-name`                  | Nombre del usuario de cliente.                    |
| `MONGO_ROOT_PASSWORD`| `mi-mongo-pws`               | Contraseña del cliente.                           |
| `MONGO_URI`          | `mongodb://admin:admin123@localhost:27017/redantisocial?authSource=admin`    | Direccion del cliente.                           |
| `ME_USERNAME`        | `mi-username`                  |                                                   |
| `ME_PASSWORD`        | `mi-password`               |                                                   |
| `REDIS_URL`          | `redis://localhost:6379` | URL de conexión a Redis.                          |
| `REDIS_PASSWORD`     | `mi-redis-pws`               | Contraseña de Redis.                              |
| `CACHE_TTL_SEGUNDOS` | `60`                     | Segundos que vive cada clave en la caché (TTL).   |


## Puesta en marcha

- Primero, hay que establecer las variables de entorno en un archivo `.env`.

```bash
# 1. instalar dependencias
npm install

# 2. Levantar los servicios
docker compose up -d

# 3. Correr las colecciones de prueba
npm run seed

# 4. Arrancar la app con recarga automática
npm run dev

```