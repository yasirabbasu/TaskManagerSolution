import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: Date;
  isCompleted: boolean;
  category?: string;
  updatedAt: Date
}

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule, BrowserModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  newTask: Partial<Task> = {};
  isLoading = true;
  errorMessage = '';

  // Priority options for dropdown
  priorities = [
    { value: 'Low', display: 'Low' },
    { value: 'Medium', display: 'Medium' },
    { value: 'High', display: 'High' }
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get<Task[]>('/api/tasks').subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load tasks. Please try again.';
        this.isLoading = false;
        console.error('Error loading tasks:', err);
      }
    });
  }

  addTask(): void {
    if (!this.newTask.title) return;

    this.http.post<Task>('/api/tasks', this.newTask).subscribe({
      next: (task) => {
        this.tasks.push(task);
        this.newTask = {}; // Reset form
      },
      error: (err) => {
        this.errorMessage = 'Failed to add task. Please try again.';
        console.error('Error adding task:', err);
      }
    });
  }

  toggleTaskStatus(task: Task): void {
    this.http.patch(`/api/tasks/${task.id}/status`, {
      isCompleted: !task.isCompleted
    }).subscribe({
      next: () => {
        task.isCompleted = !task.isCompleted;
        task.updatedAt = new Date();
      },
      error: (err) => {
        console.error('Error updating task status:', err);
      }
    });
  }
}
