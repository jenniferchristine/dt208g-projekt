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
  coursePost: Course[] = [];
  filteredCourses: Course[] = [];
  pagedCourses: Course[] = [];
  searchText: string = "";
  sortText: "asc" | "desc" = "asc";
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private coursePostService: CourseService) { }

  ngOnInit() {
    this.coursePostService.getPosts().subscribe((data) => {
      this.coursePost = data;
      this.filteredCourses = data;
      this.updatePagedCourses();
    });
  }

  searchTable() {
    this.filteredCourses = this.coursePost.filter(course =>
      course.courseName.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
      course.courseCode.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
      course.progression.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase())
    );

    this.currentPage = 1;
    this.updatePagedCourses();
  }

  sortTable(column: string) {
    const compare = (a: Course, b: Course): number => {
      let valueA = a[column as keyof Course];
      let valueB = b[column as keyof Course];
  
      if (!isNaN(Number(valueA)) && !isNaN(Number(valueB))) {
        valueA = Number(valueA);
        valueB = Number(valueB);

      } else if (typeof valueA === "string" && typeof valueB === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
  
      if (valueA < valueB) {
        return this.sortText === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortText === "asc" ? 1 : -1;
      }
      return 0;
    };

    this.pagedCourses.sort(compare);
    this.updatePagedCourses();
    this.sortText = this.sortText === "asc" ? "desc" : "asc";
  }

  updatePagedCourses() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCourses = this.filteredCourses.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.filteredCourses.length) {
      this.currentPage++;
      this.updatePagedCourses();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedCourses();
    }
  }
}