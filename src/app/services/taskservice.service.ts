import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    // Inicialize com algumas tarefas de exemplo (opcional)
    this.tasks = [
      { id: 1, titulo: 'Comprar mantimentos', descricao: 'Ir ao supermercado e comprar...', status: 'Pendente', prazo: new Date(), subtarefas: [{ descricao: 'Frutas', completo: false }, { descricao: 'Verduras', completo: true }] },
      { id: 2, titulo: 'Estudar Angular', descricao: 'Revisar conceitos...', status: 'Pendente', subtarefas: [] },
      { id: 2, titulo: 'Desenvolver um CRUD', descricao: 'Criar uma sistema de login e senha que integre com o back end...', status: 'Pendente', subtarefas: [{ descricao: 'Integrar com banco de dados Cassandra', completo: true}] }
    ];
    this.tasksSubject.next(this.tasks);
  }

  getTasks(): Task[] { 
    return this.tasks;
  }

  addTask(task: Task): void {
    const nextId = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
    task.id = nextId;
    this.tasks.push(task);
    this.tasksSubject.next([...this.tasks]); // Emite a nova lista
  }

  updateTask(updatedTask: Task): void { 
    const index = this.tasks.findIndex(task => task.id === updatedTask.id); 
    if (index !== -1) {
      // Atualiza a tarefa existente
      this.tasks[index] = updatedTask;
      this.tasksSubject.next([...this.tasks]);
    }
  }

  deleteTask(taskId: number): void {
    // Remove a tarefa com o ID fornecido
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.tasksSubject.next([...this.tasks]);
  }
}
