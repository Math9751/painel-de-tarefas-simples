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

  toggleTaskCompletion(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task);
  }

  getTaskCount(): number {
    return this.tasks.length;
  }

  getCompletedTaskCount(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  getPendingTaskCount(): number {
    return this.tasks.filter(task => !task.completed).length;
  }

  getTaskStatus(task: Task): string {
    return task.completed ? 'Concluída' : 'Pendente';
  }
  getTaskStatusClass(task: Task): string {
    return task.completed ? 'task-completed' : 'task-pending';
}
  getTaskStatusIcon(task: Task): string {
    return task.completed ? 'check_circle' : 'radio_button_unchecked';
  }
  getTaskStatusColor(task: Task): string {
    return task.completed ? 'green' : 'red';
  }

  getTaskStatusText(task: Task): string {
    return task.completed ? 'Concluída' : 'Pendente';
  }
  getTaskStatusTooltip(task: Task): string {
    return task.completed ? 'Tarefa concluída' : 'Tarefa pendente';
}
  getTaskStatusIconColor(task: Task): string {
    return task.completed ? 'green' : 'red';
  }

  getTaskStatusIconSize(task: Task): string {
    return task.completed ? '24px' : '16px';
  }

  getTaskStatusIconStyle(task: Task): { [key: string]: string } {
    return {
      color: this.getTaskStatusIconColor(task),
      fontSize: this.getTaskStatusIconSize(task)
    };
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