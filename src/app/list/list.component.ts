import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../models/Task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  constructor(private taskService: TaskService) {}
  tasks: Task[] = [];
  ngOnInit(): void {
    this.getTasks();
  }
  getTasks() {
    this.taskService.getTasks().subscribe((t) => (this.tasks = t));
  }
}
