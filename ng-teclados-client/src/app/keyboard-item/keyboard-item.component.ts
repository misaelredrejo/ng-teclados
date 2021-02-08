import {Component, Input} from '@angular/core';
import {Keyboard} from '../shared/keyboard';

@Component({
  selector: 'app-keyboard-item',
  templateUrl: './keyboard-item.component.html',
  styleUrls: ['./keyboard-item.component.css']
})
export class KeyboardItemComponent {

  @Input() keyboard: Keyboard;
}
