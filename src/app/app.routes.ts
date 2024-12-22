import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { StatsComponent } from './components/dashboard/stats/stats.component';
import { EditComponent } from './pages/edit/edit.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SinginComponent } from './pages/auth/singin/singin.component';
import { canActivate } from '@angular/fire/auth-guard';
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RoleGuard } from './guards/role.guard';


export const routes: Routes = [
    {path:"home",component:HomeComponent,...canActivate(() => redirectUnauthorizedTo(["login"]))},
    {path:"bookings",component:BookingsComponent, canActivate: [RoleGuard],data: { role: 'user' }},
    {path:"dashboard",component:DashboardComponent,children: [
        {path:"profile",component:ProfileComponent,canActivate: [RoleGuard],data: { role: 'admin' }},
        {path:"stats",component:StatsComponent,canActivate: [RoleGuard],data: { role: 'admin' }}]
        ,canActivate: [RoleGuard],data: { role: 'admin' }},
    {path:"edit/:id",component:EditComponent,canActivate: [RoleGuard],data: { role: 'admin' }},
    {path:"login",component:LoginComponent},
    {path:"singin",component:SinginComponent},
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"**",redirectTo:"home",pathMatch:"full"}

];
