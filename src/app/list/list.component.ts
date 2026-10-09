import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../models/Task';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  constructor(private taskService: TaskService) {}
  tasks: Task[] = [];
  editingId: number | null = null;
  taskForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    priority: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    dueDate: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    done: new FormControl(false, {
      nonNullable: true,
      validators: Validators.required,
    }),
    estimate: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  ngOnInit(): void {
    this.getTasks();
  }
  getTasks() {
    this.taskService.getTasks().subscribe((t) => (this.tasks = t));
  }
  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((t) => id !== t.id);
    });
  }
  addTask(t: Task) {
    this.taskService.addTask(t).subscribe((tasks) => {
      this.tasks = [...this.tasks, t];
    });
  }
  startEdit(t: Task) {
    this.taskForm.patchValue({
      title: t.title,
      priority: t.priority,
      dueDate: t.dueDate,
      done: t.done,
      estimate: String(t.estimate),
    });
  }
  onSubmit(t: Task) {
    const raw = this.taskForm.getRawValue();
    const transformedTask: Task = {
      title: raw.title,
      done: raw.done,
      dueDate: raw.dueDate,
      estimate: Number(raw.estimate),
      priority: raw.priority,
    };
    if (this.editingId) {
      this.taskService.updateTask(t).subscribe((t) => {
        const found = this.tasks.filter((t) => t.id === this.editingId);
        if (found) {
        }
      });
    }
  }
}
