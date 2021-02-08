import {Component, OnInit} from '@angular/core';
import {Keyboard} from '../shared/keyboard';
import {KeyboardService} from '../shared/keyboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  keyboards: Keyboard[]=[];
  constructor(private keyboardService: KeyboardService) { }

  ngOnInit() {
   this.keyboardService.getKeyboards().subscribe(
    (data: Keyboard[]) => this.keyboards = data
   );
  }
}
