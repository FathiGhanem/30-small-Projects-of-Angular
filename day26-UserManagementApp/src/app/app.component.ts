import { Component } from '@angular/core';
import { UsersComponent } from "./components/users/users.component";
import { UserformComponent } from "./components/userform/userform.component";

@Component({
  selector: 'app-root',
  imports: [UsersComponent, UserformComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
