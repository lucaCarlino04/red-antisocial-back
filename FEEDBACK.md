# Feedback del Trabajo Práctico (TP2 — MongoDB)

## Integrantes

A partir de los commits del repositorio:

- **Luca Carlino** (`lucaCarlino04`)
- **Facundo Arias** (`facundoArias217` / `facundoArias`)
- **Enzo Nahuel Carnero** (`EnzoNahuel23`)
- Malena Lozano

> Trabajo repartido entre los integrantes del equipo. 👏

---

## Resumen General

¡Buen trabajo! 🎉 La entrega tiene una **arquitectura muy ordenada**: capa de servicios con controladores delgados (la única responsabilidad que pide el enunciado), configuración centralizada por entorno, manejo de errores centralizado, y validación de integridad referencial. Sumaron además **tres bonus** —seguidores, upload de imágenes y caché con Redis— y documentación con Swagger.

Hay dos puntos funcionales a corregir: la **regla de los comentarios antiguos no se está aplicando**, y la creación de comentarios responde con error. Ambos son acotados.

### Estado por criterio

| Criterio        | Estado | Comentario breve |
|-----------------|:------:|------------------|
| Arquitectura    |   ✅   | Capa de servicios + controladores de única responsabilidad. |
| Modelado        |   ✅   | Referenciado coherente; `nickName` único. |
| Validaciones    |   ✅   | Mongoose + `errorHandler` (ValidationError, CastError, duplicados). |
| Middlewares     |   ✅   | Error handling central; el `CastError` cubre los `ObjectId` inválidos. |
| API REST        |   ⚠️   | CRUD + relaciones; `createComment` responde 500 (Obs. 2). |
| Configuración   |   ✅   | `config/env.js` con `dotenv`; `COMMENT_VISIBILITY_MONTHS` configurable. |
| Documentación   |   ⚠️   | Swagger presente; falta colección de prueba (Obs. 3). |

---

## Fortalezas

### 1. Arquitectura con servicios y configuración centralizada 🏗️
**Ubicación:** `src/services/`, `src/controllers/`, `src/config/env.js`

Los controladores son delgados (try/catch + `next(err)`) y delegan toda la lógica en los servicios; la configuración (puerto, URI, meses de visibilidad) está centralizada en `env.js` con `dotenv`. Es justo la separación de responsabilidades que pide el enunciado. 👌

### 2. Manejo de errores centralizado 🛡️
**Ubicación:** `src/middleware/errorHandler.js`

Un único middleware traduce `ValidationError` → 400, `CastError` → 400 (cubre los `ObjectId` mal formados), y la clave duplicada (`11000`) → 409. Es una forma muy prolija de manejar los errores sin repetir lógica en cada controlador.

### 3. Integridad referencial en los servicios 🔗
**Ubicación:** `src/services/postService.js`, `src/services/commentService.js`

Antes de crear un post o comentario, verifican que el usuario (y el post/tag) existan, devolviendo 404 con un mensaje claro. Buena práctica.

### 4. Tres bonus 🌟
- **Seguidores**: `follow`/`unfollow` con guarda contra seguirse a sí mismo.
- **Upload**: `multer` (`upload.array`) con su controlador de archivos.
- **Caché**: Redis (`checkCache`/`deleteCache`).

### 5. Modelado referenciado y `nickName` único 🗃️
**Ubicación:** `src/database/models/`

Entidades separadas con referencias (`user`, `post`, `tags`), imágenes como array de URLs, y `nickName` único con validaciones de longitud.

---

## Observaciones

### 1. La regla de los comentarios antiguos no se aplica

**Estado:** ❌  **Severidad:** 🔴 Crítico
**Ubicación:** `src/database/models/Comentario.js` (`isVisible`), `src/services/commentService.js` (`listByPost`, `list`)

**Descripción:**
El modelo define un virtual `isVisible` (correcto y configurable por `COMMENT_VISIBILITY_MONTHS`), pero **nunca se usa para filtrar**: buscando en todo `src`, `isVisible` solo aparece en su definición. `listByPost` y `list` devuelven **todos** los comentarios, y los servicios de posts ni siquiera los incluyen. Como los virtuals no se pueden usar en un `find`, el filtro nunca ocurre.

**Impacto:**
Es la regla de negocio central: hoy los comentarios viejos se siguen mostrando.

**Recomendación:**
Filtrar por fecha en la consulta de comentarios (no por el virtual). Por ejemplo, en `listByPost`:

```js
const meses = Number(process.env.COMMENT_VISIBILITY_MONTHS) || 6;
const limite = new Date(); limite.setMonth(limite.getMonth() - meses);
return Comment.find({ post: postId, fechaPublicacion: { $gte: limite } }).populate('user', 'nickName');
```

---

### 2. `createComment` responde con error 500

**Estado:** ⚠️  **Severidad:** 🟠 Importante
**Ubicación:** `src/services/commentService.js` (`create`), `src/database/models/Post.js`

**Descripción:**
`create` hace `post.comments.push(newComment._id)`, pero el modelo `Post` **no tiene** un campo `comments` (sus campos son `description`, `user`, `tags`, `images`). Como `post.comments` es `undefined`, `.push(...)` lanza una excepción y la respuesta termina en **500** (aunque el comentario sí queda creado en la base).

**Impacto:**
El endpoint de creación de comentarios devuelve un error al cliente, pese a haber guardado el dato. La relación post→comentarios ya está resuelta por referencia desde `Comment.post`, así que ese `push` no es necesario.

**Recomendación:**
Quitar las líneas `post.comments.push(...)` y `await post.save()` del servicio (la relación se navega por `Comment.find({ post })`), o bien agregar el campo `comments` al schema de `Post` si quieren mantener ambas puntas.

---

### 3. Rutas duplicadas y falta de colección de prueba

**Estado:** ⚠️  **Severidad:** 🟡 Mejora recomendada
**Ubicación:** `src/routes/post.routes.js`, raíz del proyecto

**Descripción:**
En `post.routes.js`, `POST /` y `PUT /:id/imagenes` están **declaradas dos veces** (una con `upload.array` y otra sin), por lo que la segunda queda como código muerto. Además, el enunciado pide una colección de prueba (Postman/JSON) y solo encontramos Swagger.

**Recomendación:**
Dejar una sola definición por ruta (con el `upload.array` donde corresponda) y exportar una colección de Postman con ejemplos.

---

## Conclusión

Es una entrega con una arquitectura muy bien encarada: servicios, configuración centralizada, manejo de errores prolijo, integridad referencial y tres bonus. 🌟

Los focos son **conectar la regla de los comentarios** (filtrar por fecha en la consulta) y **corregir `createComment`** (quitar el `push` a un campo inexistente). Son cambios chicos y localizados sobre una base sólida. ¡Felicitaciones por el trabajo! 🚀
