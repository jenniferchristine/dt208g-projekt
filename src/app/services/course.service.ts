import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private url: string = "https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json";
  constructor(private http: HttpClient) { } // httpclient injiceras

  getPosts() : Observable<Course[]> { // rxjs händelser där course förväntas
    return this.http.get<Course[]>(this.url); // anropar url för getförfrågan
  }
}
