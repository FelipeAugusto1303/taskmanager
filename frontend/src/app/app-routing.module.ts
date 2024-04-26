import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/authGuard';
import { RegisterComponent } from './pages/register/register.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { ResetAccountComponent } from './pages/reset-account/reset-account.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'details/:id',
    component: TaskDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'request-reset',
    component: SendEmailComponent,
  },
  {
    path: 'reset-account',
    component: ResetAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
