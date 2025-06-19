import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { UsercardComponent } from '../usercard/usercard.component';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-users',
  imports: [UsercardComponent, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe({
      next: () => {
        console.log('Users fetched successfully');
      },
      error: (error) => {
        console.error('Error fecthing users:', error);
      },
    });
  }

  onDelete(userId: number) {
    this.userService.deleteUser(userId);
  }

  onAddUser(newUser: Partial<User>) {
    this.userService.addUser(newUser);
  }
  onUpdateUser(updatedUser: User) {
    this.userService.editUserById(updatedUser.id, updatedUser);
  }
  
}
