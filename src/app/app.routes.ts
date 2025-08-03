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
        path: '**',
        component: NotFound
    }
];
