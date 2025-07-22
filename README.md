# Student Manager App

Aplicación web desarrollada en Angular para la gestión de estudiantes. Permite listar, agregar, buscar, modificar y eliminar estudiantes de manera sencilla.

## 🚀 Tecnologías utilizadas

- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- TypeScript
- HTML / SCSS

## 📦 Funcionalidades principales

- ✅ Listado de estudiantes
- ➕ Agregar un nuevo estudiante
- 🔍 Buscar estudiante por DNI
- ✏️ Editar información de un estudiante (excepto el DNI)
- 🗑️ Eliminar estudiante
- ✅ Validaciones de formularios
- 🧾 Almacenamiento simulado (lectura inicial desde JSON local)
- 🔁 Persistencia temporal en memoria (los cambios se mantienen mientras la app está abierta)

## 📂 Estructura del proyecto

src/
├── app/
│ ├── components/
│ │ ├── student-list/ # Lista de estudiantes
│ │ ├── add-student-form/ # Formulario para agregar
│ │ ├── edit-form/ # Formulario de edición
│ ├── services/
│ │ └── student.service.ts # Servicio de gestión
│ ├── models/
│ │ └── student.model.ts # Interfaz del estudiante
│ ├── app.component.ts # Componente principal
│ └── app.module.ts # Módulo principal
└── assets/
└── students.json # Datos iniciales


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
![Home](screenshots/home.jpg)

### ➕ Formulario de agregado
![Add Form](screenshots/add-form.jpg)

### 🗑️ Formulario de eliminación
![Delete Form](screenshots/delete-form.jpg)

### ✏️ Formulario de edición
![Edit Form](screenshots/edit-form1.jpg) (screenshots/edit-form2.jpg)


✅ Estado actual
Funciona correctamente en entorno local

Se están evaluando mejoras para persistencia en almacenamiento real (ej. Firebase o backend Express)

📌 Notas
Los DNIs deben ser únicos.

El campo DNI no puede editarse una vez ingresado.

Los estudiantes agregados se almacenan en memoria temporalmente (no se guardan en disco).

📄 Licencia
MIT © [Sebastián Gallegos]

---