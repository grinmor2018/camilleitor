import { Component, OnInit } from '@angular/core';

import { TaskService } from '../../services/task.service';
import { NgForm } from '@angular/forms';
import { Task } from '../../models/task';
import * as Rooms from '../../../assets/rooms';


declare var M: any;

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TaskService],
})
export class TasksComponent implements OnInit {
  selectedTransport: string;

  oxigenList: boolean[];
  transportList: string[] = ['Camilla', 'A peu', 'Llit', 'Cadira'];
  estatList: string[][]= [['Demanat','red'], ['Portat','cyan'], ['Tornat','green']];
  destinationList: string[] = ['RESO 1', 'RESO 2', 'TAC Tauli', 'TAC UDIAT', 'RX CENTRAL', 'RX UGCES'];
  roomList: string[] = Rooms;
  hiddenState:boolean = true;
  hiddenButton:boolean =  !(this.hiddenState);

  constructor(public taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  addTask(form?: NgForm) {
    console.log(form.value);
    this.hiddenState=false;
    if (form.value._id) {
      this.taskService.putTask(form.value).subscribe((res) => {
        this.resetForm(form);
        this.getTasks();
        M.toast({ html: 'Updated Successfully' });

      });
    } else {
      this.taskService.postTask(form.value).subscribe((res) => {
        this.getTasks();
        this.resetForm(form);
        M.toast({ html: 'Save successfully' });

      });
    }
    this.hiddenState=true;
    this.hiddenButton=false;
  }

  getTasks() {
    this.taskService.getTasks().subscribe((res) => {
      this.taskService.tasks = res as Task[];
    });
  }

  editTask(task: Task) {
    this.taskService.selectedTask = task;
    this.hiddenState=false;
    this.hiddenButton=true;
  }

  deleteTask(_id: string, form: NgForm) {
    if (confirm('Are you sure you want to delete it?')) {
      this.taskService.deleteTask(_id).subscribe((res) => {
        this.getTasks();
        this.resetForm(form);
        M.toast({ html: 'Deleted Succesfully' });
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.taskService.selectedTask = new Task();
    }
  }
}
