import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; // angular-moduler och parametrar
import { FormsModule } from '@angular/forms'; // formulärhantering, ng
import { CourseService } from '../services/course.service'; // importerar tjänst
import { Course } from '../models/course' // importerar modell av interface
import { CommonModule } from '@angular/common'; // ngIf, ngFor

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  @Input() actionType: 'add' | 'delete' = 'add'; // skiljer på sidor/knappar
  @Output() courseAction = new EventEmitter<string>(); // emitterar kurskod

  coursePost: Course[] = []; // lagrar kurser
  filteredCourses: Course[] = [];
  pagedCourses: Course[] = [];
  searchText: string = "";
  sortText: "asc" | "desc" = "asc"; // bestämmer sortering
  currentPage: number = 1;
  pageSize: number = 10; // hur många poster visas per sida
  uniqueSubjects: string [] = [];
  selectedSubjects: string = "";
  confirmation: string = ""; // bekräftelsemeddelande
  heading: string = "";

  constructor(private coursePostService: CourseService) { } // injektion av service

  /* bestämmer hur och när komponent ska initaliseras */
  ngOnInit() : void {
    if (this.actionType === 'add') { // actiontype för kurs-sida
      this.heading = "Hitta kurser"
      this.loadAPIResult();
    } else if (this.actionType === 'delete') { // actiontype för ramschema-sida
      this.heading = "Mitt ramschema";
      this.loadLocalStorage();
    }
  }

  /* privat metod för att hämta data från api */
  private loadAPIResult() : void {
    this.coursePostService.getPosts().subscribe((data: Course[]) => { // getpost returnerar observable
      this.coursePost = data; // lagrar kurser
      this.filteredCourses = data; // tilldelar filtrerad kursdata

      this.uniqueSubjects = Array.from(new Set(data.map(course => course.subject))); // array för ämnen
      this.updatePagedCourses(); // uppdaterar
    });
  }

  /* privat metod för att hämta data från localstorage */
  private loadLocalStorage() : void {
    const savedCourses = localStorage.getItem("savedCourses");
    this.coursePost = savedCourses ? JSON.parse(savedCourses) : [];
    this.filteredCourses = this.coursePost;

    this.uniqueSubjects = Array.from(new Set(this.coursePost.map((course: Course) => course.subject)));
    this.updatePagedCourses();
  }

  /* filtrerar kurser utifrån söktext */
  searchTable() : void {
    this.filteredCourses = this.coursePost.filter(course => // ny array för de som uppfyller villkor
      course.courseName.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) || // kontroll om name innehåller söktext
      course.courseCode.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) || // ignorerar stora små bokstäver
      course.progression.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase())
    );

    this.currentPage = 1; // nollställer aktuell sida till 1
    this.updatePagedCourses();
  }

  /* filtrerar utifrån ämne */
  filterBySubject() : void {
    if (this.selectedSubjects) {
      this.filteredCourses= this.coursePost.filter(course => // filtermetod som skapar ny array med de som matchar ämne
        course.subject === this.selectedSubjects // kontroll
      );
    } else {
      this.filteredCourses = this.coursePost;
    }
    this.currentPage = 1;
    this.updatePagedCourses();
  }

  /* sortera utifrån klickad kolumn */
  sortTable(column: keyof Course) : void {
    const compare = (a: Course, b: Course): number => { // jämför a och b
      let valueA: string | number = a[column]; // om de är siffror konverteras de till number
      let valueB: string | number = b[column];
  
      /* jämför om de är mindre eller större än */
      if (!isNaN(Number(valueA)) && !isNaN(Number(valueB))) {
        valueA = Number(valueA);
        valueB = Number(valueB);

      } else if (typeof valueA === "string" && typeof valueB === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
  
      /* returnerar -1 1 eller 0 för sortering*/
      if (valueA < valueB) {
        return this.sortText === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortText === "asc" ? 1 : -1;
      }
      return 0;
    };

    this.filteredCourses.sort(compare); // sorterar filtrerade kurser med jämförelser funktionen
    this.currentPage = 1;
    this.updatePagedCourses();
    this.sortText = this.sortText === "asc" ? "desc" : "asc"; // växlar ordning varje klick
  }

  /* delar alla kurser i sidor */
  updatePagedCourses() : void {
    const startIndex = (this.currentPage - 1) * this.pageSize; // beräknar startindex för aktuell sida
    const endIndex = startIndex + this.pageSize; // ...och slutindex
    this.pagedCourses = this.filteredCourses.slice(startIndex, endIndex); // uppdateras med det som ligger emellan
  }

  /* går till nästa sida av delningen av sidor */
  nextPage() : void {
    if (this.currentPage * this.pageSize < this.filteredCourses.length) {
      this.currentPage++;
      this.updatePagedCourses();
    }
  }

 /* går till föregående sida av delningen av sidor */
  previousPage() : void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedCourses();
    }
  }

  /* sparar kurs i localstorage */
  saveToLocalStorage(course: Course) : void {
    let savedCourses = localStorage.getItem("savedCourses");
    let courses = savedCourses ? JSON.parse(savedCourses) : [];
    courses.push(course);
    localStorage.setItem("savedCourses", JSON.stringify(courses));

    this.confirmation = // visar bekräftelsemeddelande...
    `Kurs ${course.courseName} har lagts till!`;

    setTimeout(() => { // ...i 3sek
      this.confirmation = "";
    }, 3000);
  }

  /* raderar kurs från localstorage */
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

  /* klick funktion som varierar beroende på action type*/
  onClick(course: Course) : void {
    if (this.actionType === 'add') {
      this.saveToLocalStorage(course); // när kurs ska läggas till skickas denna till funktionen för att spara
    } else if (this.actionType === 'delete') {
      this.removeFromLocalStorage(course.courseCode); // när kurs ska raderas skickas denna till funktionen för att radera
    }
    this.courseAction.emit(course.courseCode);
  }
  
  get totalCourses() : number { // returnerar kurser i filtrerade kurser
    return this.filteredCourses.length;
  }

  get startIndex() : number { // beräknar index av vad nuvarande sida börjar på baserat på storlek och sida
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex() : number { // beräknar index av vad nuvarande sida slutar på baserat på storlek och sida
    return Math.min(this.currentPage * this.pageSize, this.filteredCourses.length); // förhindrar index högre än kurser
  }
}