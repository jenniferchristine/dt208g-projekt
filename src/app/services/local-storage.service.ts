import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageKey = "savedCourses";

  /* hämta alla kurser från localstorage */
  getSavedCourses(): Course[] {
    const savedCourses = localStorage.getItem(this.storageKey);
    return savedCourses ? JSON.parse(savedCourses) : [];
  }

  /* spara kurs till localstorage */
  saveCourse(course: Course): void {
    let courses = this.getSavedCourses();
    courses.push(course);
    localStorage.setItem(this.storageKey, JSON.stringify(courses));
  }

  /* radera kurs från localstorage */
  deleteCourse(courseCode: string): void {
    let courses = this.getSavedCourses();
    courses = courses.filter((course: Course) => course.courseCode !== courseCode);
    localStorage.setItem(this.storageKey, JSON.stringify(courses));
  }
}
