import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../model/task.model'; // Importe o modelo Task
import { TaskService } from '../../services/taskservice.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-taskform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './taskform.component.html',
  styleUrls: ['./taskform.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task | null = null; // Recebe a tarefa para edição (opcional)
  @Output() taskSaved = new EventEmitter<Task>(); // Emite o evento quando a tarefa é salva
  taskForm: FormGroup;
  statuses: string[] = ['Pendente', 'Concluída'];

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: [''],
      status: ['Pendente', Validators.required],
      prazo: [null]
    });
  }

  ngOnInit(): void {
    if (this.task) {
      // Preenche o formulário com os dados da tarefa, se estiver editando
      this.taskForm.patchValue({
        titulo: this.task.titulo,
        descricao: this.task.descricao,
        status: this.task.status,
        prazo: this.task.prazo ? new Date(this.task.prazo) : null // Converte a data
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      const newTask: Task = {
        id: this.task?.id || 0, // Se estiver editando, usa o ID existente
        titulo: formData.titulo,
        descricao: formData.descricao,
        status: formData.status,
        prazo: formData.prazo,
        subtarefas: this.task?.subtarefas || [] // Mantém as subtarefas existentes ao editar
      };

      if (this.task) {
        // Se estiver editando, atualiza a tarefa
        this.taskService.updateTask(newTask);
      } else {
        // Se estiver criando, adiciona a tarefa
        this.taskService.addTask(newTask);
      }
      this.taskSaved.emit(newTask); // Emite o evento para notificar o componente pai
      this.taskForm.reset(); // Limpa o formulário após o envio
    }
  }
}
