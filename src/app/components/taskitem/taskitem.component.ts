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
}
