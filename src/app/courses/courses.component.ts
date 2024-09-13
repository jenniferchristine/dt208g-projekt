import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  @Input() actionType: 'add' | 'delete' = 'add';
  @Output() courseAction = new EventEmitter<string>();

  coursePost: Course[] = [];
  filteredCourses: Course[] = [];
  pagedCourses: Course[] = [];
  searchText: string = "";
  sortText: "asc" | "desc" = "asc";
  currentPage: number = 1;
  pageSize: number = 10;
  uniqueSubjects: string [] = [];
  selectedSubjects: string = "";
  confirmation: string = "";
  heading: string = "";

  constructor(private coursePostService: CourseService) { }

  ngOnInit() : void {
    if (this.actionType === 'add') {
      this.heading = "Hitta kurser"
      this.loadAPIResult();
    } else if (this.actionType === 'delete') {
      this.heading = "Mitt ramschema";
      this.loadLocalStorage();
    }
  }

  private loadAPIResult() : void {
    this.coursePostService.getPosts().subscribe((data: Course[]) => {
      this.coursePost = data;
      this.filteredCourses = data;

      this.uniqueSubjects = Array.from(new Set(data.map(course => course.subject)));
      this.updatePagedCourses();
    });
  }

  private loadLocalStorage() : void {
    const savedCourses = localStorage.getItem("savedCourses");
    this.coursePost = savedCourses ? JSON.parse(savedCourses) : [];
    this.filteredCourses = this.coursePost;
    this.updatePagedCourses();
  }

  searchTable() : void {
    this.filteredCourses = this.coursePost.filter(course =>
      course.courseName.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
      course.courseCode.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
      course.progression.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase())
    );

    this.currentPage = 1;
    this.updatePagedCourses();
  }

  filterBySubject() : void {
    if (this.selectedSubjects) {
      this.filteredCourses= this.coursePost.filter(course =>
        course.subject === this.selectedSubjects
      );
    } else {
      this.filteredCourses = this.coursePost;
    }
    this.currentPage = 1;
    this.updatePagedCourses();
  }

  sortTable(column: keyof Course) : void {
    const compare = (a: Course, b: Course): number => {
      let valueA: string | number = a[column];
      let valueB: string | number = b[column];
  
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

    this.filteredCourses.sort(compare);
    this.currentPage = 1;
    this.updatePagedCourses();
    this.sortText = this.sortText === "asc" ? "desc" : "asc";
  }

  updatePagedCourses() : void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCourses = this.filteredCourses.slice(startIndex, endIndex);
  }

  nextPage() : void {
    if (this.currentPage * this.pageSize < this.filteredCourses.length) {
      this.currentPage++;
      this.updatePagedCourses();
    }
  }

  previousPage() : void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedCourses();
    }
  }

  saveToLocalStorage(course: Course) : void {
    let savedCourses = localStorage.getItem("savedCourses");
    let courses = savedCourses ? JSON.parse(savedCourses) : [];
    courses.push(course);
    localStorage.setItem("savedCourses", JSON.stringify(courses));

    this.confirmation = `
    Kurs ${course.courseName} har lagts till!`;

    setTimeout(() => {
      this.confirmation = "";
    }, 3000);
  }

  removeFromLocalStorage(courseId: string) : void {
    let savedCourses = localStorage.getItem("savedCourses");
    let courses = savedCourses ? JSON.parse(savedCourses) : [];
    courses = courses.filter((course: Course) => course.courseCode !== courseId );
    localStorage.setItem("savedCourses", JSON.stringify(courses));

    this.coursePost = this.coursePost.filter((course: Course) => course.courseCode !== courseId);
    this.filteredCourses = this.coursePost;
    this.updatePagedCourses();

    this.confirmation = `
    Kursen är raderad`;

    setTimeout(() => {
      this.confirmation = "";
    }, 3000);
  }

  onClick(course: Course) : void {
    if (this.actionType === 'add') {
      this.saveToLocalStorage(course);
    } else if (this.actionType === 'delete') {
      this.removeFromLocalStorage(course.courseCode);
    }
    this.courseAction.emit(course.courseCode);
  }
  
  get totalCourses() : number {
    return this.filteredCourses.length;
  }

  get startIndex() : number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex() : number {
    return Math.min(this.currentPage * this.pageSize, this.filteredCourses.length);
  }
}