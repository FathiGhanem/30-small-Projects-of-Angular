import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { catchError, map, Observable } from 'rxjs';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  constructor(private HttpClient: HttpClient) {}
  getTodos(): Todo[] {
    return this.todos;
  }

  fetchTodos(userId: number): Observable<Todo[]> {
    return this.HttpClient.get<Todo[]>(`${API_URL}?userId=${userId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error has pccured:', error);
        throw new Error('Something went wrong during user fetch');
      }),
      map((todos) => {
        this.todos = todos;
        return todos;
      })
    );
  }

  addTodo(newTodo: Partial<Todo>): void {
    const todoId = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    const todoInstance = new Todo(
      newTodo.userId!,
      todoId,
      newTodo.title || 'New Todo',
      false
    );
    this.todos.push(todoInstance);
    console.log('Todo added', todoInstance);
  }

  deleteTodo(todoId: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
    console.log(`Todo with id ${todoId} deleted,`);
  }

  editTodoById(todoId: number, updatedTodo: Partial<Todo>): Todo {
    const todo = this.todos.find((todo) => todo.id === todoId);
    if (!todo) {
      throw new Error('Todo not found');
    }
    Object.assign(todo,updatedTodo);
    console.log(`Todo with id ${todoId} updated: `,todo);
    return todo;
  }
}
