import { Component } from '@angular/core';
import { Bigtitle } from '../../shared/directives/bigtitle';

@Component({
  selector: 'app-toolbar',
  imports: [Bigtitle],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css'
})
export class Toolbar {

}
