import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/taskservice.service';
import { Task } from '../../model/task.model';
import { TaskItemComponent } from "../taskitem/taskitem.component";

@Component({
  selector: 'app-task-list',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
  imports: [TaskItemComponent]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }
}

