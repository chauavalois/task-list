import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Task } from './features/task-list/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
                                                                                                                                                                                                     
  private endpointBase: string = 'http://localhost:3000/tarefas'

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.endpointBase);
  }
  update(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.endpointBase}/${task.id}`,task);
  }  
  save(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.endpointBase,task);
  }       
  delete(id:number): Observable<any>{
    return this.httpClient.delete<any>(`${this.endpointBase}/${id}`);
  }   
}


