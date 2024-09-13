import { Component } from '@angular/core';
import { CoursesComponent } from '../courses/courses.component';

@Component({
  selector: 'app-find-courses',
  standalone: true,
  imports: [CoursesComponent],
  templateUrl: './find-courses.component.html',
  styleUrl: './find-courses.component.scss'
})
export class FindCoursesComponent {

}
