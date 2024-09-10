import { Component } from '@angular/core';
import { SubheaderComponent } from "../subheader/subheader.component";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [SubheaderComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

}
