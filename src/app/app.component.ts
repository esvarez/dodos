import { Component } from '@angular/core';
import { InputComponent } from './components/input/input.component';

@Component({
  selector: 'app-root',
  imports: [InputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dodos';
  emailValue = '';
}
