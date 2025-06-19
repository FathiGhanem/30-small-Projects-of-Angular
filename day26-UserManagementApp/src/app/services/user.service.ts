import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { map, Observable } from 'rxjs';
const API_URL = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users: User[] = [];
  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL).pipe(
      map((rawUsers) => {
        this._users = rawUsers.map((user) => new User(user));
        return this._users;
      })
    );
  }

  getUsers(): User[] {
    return this._users;
  }
  addUser(newUser: Partial<User>): void {
    const userID = Math.max(0, ...this._users.map((user) => user.id)) + 1;
    const userInstance = new User({
      ...newUser,
      id: userID,
    });
    this._users.push(userInstance);
  }

  deleteUser(userID: number): void {
    this._users = this._users.filter((user) => user.id !== userID);
  }

  findUserById(id: number): User | undefined {
    return this._users.find((user) => user.id === id);
  }

  editUserById(userId: number, updateUser: Partial<User>): User | undefined {
    const user = this.findUserById(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    Object.assign(user, updateUser);
    return user;
  }


}
