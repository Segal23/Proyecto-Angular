import { Routes } from '@angular/router';
import { RoutePaths } from '../shared/routes';
import { Alumnos } from '../features/alumnos/alumnos';
import { NotFound } from '../features/not-found/not-found';
import { AdminGuard } from '../core/auth/admin-guard';
import { Login } from '../core/login/login';
import { AuthGuard } from '../core/auth/auth-guard';
import { AuthRedirectGuard } from '../core/auth/authredirect-guard';

export const routes: Routes = [
    {   path: 'login', 
        component: Login 
    },
    {   path: '', 
        component: Login, 
        canActivate: [AuthRedirectGuard] 
    },
    {   path: RoutePaths.ALUMNOS, 
        component: Alumnos, 
        data: { title: 'Lista de Alumnos' } ,
        canActivate: [AuthGuard] },
    {
        path: RoutePaths.CURSOS,
        //Lazy loading: se carga solo cuando se pide y no al principio evitando penalizar el tiempo de carga de la app
        loadComponent: () => import('../features/cursos/cursos').then(m => m.Cursos),
        data: { title: 'Lista de Cursos' } ,
        canActivate: [AuthGuard]
    },
    {
        path: RoutePaths.INSCRIPCIONES,
        loadComponent: () => import('../features/inscripciones/inscripciones').then(m => m.Inscripciones),
        data: { title: 'Lista de Inscripciones' } ,
        canActivate: [AuthGuard]
    },
    {
        path: RoutePaths.USUARIOS,
        loadComponent: () => import('../features/usuarios/usuarios').then(m => m.Usuarios),
        data: { title: 'Lista de Usuarios' } ,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: RoutePaths.VIEW_STUDENT,
        loadComponent: () => import('../features/alumnos/view-student/view-student').then(m => m.ViewStudent),
        data: { title: 'Ver Alumno' } ,
        canActivate: [AuthGuard]
    },
    {
        path: RoutePaths.VIEW_COURSE,
        loadComponent: () => import('../features/cursos/view-course/view-course').then(m => m.ViewCourse),
        data: { title: 'Ver Curso' } ,
        canActivate: [AuthGuard]
    },
    {
        path: RoutePaths.VIEW_INSCRIPTION,
        loadComponent: () => import('../features/inscripciones/view-inscription/view-inscription').then(m => m.ViewInscription),
        data: { title: 'Ver Inscripción' } ,
        canActivate: [AuthGuard]
    },
    {
        path: RoutePaths.VIEW_USER,
        loadComponent: () => import('../features/usuarios/view-user/view-user').then(m => m.ViewUser),
        data: { title: 'Ver Usuario' } ,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: RoutePaths.EDIT_STUDENT,
        loadComponent: () => import('../features/alumnos/edit-student/edit-student').then(m => m.EditStudent),
        data: { title: 'Editar Alumno' } ,
        canActivate: [AuthGuard]
    },
    {
        path: RoutePaths.EDIT_COURSE,
        loadComponent: () => import('../features/cursos/edit-course/edit-course').then(m => m.EditCourse),
        data: { title: 'Editar Curso' } ,
        canActivate: [AuthGuard]
    },
    {
        path: RoutePaths.EDIT_INSCRIPTION,
        loadComponent: () => import('../features/inscripciones/edit-inscription/edit-inscription').then(m => m.EditInscription),
        data: { title: 'Editar Inscripción' } ,
        canActivate: [AuthGuard]
    },
    {
        path: RoutePaths.EDIT_USER,
        loadComponent: () => import('../features/usuarios/edit-user/edit-user').then(m => m.EditUser),
        data: { title: 'Editar Usuario' } ,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: '**',
        component: NotFound
    }
];
