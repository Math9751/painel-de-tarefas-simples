// filepath: app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import this module
import { AppComponent } from './app.component';
import { TaskFormComponent } from '../../src/app/components/taskform/taskform.component';

@NgModule({
  declarations: [
  ],
  imports: [
    AppComponent,
    TaskFormComponent, // Add this component to the declarations array
    BrowserModule,
    ReactiveFormsModule // Add this to the imports array
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }