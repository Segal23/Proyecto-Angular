import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFound {
  
  constructor(private router: Router){}

  backToHome(){
    const stored = localStorage.getItem('auth');
    if(stored){
      this.router.navigate(['/alumnos']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
