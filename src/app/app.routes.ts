import { CoursesComponent } from './courses/courses.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "courses", component: CoursesComponent },
    { path: "schedule", component: ScheduleComponent },
    { path: "404", component: NotFoundComponent }, 
    { path: "**", component: NotFoundComponent },
    { path: "", redirectTo: '/home', pathMatch: 'full' }
];
