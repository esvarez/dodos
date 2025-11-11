import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.model';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule, InputComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos: Todo[] = [];
  newTodoTitle: string = '';

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: this.newTodoTitle.trim(),
        completed: false,
        createdAt: new Date()
      };
      this.todos = [...this.todos, newTodo];
      this.newTodoTitle = '';
    }
  }

  toggleTodo(id: string): void {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  deleteTodo(id: string): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  get completedCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  get totalCount(): number {
    return this.todos.length;
  }
}

