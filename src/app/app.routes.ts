import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { StatsComponent } from './components/dashboard/stats/stats.component';
import { EditComponent } from './pages/edit/edit.component';


export const routes: Routes = [
    {path:"home",component:HomeComponent},
    {path:"bookings",component:BookingsComponent},
    {path:"dashboard",component:DashboardComponent,children: [
        {path:"profile",component:ProfileComponent},
        {path:"stats",component:StatsComponent}]},
    {path:"edit/:id",component:EditComponent},
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"**",redirectTo:"home",pathMatch:"full"}

];
