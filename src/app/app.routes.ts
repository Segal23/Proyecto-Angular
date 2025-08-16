import { Routes } from '@angular/router';
import { RoutePaths } from '../shared/routes';
import { Alumnos } from '../features/alumnos/alumnos';
import { NotFound } from '../features/not-found/not-found';
import { AdminGuard } from '../core/auth/admin-guard';
import { Login } from '../core/login/login';
import { AuthGuard } from '../core/auth/auth-guard';
import { AuthRedirectGuard } from '../core/auth/authredirect-guard-guard';

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
        canActivate: [AuthGuard] },
    {
        path: RoutePaths.CURSOS,
        //Lazy loading: se carga solo cuando se pide y no al principio evitando penalizar el tiempo de carga de la app
        loadComponent: () => import('../features/cursos/cursos').then(m => m.Cursos),
        canActivate: [AuthGuard]
    },
    {
        path: RoutePaths.INSCRIPCIONES,
        loadComponent: () => import('../features/inscripciones/inscripciones').then(m => m.Inscripciones),
        canActivate: [AuthGuard]
    },
    {
        path: RoutePaths.VIEW_STUDENT,
        loadComponent: () => import('../features/alumnos/view-student/view-student').then(m => m.ViewStudent),
        canActivate: [AuthGuard]
    },
    {
        path: RoutePaths.VIEW_COURSE,
        loadComponent: () => import('../features/cursos/view-course/view-course').then(m => m.ViewCourse),
        canActivate: [AuthGuard]
    },
    {
        path: RoutePaths.VIEW_INSCRIPTION,
        loadComponent: () => import('../features/inscripciones/view-inscription/view-inscription').then(m => m.ViewInscription),
        canActivate: [AuthGuard]
    },
    {
        path: RoutePaths.EDIT_STUDENT,
        loadComponent: () => import('../features/alumnos/edit-student/edit-student').then(m => m.EditStudent),
        canActivate: [AuthGuard]
    },
    {
        path: RoutePaths.EDIT_COURSE,
        loadComponent: () => import('../features/cursos/edit-course/edit-course').then(m => m.EditCourse),
        canActivate: [AuthGuard]
    },
    {
        path: RoutePaths.EDIT_INSCRIPTION,
        loadComponent: () => import('../features/inscripciones/edit-inscription/edit-inscription').then(m => m.EditInscription),
        canActivate: [AuthGuard]
    },
    {
        path: RoutePaths.USUARIOS,
        loadComponent: () =>
        import('../features/usuarios/usuarios').then(m => m.Usuarios),
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: '**',
        component: NotFound
    }
];
