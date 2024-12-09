import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditComponent } from './pages/edit/edit.component';


export const routes: Routes = [
    {path:"home",component:HomeComponent},
    {path:"bookings",component:BookingsComponent},
    {path:"home",component:DashboardComponent},
    {path:"edit/:id",component:EditComponent},
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"**",redirectTo:"home",pathMatch:"full"}

];
