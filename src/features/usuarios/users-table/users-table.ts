import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../shared/entities';
import {MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { RoutePaths } from '../../../shared/routes';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FullnamePipe } from "../../../shared/pipes/fullname-pipe";

@Component({
  selector: 'app-users-table',
  imports: [MatTableModule, MatIconModule, MatTooltipModule, FullnamePipe],
  templateUrl: './users-table.html',
  styleUrl: './users-table.css',

})
export class UsersTable {
  @Input() users: User[] = []; 
  @Output() deleteEvent = new EventEmitter<User>();
  @Output() editEvent = new EventEmitter<User>();

  displayedColumns: string[] = ['fullname', 'username', 'password', 'role', 'isActive', 'actions'];

  constructor(private router: Router){}

  viewDetails(user: User) {
    this.router.navigate([`/${RoutePaths.VIEW_USER}`,], { state: { user :user } });
  }

  deleteUser(user: User) {
    this.deleteEvent.emit(user);
  }

  editUser(user: User) {
    this.router.navigate([`/${RoutePaths.EDIT_USER}`,], { state: { user :user } });
  }
}