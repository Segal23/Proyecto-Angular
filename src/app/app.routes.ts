import { Routes } from '@angular/router';
import { RoutePaths } from '../shared/routes';
import { Alumnos } from '../features/alumnos/alumnos';
import { NotFound } from '../features/not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        component: Alumnos
    },
    {
        path: RoutePaths.ALUMNOS,
        component: Alumnos
    },
    {
        path: RoutePaths.CURSOS,
        //Lazy loading: se carga solo cuando se pide y no al principio evitando penalizar el tiempo de carga de la app
        loadComponent: () => import('../features/cursos/cursos').then(m => m.Cursos)
    },
    {
        path: RoutePaths.INSCRIPCIONES,
        loadComponent: () => import('../features/inscripciones/inscripciones').then(m => m.Inscripciones)
    },
    {
        path: RoutePaths.VIEW_STUDENT,
        loadComponent: () => import('../features/alumnos/view-student/view-student').then(m => m.ViewStudent)
    },
    {
        path: RoutePaths.VIEW_COURSE,
        loadComponent: () => import('../features/cursos/view-course/view-course').then(m => m.ViewCourse)
    },
    {
        path: RoutePaths.VIEW_INSCRIPTION,
        loadComponent: () => import('../features/inscripciones/view-inscription/view-inscription').then(m => m.ViewInscription)
    },
    {
        path: '**',
        component: NotFound
    }
];
