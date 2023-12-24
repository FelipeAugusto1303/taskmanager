import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { HeaderComponent } from './shared/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormCreateTaskComponent } from './shared/form-create-task/form-create-task.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { TaskComponent } from './shared/task/task.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EditModalComponent } from './shared/edit-modal/edit-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskInfoComponent } from './shared/task-info/task-info.component';
import { TaskLogComponent } from './shared/task-log/task-log.component';
import { TaskCommentComponent } from './shared/task-comment/task-comment.component';
import { RegisterLogModalComponent } from './shared/register-log-modal/register-log-modal.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ConcludedTaskComponent } from './shared/concluded-task/concluded-task.component';
import { EditLogModalComponent } from './shared/edit-log-modal/edit-log-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskDetailComponent,
    HeaderComponent,
    FormCreateTaskComponent,
    TaskComponent,
    EditModalComponent,
    TaskInfoComponent,
    TaskLogComponent,
    TaskCommentComponent,
    RegisterLogModalComponent,
    ConcludedTaskComponent,
    EditLogModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatSnackBarModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
