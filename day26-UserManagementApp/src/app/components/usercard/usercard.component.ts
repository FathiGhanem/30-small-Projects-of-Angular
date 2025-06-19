import { UserService } from './../../services/user.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-usercard',
  imports: [CommonModule, FormsModule],
  templateUrl: './usercard.component.html',
  styleUrl: './usercard.component.scss',
})
export class UsercardComponent {
  @Input() user!: User;
  isEditingModalOpen: boolean = false;
  editUser: User = new User({ ...this.user });

  constructor(private UserService: UserService) {}

  onEdit() {
    this.editUser = new User({ ...this.user });
    this.isEditingModalOpen = true;
  }

  closeModal(){
    this.isEditingModalOpen= false;

  }

  saveChanges(){
    this.UserService.editUserById(this.user.id,this.editUser);
    this.isEditingModalOpen=false;
  }
  onDelete(){
    this.UserService.deleteUser(this.user.id);
  }
  
}
