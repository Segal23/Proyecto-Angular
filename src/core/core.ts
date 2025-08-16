import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';

@NgModule({
    imports: [
        StoreModule.forRoot({ auth: authReducer }),
    ],
})
export class CoreModule {}
