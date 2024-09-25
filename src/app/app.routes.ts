import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScheduleComponent } from './schedule/schedule.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FindCoursesComponent } from './find-courses/find-courses.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "find-courses", component: FindCoursesComponent },
    { path: "schedule", component: ScheduleComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "404", component: NotFoundComponent }, 
    { path: "**", redirectTo: "404" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule] 
})
export class AppRoutingModule { } 