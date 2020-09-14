import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  selectedOxigen:boolean;
  selectedTask: Task;
  tasks: Task[];
  readonly URL_API = '/api/tasks';

  constructor(private http: HttpClient) {
    this.selectedTask = new Task();
   }

  getTasks(){
    return this.http.get(this.URL_API);
  }

  postTask(task: Task){
    return this.http.post(this.URL_API, task);
  }

  putTask(task: Task){
    return this.http.put(this.URL_API + `/${task._id}`, task);
  }

  deleteTask(_id: String){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
