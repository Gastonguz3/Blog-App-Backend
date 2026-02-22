# Blog App - Backend

API REST construida con Node.js, Express y MongoDB que maneja autenticacion con JWT, gestion de usuario y notas. Esta desplegado en Render

Esta API esta consumida por un frontend desplegado en GitHub Pages desarrollado en React, TypeScript y Tailwind CSS

Para ver la **pagina** [ingrese aca](https://gastonguz3.github.io/Blog-App-Frontend/)

Para ver el **codigo del frontend** [ingrese aca](https://github.com/Gastonguz3/Blog-App-Frontend)

## Tecnologias Usadas

* Node.js
* Express
* MongoDB / Mongoose
* JWT (JSON Web Token)
* TypeScript
* Bycript
* Resend

## Arquitectura

### Seguridad
* Contraseñas hasheadas con bcrypt
* Autenticacion mediante JWT
* Middleware para proteger rutas privadas
* Validacion de datos
* Eliminacion segura de recursos asociados

### Instalacion
1. Clonar el repositorio 
```
git clone https://github.com/Gastonguz3/Blog-App-Backend.git
cd Blog-App-Backend
```
2. Instalar dependencias
```
npm install
```
3. Crear un archivo .env en la raiz del proyecto y completalo siguiendo el */.env.example*
4. Ejecutar en desarrollo
```
npm run dev
```
5. Build produccion
```
npm run build
npm start
```
### Endpoints Principales

#### Users

| Metodo |          Endpoint          |         Descripcion         |
|--------|:--------------------------:|:---------------------------:|
| PUT    |          /user/me          |       Actualizar Nombre     |
| DELETE |          /user/me          |       Eliminar Cuenta       |

#### Notes
| Metodo |          Endpoint          |         Descripcion         |
|--------|:--------------------------:|:---------------------------:|
| GET    |          /api/note         | 	Obtener todas las notas |
| POST   |          /api/note         |     Crear Nota              |
| PUT    |          /api/note/:id     | 	Actualizar Nota         |
| DELETE |          /api/note/:id     |     Eliminar Nota           |

#### Auth

| Metodo |           Endpoint                  |         Descripcion         |
|--------|:-----------------------------------:|:---------------------------:|
| GET    |          /auth/verify/:token        |       Verificar Email       |
| POST   |          /auth/login                | 	   Loguear Usuario       |
| POST   |          /auth/register             |       Registrar Usuario     |

#### Autor: Gaston Guzman [linKedIn](https://www.linkedin.com/in/gaston-guzman-192730352/).