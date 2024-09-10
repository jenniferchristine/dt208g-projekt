import { Component } from '@angular/core';
import { SubheaderComponent } from "../subheader/subheader.component";

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [SubheaderComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {

}
