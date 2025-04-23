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

  deleteTask(): void {
    this.taskDeleted.emit(this.task.id);
  }

  createSubtask(): void {
    const newSubtask = { descricao: '', completo: false };
    this.task.subtarefas.push(newSubtask);
  }

  deleteSubtask(index: number): void {
    this.task.subtarefas.splice(index, 1);
  }
  toggleSubtaskCompletion(subtask: { completo: boolean }): void {
    subtask.completo = !subtask.completo;
  }
}
