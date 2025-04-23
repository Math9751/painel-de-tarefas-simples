import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/taskservice.service';
import { Task } from '../model/task.model';
import { TaskItemComponent } from "../components/taskitem/taskitem.component";

@Component({
  selector: 'app-task-list',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
  standalone: true,
  imports: [CommonModule,TaskItemComponent]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  isFormVisible: boolean = false;
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }

  editTask(task: Task): void {
    this.selectedTask = task;
    this.isFormVisible = true;
  }

  addTask(): void {
    this.selectedTask = null;
    this.isFormVisible = true;
  }

  closeForm(): void {
    this.isFormVisible = false;
    this.selectedTask = null;
  }
  saveTask(task: Task): void {
    if (this.selectedTask) {
      this.taskService.updateTask(task);
    } else {
      this.taskService.addTask(task);
    }
    this.closeForm();
}
  
  onTaskSaved(task: Task): void {
    this.isFormVisible = false; // Esconde o formulário após salvar
    this.selectedTask = null; // Limpa a tarefa selecionada
  }

  onTaskSelected(task: Task): void {
    this.selectedTask = task;
    this.isFormVisible = true; // Mostra o formulário para edição
}

}