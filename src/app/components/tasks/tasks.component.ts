import rooms from '../../../assets/data/rooms.json';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

declare var M: any;

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TaskService],
})
export class TasksComponent implements OnInit {

  transportList: string[] = ['Llitera', 'A peu', 'Llit', 'Cadira'];
  estatList: string[][]= [['Demanat','red'], ['Portat','cyan'], ['Tornat','green']];
  destinationList: string[] = ['RESO 1', 'RESO 2', 'TAC TAULI', 'TAC UDIAT', 'RX CENTRAL', 'RX UCIES','PET TAC','M.NUCLEAR','ECOS','RVI'];
  roomList: any = rooms;
  hiddenState:boolean = true;
  hiddenButton:boolean =  !(this.hiddenState);
  hiddenButtons:boolean = true;

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
    this.hiddenButtons=true;
  }

  getTasks() {
    this.taskService.getTasks().subscribe((res) => {
      this.taskService.tasks = res as Task[];
    });
    this.scrollTop();
  }

  editTask(task: Task) {
    this.taskService.selectedTask = task;
    this.hiddenState=false;
    this.hiddenButton=true;
    this.hiddenButtons=true;
    this.scrollDown();
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

  activateButtons(task: Task){
    if (this.hiddenButtons===true) {
      this.hiddenButtons = false;
    }
    else { this.hiddenButtons = true;
    }
  }

  getFocus() {
    document.getElementById("formulario").focus({preventScroll:false});
  }

  scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }

  scrollDown() {
    const height = document.body.scrollHeight;
    document.body.scrollTop = height; // Safari
    document.documentElement.scrollTop = height; // Other
  }


}
