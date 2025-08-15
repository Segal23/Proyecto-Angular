import { HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { throwError } from "rxjs";

export function getHeaders() {
    return {
        headers: new HttpHeaders ({
        'Content-Type': 'application/json',
        })
    };
}

export function handleErrors(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
        console.warn('Error del lado del cliente:', error.error.message);
    }else {
        console.warn(`Error del lado del servidor: ${error.status} - ${error.message}`);
    }
    return throwError(() => new Error('Error de comunicacion HTTP'));
}