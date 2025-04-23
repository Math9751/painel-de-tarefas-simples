import { bootstrapApplication } from '@angular/platform-browser';
import { TaskListComponent } from './app/components/tasklist.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(TaskListComponent, {
  providers: [
    importProvidersFrom(BrowserModule, ReactiveFormsModule)
  ]
}).catch(err => console.error(err));