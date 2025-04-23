import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../model/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  templateUrl: './taskitem.component.html',
  styleUrls: ['./taskitem.component.css'],
  standalone: true,
  imports: [CommonModule], 
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() taskStatusChanged = new EventEmitter<Task>();
  @Output() taskSelected = new EventEmitter<Task>();
  isAtrasada: boolean = false;

  ngOnInit(): void {
    this.checkIfAtrasada ();
    }

  deleteTask(): void {
    this.taskDeleted.emit(this.task.id);
  }

  toggleStatus(): void {
    this.task.status = this.task.status === 'Pendente' ? 'Concluída' : 'Pendente';
    this.taskStatusChanged.emit(this.task);
  }

  editTask(): void {
    this.taskSelected.emit(this.task);
  }

  checkIfAtrasada(): void {
    if (this.task.prazo) {
      const today = new Date();
      const prazo = new Date(this.task.prazo);
      this.isAtrasada = prazo < today && this.task.status !== 'Concluída';
    }
}
}
