# Student Manager App

Aplicación web desarrollada en Angular para la gestión de estudiantes, cursos e inscripciones. Permite listar, modificar y eliminar estudiantes, cursos e inscripciones de manera sencilla.

## 🚀 Tecnologías utilizadas

- [Angular](https://angular.io/) – Framework principal para construir la aplicación web.
- [Angular Material](https://material.angular.io/) – Componentes UI modernos y responsivos.
- [Bootstrap](https://getbootstrap.com/) – Sistema de estilos adicional para mejorar la maquetación.
- [NgRx](https://ngrx.io/) – Manejo de estado global, inspirado en Redux, con soporte para acciones, reducers y efectos.
- [RxJS](https://rxjs.dev/) – Programación reactiva para el manejo de flujos de datos asíncronos.
- [MockAPI](https://mockapi.io/) – API simulada en la nube para pruebas de endpoints y persistencia de datos.
- TypeScript
- HTML / SCSS

## 📦 Funcionalidades principales

- ✅ Incio de sesión
    ✅ Validaciones de formulario
- ✅ Listado de estudiantes
    - 🔍 Ver detalle del estudiante y cursos a los que están inscriptos
    - ❌ Desinscribir al alumno del curso (solo perfil admin)
    - ✏️ Editar información de un estudiante (excepto el DNI) (solo perfil admin)
    - 🗑️ Eliminar estudiante (solo perfil admin)
    - ✅ Validaciones de formulario
- ✅ Listado de cursos
    - 🔍 Ver detalle del curso y alumnos que están inscriptos
    - ❌ Desinscribir al alumno del curso (solo perfil admin)
    - ✏️ Editar información de un curso (solo perfil admin)
    - 🗑️ Eliminar curso (solo perfil admin)
    - ✅ Validaciones de formulario
- ✅ Listado de inscripciones
    - 🔍 Ver detalle de la inscripción
    - ✏️ Editar información de una inscripción
    - 🗑️ Eliminar inscripción
    - ✅ Validaciones de formulario
- ✅ Listado de usuarios (solo perfil admin)
    - 🔍 Ver detalle del usuario 
    - ✏️ Editar información del usuario
    - 🗑️ Eliminar inscripción
    - ✅ Validaciones de formulario
- 🧾 Almacenamiento de datos en una api utlizando mockapi

## 📂 Estructura del proyecto

src/
├── app/
│ ├── app.component.ts # Componente principal
│ └── app.module.ts # Módulo principal
├── assets/
│ └── screenshots/
├── core/
│ ├── auth/ # guards y servicio de autenticación
│ ├── login/ # componente utilizado para loguearse a la aplicación
│ └── core.ts
├── features/
│   ├── alumnos/
│   │   ├── edit-student # formulario para editar alumno
│   │   ├── students-table # tabla para listar alumnos
│   │   ├── view-student # formulario para ver datos del estudiante
│   │   ├── alumnos-api # serivicio con la lógica de alumnos
│   ├── cursos/
│   │   ├── edit-course # formulario para editar curso
│   │   ├── courses-table # tabla para listar cursos
│   │   ├── view-course # formulario para ver datos del curso
│   │   ├── cursos-api # serivicio con la lógica de cursos
│   ├── inscripciones/
│   │   ├── edit-inscription # formulario para editar inscripción
│   │   ├── inscriptions-table # tabla para listar inscripciones
│   │   ├── view-inscription # formulario para ver datos de la inscripción
│   │   ├── inscripciones-api # serivicio con la lógica de inscripciones 
│   ├── navbar/ # menú de navegación lateral
│   ├── not-found/ # componente utilizado para rutas erróneas
│   ├── toolbar/ # tollbar con el título de la aplicación
│   ├── usuarios/
│   │   ├── edit-user # formulario para editar usuario
│   │   ├── users-table # tabla para listar usuarios
│   │   ├── view-user # formulario para ver datos del usuario
│   │   ├── usuarios-api # serivicio con la lógica de usuarios 
├── shared/
│   ├── components/
│   │   ├── confirm-dialog/ # componente compartido para generar dialogos
│   ├── directives/ # directivas personalizadas de Angular
│   ├── pipes/ # pipes personalizados de Angular 
│   ├── entities.ts/ # definición de las estructuras de datos principales utilizadas en la aplicación
│   ├── http-utils.ts/ # funciones http conpartidas
│   ├── routes.ts/ # Enum centralizado de rutas de la aplicación
└── 


## 🧪 Cómo ejecutar el proyecto

### Requisitos

- Node.js y npm instalados
- Angular CLI (`npm install -g @angular/cli`)

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/student-manager-app.git

# Entrar al proyecto
cd student-manager-app

# Instalar dependencias
npm install

# Ejecutar la app
ng serve

# Abrir en el navegador
http://localhost:4200


## 👤 Usuario de pruebas

Para probar la aplicación, podés usar las siguientes cuentas de ejemplo:

- ✉️ **Username:** admin  
- 🔑 **Password:** Admin123!  
- 🛠️ **Rol:** admin  

- ✉️ **Username:** jperez  
- 🔑 **Password:** M0zt4z4#001
- 🛠️ **Rol:** user  


✨ Capturas de pantalla
### 📋 Listado de estudiantes
![Vista Alumnos](assets/screenshots/vista-alumnos.jpg)

### 👁️ Detallde de estudiante
![ver Alumno](assets/screenshots/ver-alumno.jpg)

### ✏️ Formulario de edición
![Editar Alumno](assets/screenshots/editar-alumno.jpg)

### 🗑️ Formulario de eliminación
![Delete Alumno](assets/screenshots/eliminar-alumno.jpg)

### 📋 Listado de cursos
![Vista Cursos](assets/screenshots/vista-cursos.jpg)

### 👁️ Detalle de curso
![ver Curso](assets/screenshots/ver-curso.jpg)

### ✏️ Formulario de edición
![Editar Curso](assets/screenshots/editar-curso.jpg)

### 🗑️ Formulario de eliminación
![Delete Curso](assets/screenshots/eliminar-curso.jpg)

### 📋 Listado de inscripciones
![Vista Inscripciones](assets/screenshots/vista-inscripciones.jpg)

### 👁️ Detalle de inscripción
![ver Inscripción](assets/screenshots/ver-inscripcion.jpg)

### ✏️ Formulario de edición
![Editar Inscripción](assets/screenshots/editar-inscripcion.jpg)

### 🗑️ Formulario de eliminación
![Delete Inscripción](assets/screenshots/eliminar-inscripcion.jpg)

### 📋 Listado de usuarios
![Vista Usuario](assets/screenshots/vista-usuarios.jpg)

### 👁️ Detalle de usuario
![Ver Usuario](assets/screenshots/ver-usuario.jpg)

### ✏️ Formulario de edición
![Editar Usuario](assets/screenshots/editar-usuario.jpg)

### 🗑️ Formulario de eliminación
![Delete Usuario](assets/screenshots/eliminar-usuario.jpg)


✅ Estado actual
Funciona correctamente en entorno local

Se implementó API servicies en lugar de json-server.

Se implmentó formulario de login y manejo de estado para mantener el usuario logueado

📌 Notas
Los DNIs deben ser únicos.

El campo DNI no puede editarse una vez ingresado.

📄 Licencia
MIT © [Sebastián Gallegos]

---