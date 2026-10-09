import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './models/Task';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = 'http://localhost:3000/tasks';
  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.apiUrl);
  }
  deleteTask(id: number): Observable<Task> {
    return this.httpClient.delete<Task>(`${this.apiUrl}/${id}`);
  }
}
