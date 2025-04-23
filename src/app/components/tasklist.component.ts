// tasklist.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/taskservice.service';
import { Task } from '../model/task.model';
import { TaskItemComponent } from "../components/taskitem/taskitem.component";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
  standalone: true,
  imports: [CommonModule,TaskItemComponent]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  taskForm: FormGroup;
  filterForm: FormGroup;
  isFormVisible: boolean = false;
  selectedTask: Task | null = null;
  totalPending: number = 0;
  totalCompleted: number = 0;

  constructor(private taskService: TaskService, private fb: FormBuilder ) {
    this.taskForm = this.fb.group({
    titulo: [''],
    descricao: [''],
    prazo: [null],
    status: ['Pendente']
  });

  this.filterForm = this.fb.group({
    status: [''],
    titulo: ['']
  });
}

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
      this.calculateTaskTotals(); 
    });
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: 0,
        titulo: this.taskForm.value.titulo,
        descricao: this.taskForm.value.descricao,
        prazo: this.taskForm.value.prazo,
        status: this.taskForm.value.status,
        subtarefas: []
      };
      this.taskService.addTask(newTask);
      this.taskForm.reset();
      this.isFormVisible = false;
    }
  }

  onTaskSaved(task: Task): void {
    this.isFormVisible = false; // Esconde o formulário após salvar
    this.selectedTask = null; // Limpa a tarefa selecionada
  }

  onTaskSelected(task: Task): void {
    this.selectedTask = task;
    this.isFormVisible = true; // Mostra o formulário para edição
  }
  
  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }

  toggleTaskStatus(task: Task): void {
    this.taskService.updateTask(task);
  }

  filterTasks(): void {
    let filtered = this.tasks;

    if (this.filterForm.value.status) {
      filtered = filtered.filter(task => task.status === this.filterForm.value.status);
    }
    if (this.filterForm.value.titulo) {
      filtered = filtered.filter(task => task.titulo.toLowerCase().includes(this.filterForm.value.titulo.toLowerCase()));
    }
    this.filteredTasks = filtered;
    this.calculateTaskTotals();
  }

  calculateTaskTotals(): void {
    this.totalPending = this.tasks.filter(task => task.status === 'Pendente').length;
    this.totalCompleted = this.tasks.filter(task => task.status === 'Concluída').length;
  };
}