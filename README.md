# Student Manager App

Aplicación web desarrollada en Angular para la gestión de estudiantes, cursos e inscripciones. Permite listar, modificar y eliminar estudiantes, cursos e inscripciones de manera sencilla.

## 🚀 Tecnologías utilizadas

- [Angular](https://angular.io/) – Framework principal para construir la aplicación web.
- [Angular Material](https://material.angular.io/) – Componentes UI modernos y responsivos.
- [Bootstrap](https://getbootstrap.com/) – Sistema de estilos adicional para mejorar la maquetación.
- [JSON Server](https://json-server.dev/) – API REST falsa para desarrollo y pruebas locales.
- TypeScript
- HTML / SCSS

## 📦 Funcionalidades principales

- ✅ Listado de estudiantes
    - 🔍 Ver detalle del estudiante
    - ✏️ Editar información de un estudiante (excepto el DNI)
    - 🗑️ Eliminar estudiante
    - ✅ Validaciones de formulario
- ✅ Listado de cursos
    - 🔍 Ver detalle del curso
    - ✏️ Editar información de un curso
    - 🗑️ Eliminar curso
    - ✅ Validaciones de formulario
- ✅ Listado de inscripciones
    - 🔍 Ver detalle de la inscripción
    - ✏️ Editar información de una inscripción
    - 🗑️ Eliminar inscripción
    - ✅ Validaciones de formulario
- 🧾 Almacenamiento simulando db con json server. Se leen los datos 
      desde un archivo json y se puede modificar o eliiminar

## 📂 Estructura del proyecto

src/
├── app/
│ ├── app.component.ts # Componente principal
│ └── app.module.ts # Módulo principal
├── assets/
├── db/
│ └── db.json # Datos iniciales
├── features/
│   ├── alumnos/
│   │   ├── edit-student # Formulario para editar alumno
│   │   ├── students-table # tabla para listar alumnos
│   │   ├── view-student # Formulario para ver datos del estudiante
│   │   ├── alumnos-api # serivicio con la lógica de alumnos
│   ├── cursos/
│   │   ├── edit-course # Formulario para editar curso
│   │   ├── courses-table # tabla para listar cursos
│   │   ├── view-course # Formulario para ver datos del curso
│   │   ├── cursos-api # serivicio con la lógica de cursos
│   ├── inscripciones/
│   │   ├── edit-inscription # Formulario para editar inscripción
│   │   ├── inscriptions-table # tabla para listar inscripciones
│   │   ├── view-inscription # Formulario para ver datos de la inscripción
│   │   ├── inscripciones-api # serivicio con la lógica de inscripciones 
│   ├── navbar/ # menú de navegación lateral
│   ├── not-found/ # componente utilizado para rutas erróneas
│   ├── toolbar/ # tollbar con el título de la aplicación
├── shared/
│   ├── components/
│   │   ├── confirm-dialog/ # componente compartido para generar dialogos
│   ├── directives/ # directivas personalizadas de Angular
│   ├── pipes/ # pipes personalizados de Angular 
│   ├── entities.ts/ # definición de las estructuras de datos principales utilizadas en la aplicación
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


✨ Capturas de pantalla
### 📋 Listado de estudiantes
![Vista Alumnos](assets/screenshots/vista-alumnos.jpg)

### 👁️ Detallde de estudiante
![ver Alumno](assets/screenshots/editar-alumno.jpg)

### ✏️ Formulario de edición
![Editar Alumno](assets/screenshots/editar-alumno.jpg)

### 🗑️ Formulario de eliminación
![Delete Alumno](assets/screenshots/eliminar-alumno.jpg)

### 📋 Listado de cursos
![Vista Cursos](assets/screenshots/vista-cursos.jpg)

### 👁️ Detalle de curso
![ver Curso](assets/screenshots/editar-curso.jpg)

### ✏️ Formulario de edición
![Editar Curso](assets/screenshots/editar-curso.jpg)

### 🗑️ Formulario de eliminación
![Delete Curso](assets/screenshots/eliminar-curso.jpg)

### 📋 Listado de inscripciones
![Vista Inscripciones](assets/screenshots/vista-inscripcion.jpg)

### 👁️ Detalle de inscripción
![ver Inscripción](assets/screenshots/editar-inscripcion.jpg)

### ✏️ Formulario de edición
![Editar Inscripción](assets/screenshots/editar-inscripcion.jpg)

### 🗑️ Formulario de eliminación
![Delete Inscripción](assets/screenshots/eliminar-inscripcion.jpg)



✅ Estado actual
Funciona correctamente en entorno local

Se están evaluando mejoras para utlizar API servicies en lugar de json-server

📌 Notas
Los DNIs deben ser únicos.

El campo DNI no puede editarse una vez ingresado.

Los estudiantes agregados se almacenan en un archivo json y se pueden modificar y eliminar del mismo emulando ya que se emula una base de daots con json server

📄 Licencia
MIT © [Sebastián Gallegos]

---