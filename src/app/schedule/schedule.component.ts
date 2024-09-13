import { Component } from '@angular/core';
import { CoursesComponent } from "../courses/courses.component";

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CoursesComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {

}
