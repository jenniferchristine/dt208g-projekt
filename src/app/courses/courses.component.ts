import { Component } from '@angular/core';
import { SubheaderComponent } from "../subheader/subheader.component";
import { FormsModule } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [SubheaderComponent, FormsModule, CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  /*
coursePost: Course [] = [];

constructor(private CoursePostService : CourseService) {}

ngOnInit() {
  this.CoursePostService.getPosts().subscribe((data) => {
    this.coursePost = data;
  });
}
  */
}